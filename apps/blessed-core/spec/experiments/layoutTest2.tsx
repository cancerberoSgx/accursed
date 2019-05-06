import { array } from 'misc-utils-of-mine-generic'
import { debug, Layout } from '../../src'
import { createProgramRendererDocumentAndElement } from '../../src/util/util'
import { color, number } from '../data'

interface LG {
  boxes: {
    aspectRatio: number
    top: number
    width: number
    height: number
    left: number
  }[]
  ontainerHeight: number
  widowCount: number
}
// const i = [{ width: 20, height: 10 }, { width: 30, height: 16 }, { width: 14, height: 5 }, { width: 20, height: 10 }, { width: 30, height: 16 }, { width: 14, height: 5 }, { width: 20, height: 10 }, { width: 30, height: 16 }, { width: 14, height: 5 }, { width: 20, height: 10 }, { width: 30, height: 16 }, { width: 14, height: 5 }, { width: 20, height: 10 }, { width: 30, height: 16 }, { width: 14, height: 5 }]
// const i = [{ width: 20, height: 10 }, { width: 30, height: 16 }, { width: 14, height: 5 }, { width: 20, height: 10 }, { width: 30, height: 16 }, { width: 14, height: 5 }, { width: 20, height: 10 }, { width: 30, height: 16 }, ]

try {

  const { renderer, el } = createProgramRendererDocumentAndElement(undefined,  {layout: { layout: Layout['justified-layout'], justifiedLayout: { targetRowHeight: 10, targetRowHeightTolerance: 0 } }, children: array(20).map(i => ({
  top: number(0, 20), left: number(20), width: number(23, 40), height: number(12, 20), bg: color(), border: true
}))})
// debug(el.props.width, renderer.program.cols);

// var layoutGeometry = require('justified-layout')(i, {
//   containerWidth: el.props.width,
//   containerHeight: el.props.height,
//   targetRowHeight: 22,
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

// debug(layoutGeometry)
// el.create({children: layoutGeometry.boxes.map(b=>({top: Math.trunc(b.top), left: Math.trunc(b.left),width: Math.trunc(b.width),height: Math.trunc(b.height),bg: 'red', border: true}))})

// el.create()

// el.props.layout={
//   layout: Layout['binary-tree'],
//   // justifiedLayout: {}
// }

// el.create({width: 5, height: 10, children: ['seba']})
// const app =

// const e = Flor.render(p)
  el.layoutChildren()
  renderer.renderElement(el)

} catch (error) {
  console.log(error)
  debug(error)

}
// animate({

// console.log(layoutGeometry);
// { containerHeight: 46.78813040053021,
//   widowCount: 1,
//   boxes:
//    [ { aspectRatio: 2,
//        top: 0,
//        width: 22.748815165876774,
//        height: 11.374407582938387,
//        left: 0 },
