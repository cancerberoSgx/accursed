import { Element, Screen, isElement, ElementOptions, colors } from '..';
import { TreeViewNode, findDescendantNamed, getContent, setElementData, getElementData , } from '../blessed';
import { React } from '../jsx';
import { Rows, Row } from '../jsx-components';
import { throttle } from 'misc-utils-of-mine-generic';

interface Options {
  /** if true blessed element will be associated in tree node as propety `blessedElement` */
  linkElements?: boolean
  getNodeLabel?(n: Element): string
}
const defaultOptions: Options = {
  getNodeLabel(n: Element) {
    return `${n.type} ${n.name || ''}`
  }
}

interface TreeNode {
  name: string,
  label: string,
  children: TreeNode[]
  blessedElement?: Element
}

export function getTreeNode(el: Element | Screen, o: Options = defaultOptions): TreeNode {
  return buildTreeNode(el as any, o)
}

function buildTreeNode(el: Element, o: Options = defaultOptions) {
  o = {...defaultOptions, ...o}

  return {...{
    label: o.getNodeLabel(el),
    name: el.type + `[${el.index}]`,
    expanded: true,
    children: (el.children || []).filter(isElement).map(c => buildTreeNode(c, o))
  }, ...o.linkElements ? {blessedElement: el}: {}}
}

export function logText(s: string, e: Element | Screen){
  const box = findDescendantNamed(e.screen, 'debug-tree-node-text')
  if(isElement(box)){
    box.content+=s
  box.screen.render()
  }
}

let lastFocused: Element
let timer : any
export function renderDescendants(el: Element | Screen, o: Options&ElementOptions = defaultOptions){
  o = {...defaultOptions, ...o}
  const nodes = [getTreeNode(el, {...o, linkElements: true})]
  
  return React.render( 
  <Rows parent={o.parent||undefined} >
    <Row >
<treeview height="100%" width="100%" border="line" label="tree" focusable={true} clickable={true} keyable={true} rootNodes={nodes} onNodeSelect={n=>treeNodeHighlight(n as any)
//   throttle((n: TreeNode&any)=>{

// treeNodeHighlight(n);
// }, 1000, {trailing: true})
}></treeview>
    </Row>
    <Row >
      <box name="debug-tree-node-text" label="node text" height= "100%" width="100%" border="line"></box>
    </Row>{}
  </Rows>
)

  function treeNodeHighlight(n: TreeNode&TreeViewNode) {
    if(!n||!n.blessedElement){
      return 
    }
    const e = n.blessedElement;
    // logText('hello. ', el)
    if (timer) {
      clearInterval(timer!);
    }
    // timer = undefined
    if (isElement(e)) {
      if (lastFocused) {
        const c = getElementData(e, 'debugNodeTreeHightlight') as any;
        if (c) {
          e.style.fg = c;
        }
        e.style.blink = false;
      }
      lastFocused = e;
      logText(e.getContent(), e);
      e.style.blink = true;
      setElementData(e, 'debugNodeTreeHightlight', e.style.fg);
      // let old = e.style.fg
      e.style.fg = 'magenta';
      e.screen.render();
        timer = setInterval(()=>{
          // e.content=Math.random()+''
          // const aux = e.fg
          // e.fg=colors.colorNames.magenta
          // e.bg=colors.colorNames.magenta
          // e.fg=e.bg
          // e.bg=aux
        //  e.style.fg = old
        if(lastFocused){
          lastFocused.style.blink=false
          // e.screen.render()
          
          const c = getElementData(e, 'debugNodeTreeHightlight') as any;
          if (c) {
            e.style.fg = c;
          }
          e.style.blink = false;
          lastFocused.screen.render()
        }
      },6000)
    }
  }
}