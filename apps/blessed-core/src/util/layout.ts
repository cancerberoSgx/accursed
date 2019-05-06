import { ProgramElement } from '..'
import { isElement } from '../programDom/elementUtil'
const layout = require('layout')

export interface LayoutOptions {
  /**
   * If non is provided 'binary-tree' will be used
   */
  layout?: Layout
  /**
   * lined-up layouts support sorting items from smaller to biggest one. 
   */
  sort?: boolean
}

export enum Layout {
  /** 
   * The top-down algorithm places items vertically.
   * By default, it sorts from smallest (top-right) to largest (bottom-left). However, this can be disabled via sort: false.  
   */
  'top-down'= 'top-down', 
  /**
   * The left-right algorithm places items horizontally.
   * 
   * By default, it sorts from smallest (left) to largest (right). However, this can be disabled via sort: false.
   */
  'left-right'='left-right', 
  /** 
   * The diagonal algorithm places items diagonally (top-left to bottom-right).
   * By default, it sorts from smallest (top-left) to largest (bottom-right). However, this can be disabled via sort: false. 
   */
  'diagonal' =  'diagonal', 
  /** 
   * The alt-diagonal algorithm places items diagonally (top-right to bottom-left). 
   */
  'alt-diagonal'= 'alt-diagonal', 
  /**
   * The binary-tree algorithm packs items via the binary tree algorithm.
   * This is an efficient way to pack items into the smallest container possible.
   */
  'binary-tree'= 'binary-tree'
}

/**
 * Will change top, left, width and height of element's children. Also it could change element's width and height. 
 */
export function layoutChildren(o: LayoutOptions&{
  el: ProgramElement}) {
  let layer: any = layout(o.layout, {sort: !!o.sort})
  for (let c of o.el.childNodes) {
    if (isElement(c)) {
      layer.addItem({ 'height': c.props.height, 'width': c.props.width, 'meta': c })
    }
  }
  let info: Info = layer['export']()
  info.items.forEach(i => {
    i.meta.props.left = i.x
    i.meta.props.top = i.y
    i.meta.props.width = i.width
    i.meta.props.height = i.height
  })
  o.el.props.width = info.width + (o.el.props.border ? 2 : 0)
  o.el.props.height = info.height + + (o.el.props.border ? 2 : 0)
}

interface Info {
  height: number, width: number
  items: { height: number, width: number, x: number, y: number, meta: ProgramElement }[]
}
