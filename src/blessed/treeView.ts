import { repeat } from 'misc-utils-of-mine-generic'
import { IKeyEventArg, widget, Widgets } from '..'
import { IMouseEventArg, Style } from '../blessedTypes'
import { React } from '../jsx'
import { clicks } from './clicks'
import { findAscendant } from './node'

export interface TreeViewNode {
  name: string
  label?: string
  children: TreeViewNode[]
  expanded?: boolean
  hidden?: boolean
  /**
   * This will take priority over TreeViewOptions.expandedPrefix
   */
  expandedPrefix?: string
  /**
   * This will take priority over TreeViewOptions.collapsedPrefix
   */
  collapsedPrefix?: string
}

interface Node extends TreeViewNode {
  children: Node[]
  parent?: Node
  nextSibling?: Node
  previousSibling?: Node
  selected?: boolean
  path: string
}

export interface TreeOptions<T extends TreeViewNode = TreeViewNode> extends Widgets.ElementOptions {
  /**
   * String to show before an element representing the "expand" action, like "[+]", when the element is collapsed.
   * Default value: '\u25b6'.
   */
  collapsedPrefix?: string
  /**
   * String to show before an element representing the "collapse" action, like "[-]", when the element is expanded.
   * Default value: '\u25bc'.
   */
  expandedPrefix?: string
  /**
   * The initial tree root nodes.
   */
  rootNodes?: T[]
  /**
   * Keys to expand nodes. Default value is ['space'].
   */
  expandKeys?: string[]
  /**
   * Keys to select nodes. Default value is ['enter']
   */
  selectKeys?: string[]
  /**
   * keys to scroll up in the tree. It will focus the node that is above the current focused node . Default
   * value is ['up'].
   */
  upKeys?: string[]
  /**
   * Keys to scroll down in the tree. It will focus the node that is below the current focused node.
   */
  downKeys?: string[]
  pageDownKeys?: string[]
  pageUpKeys?: string[]
  /**
   * Indentation size for expanded children. Default value is 2.
   */
  levelIndent?: number
  /**
   * If true multiple node selection is allowed with enter. If false, only one node can be selected at a time.
   */
  multipleSelection?: boolean
  /**
   * Emitted when user selects a node (pressing enter). undefined value means the user un-select all nodes.
   * undefined value means the user un-select all nodes
   */
  onNodeSelect?: <T extends TreeViewNode = TreeViewNode>(node: Node & T | Node & T[] | undefined) => void
  /**
   *  Emitted when user focus a tree node while navigating up or down with arrow keys.
   */
  onNodeExpand?: <T extends TreeViewNode = TreeViewNode>(node: Node & T) => void
  /**
   * Emitted when user expand or collapses a node (pressing space). `node.expanded` property tells the current
   * status of the node.
   */
  onNodeFocus?: <T extends TreeViewNode = TreeViewNode>(node: Node & T) => void

  style?: TreeViewStyle
}

interface ITreeView<T extends TreeViewNode = TreeViewNode> {
  /**
   * Emitted when user selects a node (pressing enter). undefined value means the user un-select all nodes
   */
  on(event: 'nodeSelect', callback: (node: Node) => void): this

  /**
   * Emitted when user focus a tree node while navigating up or down with arrow keys.
   */
  on(event: 'nodeFocus', callback: (node: Node) => void): this

  /**
   * Emitted when user expand or collapses a node (pressing space). node.expanded property tells the current
   * status of the node.
   */
  on(event: 'nodeExpand', callback: (node: Node) => void): this
}

interface TreeViewStyle extends Style {
  focusedNode?: Style
  selectedNode?: Style
}
/**
 * A Tree widget made from scratch, this is inheriting directly from Element, and implementing render()
 * without using any other Widget Implementation.
 *
 * It doesn't support border, padding, or label. To fully support all features, wrap this element in a box.
 *
 * It does support scrolling.
 */
