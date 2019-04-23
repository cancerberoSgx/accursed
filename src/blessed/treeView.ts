import { installExitKeys, createScreen, widget, Widgets, debug, IKeyEventArg, text } from '..';
import { repeat, array } from 'misc-utils-of-mine-generic';
import { button } from '..';

interface TreeNode {
  name: string,
  children: Node[]
  expanded?: boolean
}
interface Node extends TreeNode {
  focused?: boolean;
  parent?: Node
  nextSibling?: Node
  previousSibling?: Node
  selected?: boolean
}

interface TreeOptions extends Widgets.TextOptions {
  collapsedPrefix?: string
  expandedPrefix?: string
  /** the initial tree root nodes. */
  rootNodes: TreeNode[]
  /** keys to expand nodes */
  expandKeys?: string[]
  /** keys to select nodes */
  selectKeys?: string[]
  /** key to scroll up in the tree. It will focus the node that is above the current focused node  */
  focusUpKeys?: string[]
  /** key to scroll down in the tree. It will focus the node that is below the current focused node */
  focusDownKeys?: string[]
  /** indentation size for expanded children */
  levelIndent?: number
  /**  */
  multipleSelection?: boolean
}
/**
 * A Tree widget made from scratch, this is inheriting directly from Element, and implementing render() without using any 
 * other Widget Implementation. 
 * 
 * It doesn't support border, padding, or label. 
 * 
 * It does support scrolling. 
 */
export class TreeView extends widget.Element<TreeOptions> {

  type = 'treeview'

  private static defaultOptions: TreeOptions = {
    rootNodes: [],
    expandKeys: ['space'],
    selectKeys: ['enter'],
    focusUpKeys: ['up'],
    focusDownKeys: ['down'],
    expandedPrefix: '\u25bc',
    collapsedPrefix: '\u25b6',
    levelIndent: 2,
    style: {
      bg: 'green',
      fg: 'black',
      focus: { bg: 'green', },
      selected: { bg: 'red', }
    }
  }

  protected currentNode: Node
  protected selectedNodes: Node[] = []
  protected rootNodes: Node[];
  protected nodeLines: { node: Node, line: string }[] = []
  protected focusedLine = 0

  constructor(options: TreeOptions = TreeView.defaultOptions) {
    super({ ...TreeView.defaultOptions, ...(options || {}) })
    this.rootNodes = this.options.rootNodes.length === 0 ? [{ name: 'Root', children: [] }] : this.processNodes(this.options.rootNodes)
    this.currentNode = this.rootNodes[0]
    this.key([...this.options.expandKeys!, ...this.options.selectKeys!, ...this.options.focusUpKeys!, ...this.options.focusDownKeys!], this.onKey.bind(this))
  }

  onKey(ch: any, key: IKeyEventArg) {
    debug(key)
    if (this.options.focusUpKeys!.includes(key.name)) {
      if (this.focusedLine > 0) {
        this.focusedLine = this.focusedLine - 1
      }
      else {
        return
      }
      this.currentNode.focused = false
      if (this.currentNode.previousSibling) {
        function findLastVisualDescendant(n: Node): Node {
          if (n.children.length === 0 || !n.expanded) {
            return n
          }
          const lastChild = n.children[n.children.length - 1]
          return findLastVisualDescendant(lastChild)
        }
        this.currentNode = findLastVisualDescendant(this.currentNode.previousSibling)
      }
      else if (this.currentNode.parent) {
        this.currentNode = this.currentNode.parent
      }
      this.currentNode.focused = true
      this.emit('nodeFocus', this.currentNode)
    }
    else if (this.options.focusDownKeys!.includes(key.name)) {
      if (this.focusedLine === this.nodeLines.length - 1) {
        return
      }
      this.focusedLine = this.focusedLine + 1
      if (this.currentNode.expanded && this.currentNode.children.length > 0) {
        this.currentNode = this.currentNode.children[0]
      }
      else if (this.currentNode.nextSibling) {
        this.currentNode = this.currentNode.nextSibling
      }
      else {
        function findAscendantNextSibling(n: Node): Node {
          if (!n.parent) {
            return n
          }
          return n.nextSibling || findAscendantNextSibling(n.parent)
        }
        this.currentNode = findAscendantNextSibling(this.currentNode)
      }
      this.emit('nodeFocus', this.currentNode)
    }
    else if (this.options.expandKeys!.includes(key.name)) {
      this.currentNode.expanded = !this.currentNode.expanded
      this.emit('nodeExpand', this.currentNode)
    }
    else if (this.options.selectKeys!.includes(key.name)) {
      this.currentNode.selected = !this.currentNode.selected
      if (this.options.multipleSelection) {
        if (this.currentNode.selected) {
          this.selectedNodes.push(this.currentNode)
        }
        else {
          this.selectedNodes = this.selectedNodes.filter(n => n !== this.currentNode)
        }
      }
      else {
        this.selectedNodes.forEach(n => n.selected = false)
        this.selectedNodes = this.currentNode.selected ? [this.currentNode] : []
      }
      this.emit('nodeSelect', this.options.multipleSelection ? this.selectedNodes : this.selectedNodes.length ? this.selectedNodes[0] : undefined)
    }
    this.screen.render()
  }

