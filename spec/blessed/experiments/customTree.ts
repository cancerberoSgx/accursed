import { repeat } from 'misc-utils-of-mine-generic'
import { createScreen, IKeyEventArg, installExitKeys, text, widget, Widgets } from '../../../src'

interface TreeNode {
  name: string
  children: Node[]
  expanded?: boolean
}
interface Node extends TreeNode {
  parent?: Node
  nextSibling?: Node
  previousSibling?: Node
}
interface TreeOptions extends Widgets.TextOptions {
  rootNodes: TreeNode[]
  expandKeys?: string[]
  selectKeys?: string[]
  focusUpKeys?: string[]
  focusDownKeys?: string[]
}
/**
 * A Tree widget made from scratch, this is inheriting directly from Element, and implementing render() without using any
 * other Widget Implementation.
 *
 * It doesn't support border, padding, or label.
 *
 * It does support scrolling.
 */
class Tree extends widget.Element<TreeOptions> {
  type = 'accursed-tree'

  private static defaultOptions: TreeOptions = {
    rootNodes: [],
    style: {
      bg: 'darkgray',
      selected: {
        bg: 'red'
      }
    },
    /** keys to expand nodes */
    expandKeys: ['space'],
    /** keys to select nodes */
    selectKeys: ['enter'],
    /** key to scroll up in the tree. It will focus the node that is above the current focused node  */
    focusUpKeys: ['up'],
    /** key to scroll down in the tree. It will focus the node that is below the current focused node */
    focusDownKeys: ['down']
  }

  protected currentNode: Node
  protected rootNodes: Node[]
  protected nodeLines: string[] = []
  protected selectedLine = 0

  constructor(options: TreeOptions = Tree.defaultOptions) {
    super({ ...Tree.defaultOptions, ...(options || {}) })
    this.options = { ...Tree.defaultOptions, ...(options || {}) }
    this.rootNodes =
      this.options.rootNodes.length === 0 ? [{ name: 'Root', children: [] }] : this.processNodes(this.options.rootNodes)
    this.currentNode = this.rootNodes[0]
    this.key(
      [
        ...this.options.expandKeys!,
        ...this.options.selectKeys!,
        ...this.options.focusUpKeys!,
        ...this.options.focusDownKeys!
      ],
      this.onKey.bind(this)
    )
  }

  onKey(ch: any, key: IKeyEventArg) {
    if (this.options.focusUpKeys!.includes(key.name)) {
      if (this.selectedLine > 0) {
        this.selectedLine = this.selectedLine - 1
      } else {
        return
      }
      if (this.currentNode.previousSibling) {
        function findLastVisualDescendant(n: Node): Node {
          if (n.children.length === 0 || !n.expanded) {
            return n
          }
          const lastChild = n.children[n.children.length - 1]
          return findLastVisualDescendant(lastChild)
        }
        this.currentNode = findLastVisualDescendant(this.currentNode.previousSibling)
      } else if (this.currentNode.parent) {
        this.currentNode = this.currentNode.parent
      }
      this.emit('nodeFocus', this.currentNode)
    } else if (this.options.focusDownKeys!.includes(key.name)) {
      if (this.selectedLine === this.nodeLines.length - 1) {
        return
      }
      this.selectedLine = this.selectedLine + 1
      if (this.currentNode.expanded && this.currentNode.children.length > 0) {
        this.currentNode = this.currentNode.children[0]
      } else if (this.currentNode.nextSibling) {
        this.currentNode = this.currentNode.nextSibling
      } else {
        function findAscendantNextSibling(n: Node): Node {
          if (!n.parent) {
            return n
          }
          return n.nextSibling || findAscendantNextSibling(n.parent)
        }
        this.currentNode = findAscendantNextSibling(this.currentNode)
      }
      this.emit('nodeFocus', this.currentNode)
    } else if (this.options.expandKeys!.includes(key.name)) {
      this.currentNode.expanded = !this.currentNode.expanded
      this.emit('nodeExpand', this.currentNode)
    } else if (this.options.selectKeys!.includes(key.name)) {
      this.emit('nodeSelect', this.currentNode)
    }
    this.screen.render()
  }

