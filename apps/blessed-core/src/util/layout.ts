import { ProgramElement } from '..'
import { isElement } from '../programDom/nodeUtil'

let layout = require('layout')

interface Options {
  el: ProgramElement
  layout: 'top-down' | 'left-right'
}

export function layoutChildren(o: Options) {
  let layer: any = layout(o.layout)
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