  render() {
    // try {
    var coords = super.render()
    if (!coords) {
      return
    }
    const notSelectedAttr = this.sattr(this.style)
    let attr = notSelectedAttr
    const selectedAttr = this.sattr(this.style.selected || TreeView.defaultOptions.style!.selected!)
    const focusedAttr = this.sattr(this.style.focus || TreeView.defaultOptions.style!.focus!)
    const nodeLines = this.getNodeLines(this.rootNodes)
    let offset = 0
    const height = coords.yl - coords.yi
    if (this.focusedLine > height - 1) {
      offset = this.focusedLine - height + 1
    }
    for (let j = coords.yi; j < Math.min(nodeLines.length, coords.yl); j++) {
      if (this.nodeLines[j - coords.yi + offset] && this.nodeLines[j - coords.yi + offset].node.selected) {
        attr = selectedAttr
      }
      else if (offset + j === this.focusedLine) {
        attr = focusedAttr
      }
      else {
        attr = notSelectedAttr
      }
      for (let i = coords.xi; i < coords.xl; i++) {
        this.screen.lines[j][i] = [attr, nodeLines[offset + j] && nodeLines[offset + j].line[i] || ' ']
      }
    }
    return coords
    // } catch (error) {
    //   debug('ERROR', error)
    // }
  }

  setNodes(data: TreeNode[]) {
    this.rootNodes = this.processNodes(data.length === 0 ? [{ name: 'Root', children: [] }] : this.processNodes(data))
    this.currentNode = this.rootNodes[0]
    this.focusedLine = 0
    this.selectedNodes = []
  }

  /** it will set node's parent, previousSibling and nextSibling properties to user given TreeNodes */
  processNodes(nodes: TreeNode[]) {
    function f(n: Node, parent?: Node, prev?: Node, next?: Node) {
      n.parent = parent
      n.previousSibling = prev
      n.nextSibling = next
      n.children.forEach((c, i) => {
        f(c, n, i > 0 ? n.children[i - 1] : undefined, i < n.children.length - 1 ? n.children[i + 1] : undefined)
      })
    }
    nodes.forEach((n, i) => {
      f(n, n, i > 0 ? nodes[i - 1] : undefined, i < nodes.length - 1 ? nodes[i + 1] : undefined)
    })
    return nodes as Node[]
  }