export class TreeView<T extends TreeViewNode = TreeViewNode> extends widget.Element<TreeOptions<T>>
  implements ITreeView<T> {
  type = 'treeview'
  style: TreeViewStyle = {}

  protected currentNode: Node
  protected selectedNodes: Node[] = []
  protected rootNodes: Node[]
  protected nodeLines: { node: Node; line: string }[] = []
  protected focusedLine = 0

  protected static defaultOptions: TreeOptions = {
    rootNodes: [],
    expandKeys: ['space'],
    selectKeys: ['enter'],
    upKeys: ['up'],
    downKeys: ['down'],
    pageDownKeys: ['pagedown'],
    pageUpKeys: ['pageup'],
    expandedPrefix: '\u25bc',
    collapsedPrefix: '\u25b6',
    levelIndent: 2,
    style: {
      fg: 'green',
      bg: 'black',
      focusedNode: { bg: 'green', fg: 'black' },
      selectedNode: { bg: 'red', fg: 'black' }
    }
  }

  constructor(options: TreeOptions<T> = TreeView.defaultOptions as any) {
    super({ ...(TreeView.defaultOptions as any), ...(options || {}) })
    this.style = { ...TreeView.defaultOptions.style, ...((options || {}).style || {}) }
    this.rootNodes =
      this.options.rootNodes!.length === 0
        ? [{ name: 'Root', children: [], path: '/Root' }]
        : this.processNodes(this.options.rootNodes! as any)
    this.currentNode = this.rootNodes.find(n => !n.hidden) || this.rootNodes[0]
    this.onKey = this.onKey.bind(this)
    this.onClick = this.onClick.bind(this)
    this.once('render', e => {
      this.key(
        [
          ...this.options.expandKeys!,
          ...this.options.selectKeys!,
          ...this.options.upKeys!,
          ...this.options.downKeys!,
          ...this.options.pageDownKeys!,
          ...this.options.pageUpKeys!
        ],
        this.onKey
      )
      clicks({ target: this, handler: this.onClick })
    })
  }

  protected onClick(e: IMouseEventArg & { count: number }) {
    const x = e.y - this.atop
    const line = this.nodeLines[x]
    if (!line) {
      return
    }
    this.focusedLine = x
    this.currentNode = line.node
    this.emit('nodeFocus', this.currentNode)
    if (e.count === 1) {
      this.toggleExpand()
    } else {
      this.currentNode.selected = !this.currentNode.selected
      this.processSelect(e.ctrl)
    }
    this.screen.render()
  }
  /* * if true, the view will ignore if it's screen.focused or not. Useful for automate the view form outside. */
  // protected ignoreScreenFocused = false
  protected onKey(ch: any, key: IKeyEventArg) {
    if (
      // !this.ignoreScreenFocused &&
      this !== this.screen.focused ||
      !findAscendant(this, a => a === this.screen.focused)
    ) {
      return
    }
    const upAction = () => {
      if (this.focusedLine <= 0) {
        return
      }
      this.focusedLine = this.focusedLine - 1
      this.currentNode = this.nodeLines[this.focusedLine].node
    }
    const downAction = () => {
      if (this.focusedLine === this.nodeLines.length - 1) {
        return
      }
      this.focusedLine = this.focusedLine + 1
      this.currentNode = this.nodeLines[this.focusedLine].node
    }
    if (this.options.upKeys!.includes(key.name)) {
      upAction()
      this.emit('nodeFocus', this.currentNode)
      this.options.onNodeFocus && this.options.onNodeFocus(this.currentNode as Node & T)
    } else if (this.options.pageUpKeys!.includes(key.name)) {
      for (let i = 0; i < (this.height as number) - 1; i++) {
        upAction()
      }
      this.emit('nodeFocus', this.currentNode)
      this.options.onNodeFocus && this.options.onNodeFocus(this.currentNode as Node & T)
    } else if (this.options.downKeys!.includes(key.name)) {
      downAction()
      this.emit('nodeFocus', this.currentNode)
      this.options.onNodeFocus && this.options.onNodeFocus(this.currentNode as Node & T)
    } else if (this.options.pageDownKeys!.includes(key.name)) {
      const h = this.lpos.yl - this.lpos.yi - 1
      for (let i = 0; i < h; i++) {
        downAction()
      }
      this.emit('nodeFocus', this.currentNode)
      this.options.onNodeFocus && this.options.onNodeFocus(this.currentNode as Node & T)
    } else if (this.options.expandKeys!.includes(key.name)) {
      this.toggleExpand()
    } else if (this.options.selectKeys!.includes(key.name)) {
      this.currentNode.selected = !this.currentNode.selected
      this.processSelect()
    }
    this.screen.render()
  }
  protected processSelect(multipleSelectionApplies = true) {
    if (this.options.multipleSelection && multipleSelectionApplies) {
      if (this.currentNode.selected) {
        this.selectedNodes.push(this.currentNode)
      } else {
        this.selectedNodes = this.selectedNodes.filter(n => n !== this.currentNode)
      }
    } else {
      this.selectedNodes.forEach(n => (n.selected = false))
      this.selectedNodes = this.currentNode.selected ? [this.currentNode] : []
    }
    const nodeSelectArg: Node & T | undefined = this.options.multipleSelection
      ? this.selectedNodes
      : this.selectedNodes.length
      ? this.selectedNodes[0]
      : (undefined as any)
    this.emit('nodeSelect', nodeSelectArg)
    this.options.onNodeSelect && this.options.onNodeSelect(nodeSelectArg)
  }

  /**
   * toggles currentNode expand/collaps
   */
  toggleExpand() {
    this.currentNode.expanded = !this.currentNode.expanded
    this.emit('nodeExpand', this.currentNode)
    this.options.onNodeExpand && this.options.onNodeExpand(this.currentNode as Node & T)
  }

  render() {
    var coords = super.render()
    if (!coords) {
      return
    }
    if (this.focusedLine === -1) {
      this.focusedLine = 0
    }
    const notSelectedAttr = this.sattr({
      ...this.style,
      ...// this.ignoreScreenFocused ||
      (this.screen.focused === this ? this.style.focus || {} : {})
    })
    let attr = notSelectedAttr
    const selectedAttr = this.sattr(this.style.selectedNode || TreeView.defaultOptions.style!.selectedNode!)
    const focusedAttr = this.sattr(this.style.focusedNode || TreeView.defaultOptions.style!.focusedNode!)
    this.nodeLines = this.getNodeLines(this.rootNodes)
    let offset = 0
    const height = coords.yl - coords.yi
    if (this.focusedLine > height - 1) {
      offset = this.focusedLine - height + 1
    }
    for (let j = coords.yi; j < coords.yl; j++) {
      if (this.nodeLines[j - coords.yi + offset] && this.nodeLines[j - coords.yi + offset].node.selected) {
        attr = selectedAttr
      } else if (
        // this.ignoreScreenFocused ||
        this === this.screen.focused &&
        offset + j - coords.yi === this.focusedLine
      ) {
        attr = focusedAttr
      } else {
        attr = notSelectedAttr
      }
      for (let i = coords.xi; i < coords.xl; i++) {
        if (this.screen.lines && this.screen.lines[j]) {
          this.screen.lines[j][i] = [
            attr,
            offset + j - coords.yi < 0 || i - coords.xi < 0 || !this.nodeLines[offset + j - coords.yi]
              ? ' '
              : this.nodeLines[offset + j - coords.yi].line[i - coords.xi] || ' '
          ]
        }
      }
    }
    return coords
  }

  /**
   * Sets the root nodes. If data is not given, it will be this.rootNodes so the UI will be sync/updated with
   * current data (for example if user modified the nodes manually). Selected and focused nodes, will be
   * reset.
   */
  setNodes(data: TreeViewNode[] = this.rootNodes) {
    this.rootNodes = this.processNodes(data as any)
    if (data !== this.rootNodes) {
      this.currentNode = this.currentNode = this.rootNodes.find(n => !n.hidden) || this.rootNodes[0]
      this.focusedLine = 0
      this.selectedNodes = []
    } else {
      //TODO handle situations when an ancestor is collapsed or removed so this.currentNode should be changed
    }
  }

  /**
   * Visit given nodes and their descendants until visitor returns true or there are no more
   */
  visitNodes(visitor: (n: Node) => boolean, nodes = this.rootNodes): boolean | undefined {
    return nodes.some(n => visitor(n) || !!this.visitNodes(visitor, n.children))
  }

  /** 
   * Hide/show nodes depending on given predicate. Example: 
    ```
    tree.toggleNodeHide(n => n.name.toLowerCase().includes(e.value.toLowerCase())) 
    screen.render()
    ```
   */
  toggleNodeHide(p: (n: TreeViewNode) => boolean) {
    this.visitNodes(n => {
      if (p(n)) {
        n.hidden = false
        this.visitAncestors(n, a => {
          a.hidden = false
          a.expanded = true
          return false
        })
      } else {
        n.hidden = true
      }
      return false
    })
    this.setNodes()
  }

  /**
   * Will scroll down to given node's position, and select it.. It will make node's ancestors expanded and visible.
   *
   * Useful to remark a node in this view from external code.
   */
  selectNode(n: T) {
    function ForceCast<T>(a: any): a is T {
      return true
    }
    if (!ForceCast<Node>(n)) {
      return
    }
    this.currentNode = n
    this.selectedNodes.forEach(n => (n.selected = false))
    this.visitAncestors(this.currentNode, n => {
      n.hidden = false
      n.expanded = true
      return false
    })
    this.nodeLines = this.getNodeLines(this.rootNodes)
    const foundIndex = this.nodeLines.findIndex(l => l.node === (n as any))
    this.focusedLine = foundIndex === -1 ? this.focusedLine : foundIndex
    this.currentNode.hidden = false
    this.currentNode.expanded = true
    this.currentNode.selected = true
    this.screen.render()
  }

  /**
   * Find a node recursively that matches with given predicate, or return undefined if none
   */
  findDescendant(predicate: (n: T) => boolean) {
    let found: T | undefined
    this.visitNodes(d => {
      if (predicate(d as any)) {
        found = d as any
        return true
      }
      return false
    })
    return found
  }

  /**
   * Visit ancestors of given node until visitor returns true or there are no more.
   */
  visitAncestors(n: Node, visitor: (n: Node) => boolean | undefined) {
    if (visitor(n)) {
      return
    }
    n.parent && visitor(n.parent)
  }

  /**
   * Finds given node sibling that is after it.
   */
  findNextSibling(n: Node, p: (s: Node) => boolean): Node | undefined {
    function f(n?: Node): Node | undefined {
      return !n ? undefined : p(n) ? n : f(n.nextSibling)
    }
    return f(n.nextSibling)
  }

  /**
   * For each node, recursively, set node's parent, previousSibling and nextSibling properties to user given Nodes.
   */
  protected processNodes(nodes: Node[]) {
    function f(n: Node, parent?: Node, prev?: Node, next?: Node) {
      n.parent = parent
      n.previousSibling = prev
      n.nextSibling = next
      n.path = n.path || (parent ? parent.path || '' : '') + '/' + n.name
      n.children.forEach((c, i) => {
        f(c, n, i > 0 ? n.children[i - 1] : undefined, i < n.children.length - 1 ? n.children[i + 1] : undefined)
      })
    }
    nodes.forEach((n, i) => {
      f(n, n.parent || n, i > 0 ? nodes[i - 1] : undefined, i < nodes.length - 1 ? nodes[i + 1] : undefined)
    })
    return nodes
  }

  /**
   * Calculate node lines to be rendered according to expanded and hidden node's properties.
   */
  protected getNodeLines(nodes: Node[], level = 0): { node: Node; line: string }[] {
    const lines: { node: Node; line: string }[] = []
    nodes.forEach(node => {
      if (!node.hidden) {
        const line = `${repeat(level * this.options.levelIndent!, ' ')}${
          node.expanded || !node.children.length
            ? node.expandedPrefix || this.options.expandedPrefix
            : node.collapsedPrefix || this.options.collapsedPrefix
        } ${node.label || node.name}`
        const i = line.indexOf('\n')
        lines.push({
          node,
          line: line.substring(0, i !== -1 ? i : line.length)
        })
        if (node.expanded) {
          lines.push(...this.getNodeLines(node.children, level + 1))
        }
      }
    })
    return lines
  }

  /**
   * Gets the current focused node
   */
  getFocusedNode() {
    return this.currentNode
  }

  /**
   * Gets the root nodes (the data)
   */
  getNodes() {
    return this.rootNodes
  }

  /**
   * Gets the current selected node, or nodes in case option.multipleSelection is enabled, or undefined if
   * there is no selected node
   */
  getSelectedNodes() {
    return this.selectedNodes
  }

  /**
   * Support getContent just to be compliant with Widget and out testing tools work
   */
  getContent() {
    const coords = this._getCoords(true)
    if (!coords) {
      return ''
    }
    let content = ''
    let offset = 0
    const height = coords.yl - coords.yi
    if (this.focusedLine > height - 1) {
      offset = this.focusedLine - height + 1
    }
    for (let j = coords.yi; j < Math.min(this.nodeLines.length, coords.yl); j++) {
      for (let i = coords.xi; i < coords.xl; i++) {
        content +=
          offset + j - coords.yi < 0 || i - coords.xi < 0 || !this.nodeLines[offset + j - coords.yi]
            ? ' '
            : this.nodeLines[offset + j - coords.yi].line[i - coords.xi] || ' '
      }
      content += '\n'
    }
    return content
  }
}

// install it so is available as JSX element
React.addIntrinsicElementConstructors({
  treeview: function(options?: TreeOptions) {
    return new TreeView(options)
  }
})
