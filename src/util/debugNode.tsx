import { shorter } from 'misc-utils-of-mine-generic'
import { inspect } from 'util'
import { Element, ElementOptions, isElement, Screen } from '..'
import { findDescendantNamed, getElementData, setElementData, TreeViewNode } from '../blessed'
import { React } from '../jsx'
import { Row, Rows } from '../jsx-components'
import { focusableOpts } from './sharedOptions'

interface Options {
  /** if true blessed element will be associated in tree node as propety `blessedElement` */
  linkElements?: boolean
  getNodeLabel?(n: Element): string
}
const defaultOptions: Options = {
  getNodeLabel(n: Element) {
    return !n ? 'undefined' : `${n.type} ${n.name || ''}`
  }
}

interface TreeNode {
  name: string
  label: string
  children: TreeNode[]
  blessedElement?: Element
}

export function getTreeNode(el: Element | Screen, o: Options = defaultOptions): TreeNode {
  return buildTreeNode(el as any, o)
}

function buildTreeNode(el: Element, o: Options = defaultOptions) {
  if (!el) {
    return {
      label: 'undefined',
      name: 'undefined',
      expanded: true,
      children: []
    }
  }
  o = { ...defaultOptions, ...o }
  return {
    ...{
      label: o.getNodeLabel(el) + '  - isElement: ' + isElement(el) + ' - ' + shorter(el.content || 'undefined', 40),
      name: el.type + `[${el.index}]`,
      expanded: true,
      children: (el.children || []).filter(isElement).map(c => buildTreeNode(c, o))
    },
    ...(o.linkElements ? { blessedElement: el } : {})
  }
}

export function logText(e: Element | Screen, ...args: any[]) {
  const box = findDescendantNamed(e.screen, 'debug-tree-node-text')
  if (isElement(box)) {
    box.content += '\n' + args.map(a => inspect(a)).join(' ')
    box.screen.render()
  }
}

let lastFocused: Element
let timer: any
export function renderDescendants(el: Element | Screen, o: Options & ElementOptions = defaultOptions) {
  o = { ...defaultOptions, ...o }
  const nodes = [getTreeNode(el, { ...o, linkElements: true })]

  return React.render(
    <Rows parent={o.parent || undefined}>
      <Row>
        <treeview
          {...focusableOpts()}
          height="100%"
          width="100%"
          border="line"
          label="tree"
          // focusable={true} clickable={true} keyable={true}
          rootNodes={nodes}
          onNodeSelect={
            n => treeNodeHighlight(n as any)
            //   throttle((n: TreeNode&any)=>{

            // treeNodeHighlight(n);
            // }, 1000, {trailing: true})
          }
        />
      </Row>
      <Row>
        <box
          {...focusableOpts()}
          name="debug-tree-node-text"
          label="node text"
          height="100%"
          width="100%"
          border="line"
          scrollable={true}
          scrollbar={{ inverse: true }}
        />
      </Row>
      {}
    </Rows>
  )

  function treeNodeHighlight(n: TreeNode & TreeViewNode) {
    if (!n || !n.blessedElement) {
      return
    }
    const e = n.blessedElement
    // logText('hello. ', el)
    if (timer) {
      clearInterval(timer!)
    }
    // timer = undefined
    if (isElement(e)) {
      if (lastFocused) {
        const c = getElementData(e, 'debugNodeTreeHightlight') as any
        if (c) {
          e.style.fg = c
        }
        e.style.blink = false
      }
      lastFocused = e
      // logText(e.getContent(), e);
      e.style.blink = true
      setElementData(e, 'debugNodeTreeHightlight', e.style.fg)
      // let old = e.style.fg
      e.style.fg = 'magenta'
      e.screen.render()
      timer = setInterval(() => {
        // e.content=Math.random()+''
        // const aux = e.fg
        // e.fg=colors.colorNames.magenta
        // e.bg=colors.colorNames.magenta
        // e.fg=e.bg
        // e.bg=aux
        //  e.style.fg = old
        if (lastFocused) {
          lastFocused.style.blink = false
          // e.screen.render()

          const c = getElementData(e, 'debugNodeTreeHightlight') as any
          if (c) {
            e.style.fg = c
          }
          e.style.blink = false
          lastFocused.screen.render()
        }
      }, 6000)
    }
  }
}