  /** calculate and paint node's lines */
  getNodeLines(nodes: Node[], level = 0, lines: { node: Node, line: string }[] = []) {
    nodes.forEach(node => {
      // lines.push({node, line: `${node.expanded ? '[-]' : '[+]'}${repeat(level*this.options.levelIndent!, '\u2500')} ${node.name}`})
      lines.push({ node, line: `${repeat(level * this.options.levelIndent!, ' ')}${node.expanded ? this.options.expandedPrefix : this.options.collapsedPrefix} ${node.name}` })
      // lines.push(`${node.expanded ? '\u2796\u23b8' : '\u2795\u23b8'}${repeat(level*this.options.levelIndent!, '-')} ${node.name}`)
      if (node.expanded) {
        this.getNodeLines(node.children, level + 1, lines)
      }
    })
    this.nodeLines = lines
    return [...lines, ...array(Math.round(this.height / 2) + 1).map(i => ({ node: nodes[nodes.length - 1], line: ' ' }))] // dummy lines at the end to support "scroll" when selected line is bigger than height
  }

  getFocusedNode() {
    return this.currentNode
  }

  getSelectedNodes() {
    return this.selectedNodes
  }

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
        content += this.nodeLines[offset + j] && this.nodeLines[offset + j].line[i] || ' '
      }
      content += '\n'
    }
    return content
  }
}



// // test our new element:
// const screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
// installExitKeys(screen)
// const rootNodes = [
//   { name: 'n1', children: [{ expanded: true, name: 'n11', children: [] }] },
//   { expanded: true, name: 'n2', children: [   {
//     expanded: true, name: 'n21', children: [{
//       expanded: true, name: 'n211', children: [
//         { expanded: true, name: 'n2111', children: [{ expanded: true, name: 'n21111', children: [] }] },
//       ]
//     }]
//   },
//   { expanded: true, name: 'n22', children: [] },
//   { expanded: true, name: 'n23', children: [] },] },
//   {
//     expanded: true, name: 'n3', children: [
//       {
//         expanded: true, name: 'n31', children: [{
//           expanded: true, name: 'n311', children: [
//             { expanded: true, name: 'n3111', children: [{ expanded: true, name: 'n31111', children: [] }] },
//           ]
//         }]
//       },
//       { expanded: true, name: 'n32', children: [] },
//       { expanded: true, name: 'n33', children: [] },
//     ]
//   },{
//     expanded: true, name: 'n4', children: [
//       {
//         expanded: true, name: 'n41', children: [{
//           expanded: true, name: 'n411', children: [
//             { expanded: true, name: 'n4111', children: [{ expanded: true, name: 'n41111', children: [] }] },
//           ]
//         }]
//       },
//       { expanded: true, name: 'n42', children: [] },
//       { expanded: true, name: 'n43', children: [] },
//     ]
//   }

// ]
// const w = new TreeView({ rootNodes, parent: screen, width: 15, height: 10, 
// //   label: 'tree',
// //  border: 'line', 
//  style: { bg: 'black', fg: 'white', focus: { bg: 'green', fg: 'black' }, selected: {bg: 'red'} }, scrollable: true })

// const t = text({ parent: screen, left: 19, top: 0, content: 'text' })

// const b = button({parent: screen, left: 20, top: 8, content: 'click'})
// b.on('click', ()=>{
//   w.setNodes([{   name: 'n41', children: [{     name: 'n411', children: [        {name: 'n4111', children: [{name: 'n41111', children: [] }] },     ]    }]
//   },  {name: 'n42', children: [] },  {name: 'n43', children: [] },]
//   )
//   screen.render()
// })
// w.on('nodeSelect', n => { t.content = `nodeSelect: ${n.name}, focusedNode: ${w.getFocusedNode().name}-------------`; screen.render() })
// w.on('nodeFocus', n => { t.content = `nodeFocus: ${n.name}, focusedNode: ${w.getFocusedNode().name}-------`; screen.render() })
// w.on('nodeExpand', n => { t.content = `nodeExpand: ${n.name}, focusedNode: ${w.getFocusedNode().name}-----------------`; screen.render() })

// screen.render()

// // const defaultOptions = {
// //   rootNodes: [],
// //   expandKeys: ['space'],
// //   selectKeys: ['enter'],
// //   focusUpKeys: ['up'],
// //   focusDownKeys: ['down'],
// //   levelIndent: 2,
// //   style: {
// //     bg: 'green',
// //     fg: 'black',
// //     focus: { bg: 'green', },
// //     selected: {bg: 'red',}
// //   }
// // }