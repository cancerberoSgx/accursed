import { installExitKeys, createScreen, widget, Widgets, debug, IKeyEventArg, text } from '../../../src';
import { repeat } from 'misc-utils-of-mine-generic';

interface TreeNode {
  name: string,
  children: Node[]
  expanded?: boolean
}
interface Node extends TreeNode {
  parent?: Node
  nextSibling?: Node
  previousSibling?: Node
  // index?: number
}
interface TreeOptions extends Widgets.TextOptions {
  rootNodes: TreeNode[]
  expandKeys?: string[]
  selectKeys?: string[]
  focusUpKeys?: string[]
  focusDownKeys?: string[]
}
/**
 * A Tree widget made from scratch, this is inheriting directly from Element, and implementing render() without using any other Widget Implementation
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
    expandKeys: ['space'],
    selectKeys: ['enter'],
    focusUpKeys: ['up'],
    focusDownKeys: ['down']
  }

  protected currentNode: Node
  protected rootNodes: Node[];
  protected nodeLines: string[] = []
  protected selectedLine = 0

  constructor(options: TreeOptions = Tree.defaultOptions) {
    super({ ...Tree.defaultOptions, ...(options || {}) })
    this.options = { ...Tree.defaultOptions, ...(options || {}) }
    this.rootNodes =this.options.rootNodes.length===0 ? [{name: 'Root', children: []}] : this.processNodes(this.options.rootNodes)
    this.currentNode = this.rootNodes[0]
    this.key([...this.options.expandKeys!, ...this.options.selectKeys!, ...this.options.focusUpKeys!, ...this.options.focusDownKeys!], this.onKey.bind(this))
  }

  onKey(ch: any, key: IKeyEventArg) {
    if(this.options.focusUpKeys!.includes(key.name)){
      
      if(this.selectedLine >0){
        this.selectedLine = this.selectedLine -1
        // return
      }
      else {
        return 
      }


      if(this.currentNode.previousSibling) {

function findLastVisualDescendant(n: Node): Node{
  if(n.children.length===0||!n.expanded) {
    return n
  }
  const lastChild = n.children[n.children.length-1]
  // if(!lastChild.expanded){
  //   return lastChild
  // }
  // else {
    return findLastVisualDescendant(lastChild)
  // }
} 

        this.currentNode = findLastVisualDescendant(this.currentNode.previousSibling)
        // debug('this.currentNode.previousSibling')
      }
      else if(this.currentNode.parent){
        this.currentNode = this.currentNode.parent//findLastVisualDescendant(this.currentNode.parent)
        // debug('this.currentNode.parent')
      }
        // if(this.currentNode.previousSibling && this.currentNode.previousSibling.expanded) {
        //   this.currentNode = this.currentNode.previousSibling!.children[this.currentNode.previousSibling!.children.length-1]
        // }
        // else if(this.currentNode.previousSibling){
        //   this.currentNode  = this.currentNode.previousSibling!
        // }
        // else if(this.currentNode.parent){
        //   this.currentNode  = this.currentNode.parent!
        // }
      // }
        // this.currentNode = this.currentNode.previousSibling || this.currentNode.parent && this.currentNode.parent.previousSibling ||this.currentNode
      this.emit('nodeFocus', this.currentNode)
    }
    if(this.options.focusDownKeys!.includes(key.name)){
      if(this.selectedLine === this.nodeLines.length-1){
        return 
      }
      this.selectedLine = this.selectedLine + 1


     if(this.currentNode.expanded&&this.currentNode.children.length>0){
        this.currentNode = this.currentNode.children[0]
     }
      else  if(this.currentNode.nextSibling) {
        this.currentNode = this.currentNode.nextSibling//findLastVisualDescendant(this.currentNode.previousSibling)
        // debug('this.currentNode.previousSibling')
      }
      else{

function findAscendantNextSibling(n: Node): Node{
  if(!n.parent) {
    return n
  }
  if(!n.nextSibling){
    return findAscendantNextSibling(n.parent)
  }
  else {
    return n.nextSibling
  }
} 
this.currentNode = findAscendantNextSibling(this.currentNode)
      }

      //TODO: check if selected line is out of bounds
      // if(this.currentNode.expanded&&this.currentNode.children.length){
      //   this.currentNode = this.currentNode.children[0]
      // }
      // else {
      //   this.currentNode = this.currentNode.nextSibling || this.currentNode.parent && this.currentNode.parent.nextSibling ||this.currentNode
      // }      
      this.emit('nodeFocus', this.currentNode)
    }
    if(this.options.expandKeys!.includes(key.name)){
      this.currentNode.expanded = !this.currentNode.expanded
      this.emit('nodeExpand', this.currentNode)
    }
    if(this.options.selectKeys!.includes(key.name)){
      this.emit('nodeSelect', this.currentNode)
    }
    this.screen.render()
  }

  render() {
    var coords = super.render()
    if (!coords) return;
    var lines = this.screen.lines
    const notSelectedAttr = this.sattr(this.style)
    let attr =notSelectedAttr
    const selectedAttr = this.sattr(this.style.selected||Tree.defaultOptions.style!.selected!)
    const nodeLines =     this.getNodeLines( this.rootNodes)
    for (let j = coords.yi; j < Math.min(nodeLines.length, coords.yl); j++) {
      if (j === this.selectedLine) {
        attr = selectedAttr
      } else {
        attr = notSelectedAttr
      }
      const text = nodeLines[j]||[]
      for (let i = coords.xi; i < coords.xl; i++) {
        lines[j][i] = [attr, text[i]||' ']
      }
    }
    return coords
  }

  setNodes(data: TreeNode[]) {
    this.rootNodes = this.processNodes(data.length===0 ? [{name: 'Root', children: []}] : this.processNodes(data))
    this.currentNode = this.rootNodes[0]
  }

  /** it will set node's parent, previousSibling and nextSibling properties to user given TreeNodes */
  processNodes(nodes: TreeNode[]) {
    function f(n: Node, parent?: Node, prev?: Node, next?: Node){
      n.parent = parent
      n.previousSibling = prev
      n.nextSibling = next
      // n.index = parent && parent.children.indexOf(n)
      n.children.forEach((c, i)=>{
        f(c, n, i>0 ?n.children[i-1]:undefined, i<n.children.length-1 ? n.children[i+1] : undefined)
      })
    }
    nodes.forEach((n, i)=>{
      f(n, n, i>0 ?nodes[i-1]:undefined, i<nodes.length-1 ? nodes[i+1] : undefined)
    })
    return nodes as Node[]
  }
  
  getNodeLines(nodes: Node[], level=0,lines: string[] = []){
    nodes.forEach(node=>{
      lines.push(repeat(level, '-')+node.name)
      if(node.expanded){
        this.getNodeLines(node.children, level+1, lines)
      }
    })
    this.nodeLines = lines
    return lines
  }

  getFocusedNode(){
    return this.currentNode
  }
}



// test our new element:
const screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
installExitKeys(screen)
const rootNodes = [
  {name: 'n1', children: [{name: 'n11', children: []}]},
   {name: 'n2', children : []},
   {name: 'n3', children : [
  {name: 'n31', children: [{name: 'n311', children: [
  {name: 'n3111', children: [{name: 'n31111', children: []}]},

  ]}]},
   {name: 'n32', children : []},
   {name: 'n33', children : []},
     
   ]}
  
  ]
const w = new Tree({ rootNodes, parent: screen, width: 15, height: 17, style: { bg: 'darkgray', fg: 'white' , selected: {bg: 'green', fg: 'black'}} , scrollable: true})
const t = text({parent: screen, left: 19, top: 0, content: 'text'})

w.on('nodeSelect', n=>{t.content=`nodeSelect: ${n.name}, focusedNode: ${w.getFocusedNode().name}-------------`; screen.render()})
w.on('nodeFocus', n=>{t.content=`nodeFocus: ${n.name}, focusedNode: ${w.getFocusedNode().name}-------`; screen.render()})
w.on('nodeExpand', n=>{t.content=`nodeExpand: ${n.name}, focusedNode: ${w.getFocusedNode().name}-----------------`; screen.render()})

screen.render()