  render() {
    var coords = super.render()
    if (!coords) {
      return
    }
    const notSelectedAttr = this.sattr(this.style)
    let attr = notSelectedAttr
    const selectedAttr = this.sattr(this.style.selected || Tree.defaultOptions.style!.selected!)
    const nodeLines = this.getNodeLines(this.rootNodes)
    let offset = 0
    const height = coords.yl - coords.yi
    if (this.selectedLine > height - 1) {
      offset = this.selectedLine - Math.round(height / 2) // for handling "scroll" when selected line goes beyond element height
    }
    for (let j = coords.yi; j < Math.min(nodeLines.length, coords.yl); j++) {
      if (offset + j === this.selectedLine) {
        attr = selectedAttr
      } else {
        attr = notSelectedAttr
      }
      for (let i = coords.xi; i < coords.xl; i++) {
        this.screen.lines[j][i] = [attr, nodeLines[offset + j][i] || ' ']
      }
    }
    return coords
  }

  setNodes(data: TreeNode[]) {
    this.rootNodes = this.processNodes(data.length === 0 ? [{ name: 'Root', children: [] }] : this.processNodes(data))
    this.currentNode = this.rootNodes[0]
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

  getNodeLines(nodes: Node[], level = 0, lines: string[] = []) {
    nodes.forEach(node => {
      lines.push(repeat(level, '-') + node.name)
      if (node.expanded) {
        this.getNodeLines(node.children, level + 1, lines)
      }
    })
    this.nodeLines = lines
    return [...lines, ...repeat(Math.round((this.height as number) / 2) + 1, ' ')] //, ' ',  ' ', ' ', ' '] // add a dummy one
  }

  getFocusedNode() {
    return this.currentNode
  }
}

// test our new element:
const screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
installExitKeys(screen)
const rootNodes = [
  { name: 'n1', children: [{ expanded: true, name: 'n11', children: [] }] },
  {
    expanded: true,
    name: 'n2',
    children: [
      {
        expanded: true,
        name: 'n21',
        children: [
          {
            expanded: true,
            name: 'n211',
            children: [{ expanded: true, name: 'n2111', children: [{ expanded: true, name: 'n21111', children: [] }] }]
          }
        ]
      },
      { expanded: true, name: 'n22', children: [] },
      { expanded: true, name: 'n23', children: [] }
    ]
  },
  {
    expanded: true,
    name: 'n3',
    children: [
      {
        expanded: true,
        name: 'n31',
        children: [
          {
            expanded: true,
            name: 'n311',
            children: [{ expanded: true, name: 'n3111', children: [{ expanded: true, name: 'n31111', children: [] }] }]
          }
        ]
      },
      { expanded: true, name: 'n32', children: [] },
      { expanded: true, name: 'n33', children: [] }
    ]
  },
  {
    expanded: true,
    name: 'n4',
    children: [
      {
        expanded: true,
        name: 'n41',
        children: [
          {
            expanded: true,
            name: 'n411',
            children: [{ expanded: true, name: 'n4111', children: [{ expanded: true, name: 'n41111', children: [] }] }]
          }
        ]
      },
      { expanded: true, name: 'n42', children: [] },
      { expanded: true, name: 'n43', children: [] }
    ]
  }
]
const w = new Tree({
  rootNodes,
  parent: screen,
  width: 15,
  height: 10,
  // label: 'tree',
  //  border: 'line',
  style: { bg: 'darkgray', fg: 'white', selected: { bg: 'green', fg: 'black' } },
  scrollable: true
})
const t = text({ parent: screen, left: 19, top: 0, content: 'text' })

w.on('nodeSelect', n => {
  t.content = `nodeSelect: ${n.name}, focusedNode: ${w.getFocusedNode().name}-------------`
  screen.render()
})
w.on('nodeFocus', n => {
  t.content = `nodeFocus: ${n.name}, focusedNode: ${w.getFocusedNode().name}-------`
  screen.render()
})
w.on('nodeExpand', n => {
  t.content = `nodeExpand: ${n.name}, focusedNode: ${w.getFocusedNode().name}-----------------`
  screen.render()
})

screen.render()
