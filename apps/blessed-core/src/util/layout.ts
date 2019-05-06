import { merge } from 'misc-utils-of-mine-generic'
import { ProgramElement } from '..'
import { isElement } from '../programDom/elementUtil'
import { debug } from './logger'

export interface LayoutOptions {
  /**
   * If non is provided 'binary-tree' will be used
   */
  layout?: Layout
  /**
   * lined-up layouts support sorting items from smaller to biggest one.
   */
  sort?: boolean

  /**
   * Options for layout == 'justified-layout
   */
  justifiedLayout?: JustifiedLayoutOptions

}
export enum Layout {
  /**
   * The top-down algorithm places items vertically.
   *
   * By default, it sorts from smallest (top-right) to largest (bottom-left). However, this can be disabled
   * via sort: false.
   */
  'top-down' = 'top-down',
  /**
   * The left-right algorithm places items horizontally.
   *
   * By default, it sorts from smallest (left) to largest (right). However, this can be disabled via sort:
   * false.
   */
  'left-right' = 'left-right',
  /**
   * The diagonal algorithm places items diagonally (top-left to bottom-right).
   *
   * By default, it sorts from smallest (top-left) to largest (bottom-right). However, this can be disabled
   * via sort: false.
   */
  'diagonal' = 'diagonal',
  /**
   * The alt-diagonal algorithm places items diagonally (top-right to bottom-left).
   */
  'alt-diagonal' = 'alt-diagonal',
  /**
   * The binary-tree algorithm packs items via the binary tree algorithm.
   *
   * This is an efficient way to pack items into the smallest container possible.
   */
  'binary-tree' = 'binary-tree',
  /**
   * This is [Flickr justified-layout](http://flickr.github.io/justified-layout/) used to show images in
   * justified rows. Has many configurable options available in property [[jsutifiedLayoutOptions]]. See
   */
  'justified-layout' = 'justified-layout'
}

/**
 * Will change top, left, width and height of element's children. Also it could change element's width and
 * height.
 */
export function layoutChildren(o: LayoutOptions & { el: ProgramElement }) {
  debug('layout()', o.layout)
  if (!o.layout || layoutNames.includes(o.layout)) {
    handleLayout(o)
  } else if (o.layout === 'justified-layout') {
    handleJustifiedLayout(o)
  } else {
    // TODO: unknown layout log
  }
}

// justified layout impl

/**
 * Accepts an array of boxes (with a lot of optional configuration options) and returns geometry for a nice justified layout as seen all over [Flickr](https://www.flickr.com/explore)
 */
interface JustifiedLayoutOptions {
  /**
   * Provide a single integer to apply padding to all sides or provide an object to apply individual values
   * to each side, like this:
   */
  containerPadding?: {
    top?: number,
    right?: number,
    bottom?: number,
    left?: number
  },
  /**
   *  Provide a single integer to apply spacing both horizontally and vertically or provide an object to
   *  apply individual values to each axis, like this:
   */
  boxSpacing?: {
    horizontal?: number
    vertical?: number
  },
  /**
   * It's called a target because row height is the lever we use in order to fit everything in nicely. The
   * algorithm will get as close to the target row height as it can.
   *
   * **IMPORTANT** by default is setted to half element's height, but if many children should be adjust.
   */
  targetRowHeight?: number
  /**
   * Will stop adding rows at this number regardless of how many items still need to be laid out.
   */
  maxNumRows?: number
  /**
   * If you'd like to insert a full width box every n rows you can specify it with this parameter. The box
   * on that row will ignore the targetRowHeight, make itself as wide as containerWidth - containerPadding
   * and be as tall as its aspect ratio defines. It'll only happen if that item has an aspect ratio >= 1.
   * Best to have a look at the examples to see what this does. Default : false.
   */
  fullWidthBreakoutRowCadence?: boolean
  /**
   * How far row heights can stray from targetRowHeight. 0 would force rows to be the targetRowHeight
   * exactly and would likely make it impossible to justify. The value must be between 0 and 1. Default
   * value:   0.25.
   */
  targetRowHeightTolerance?: number
  /**
  Provide an aspect ratio here to return everything in that aspect ratio. Makes the values in your input array irrelevant. The length of the array remains relevant. default value: false.
   */
  forceAspectRatio?: boolean | number
}

const justifiedLayout = require('justified-layout')
function handleJustifiedLayout(o: LayoutOptions & { el: ProgramElement }) {
  const children = Array.from(o.el.childNodes).filter(isElement)
  const data = children.map(c => ({
    top: c.props.top,
    left: c.props.left,
    width: c.props.width||1,
    height: c.props.height||1
  }))
  // debug(data)
  const def = {
    containerWidth: o.el.props.width,
    containerHeight: o.el.props.height,
    targetRowHeight: Math.trunc(o.el.props.height / 5),
    boxSpacing: 0,
    maxNumRows: 5,
    containerPadding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    }
  }
  const mandatory = {
    containerWidth: o.el.props.width,
    containerHeight: o.el.props.height
  }
  const options = merge(true, true, {}, def, o.justifiedLayout || {}, mandatory)
  // debug({ options })
  const result = justifiedLayout(data, options) as JustifiedLayoutResult
  // debug(result.boxes)

  if (result && result.boxes) {
    if (result.boxes.length !== children.length) {
      // console.warn('WARNING - justified-layout returned different amonunt of results than current children: ', result)
    }
    children.forEach((c, i) => {
      const r = result.boxes[i]
      if (r) {
        c.props.extend({ top: Math.trunc(r.top), left: Math.trunc(r.left), width: Math.trunc(r.width), height: Math.trunc(r.height) })
      }
    })
  }
  // if (result && result.containerHeight) {
  //   o.el.props.height = Math.round(result.containerHeight)
  // }

// const layoutGeometry = justifiedLayout(i, {
//   containerWidth: o.el.props.width,
//   containerHeight: o.el.props.height,
//   targetRowHeight: o.ju15,
//   boxSpacing: 0,
//   // containerPadding: 0,
//   maxNumRows: 6,
//   containerPadding: {
//     top: 2,
//     right: 5,
//     bottom: 1,
//     left: 1
// }
// ,
//   // forceAspectRatio: true
// }) as LG

// }

// el.create({children: layoutGeometry.boxes.map(b=>({top: Math.trunc(b.top), left: Math.trunc(b.left),width:
// Math.trunc(b.width),height: Math.trunc(b.height),bg: 'red', border: true}))})

// layout package impl

}

interface JustifiedLayoutResult {
  boxes: {
    aspectRatio: number
    top: number
    width: number
    height: number
    left: number
  }[]
  containerHeight: number
  widowCount: number
}

const layout = require('layout')

const layoutNames = ['binary-tree', 'alt-diagonal', 'diagonal', 'left-right', 'top-down']
interface Info {
  height: number, width: number
  items: { height: number, width: number, x: number, y: number, meta: ProgramElement }[]
}
function handleLayout(o: LayoutOptions & { el: ProgramElement }) {
  let layer: any = layout(o.layout, { sort: !!o.sort })
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
