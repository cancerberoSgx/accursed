import { getObjectProperty } from '../util/misc'
import { isElement, Layout, LayoutIterator } from './blessedTypes'

/**
 * The same blessed Layout renderer function with a few modifications and adapted to TypeScript. Modifications:
 *
 *  * It won't render children that overflow the layout if layout's style.overflow===hidden
 *  * if layout=='inline' and an element has style.display==='block' then it will be rendered in a new line no matter that there is space for it in current line.
 *
 */
export function renderer(this: Layout, coords: { xl: number; xi: number; yl: number; yi: number }) {
  // The coordinates of the layout element
  var width = coords.xl - coords.xi,
    height = coords.yl - coords.yi,
    xi = coords.xi,
    yi = coords.yi

  const overflowHidden = getObjectProperty(this, 'options.style.overflow') === 'hidden'
  // The current row offset in cells (which row are we on?)
  var rowOffset = 0

  // The index of the first child in the row
  var rowIndex = 0
  var lastRowIndex = 0

  // Figure out the highest width child
  if (this.options.layout === 'grid') {
    var highWidth = this.children.reduce((out: any, el: any) => {
      out = Math.max(out, el.width)
      return out
    }, 0)
  }

  const iterator: LayoutIterator = (el, i) => {
    // Make our children shrinkable. If they don't have a height, for
    // example, calculate it for them.
    el.shrink = true

    // Find the previous rendered child's coordinates
    var last = this.getLast(i)

    // If there is no previously rendered element, we are on the first child.
    if (!last) {
      el.position.left = 0
      el.position.top = 0
    } else {
      // Otherwise, figure out where to place this child. We'll start by
      // setting it's `left`/`x` coordinate to right after the previous
      // rendered element. This child will end up directly to the right of it.
      el.position.left = last.lpos.xl - xi

      // Make sure the position matches the highest width element
      if (this.options.layout === 'grid') {
        // Compensate with width:
        // el.position.width = el.width + (highWidth - el.width);
        // Compensate with position:
        el.position.left += highWidth - (last.lpos.xl - last.lpos.xi)
      }

      // if (el.type === 'markdown' && ) {
      //   this.screen.log('hell0', this.options.style.display, el.options.style.display) // getObjectProperty(el, 'options.style.display')+'')
      //   // console.log( this.options.el.options.style.display)// getObjectProperty(el, 'options.style.display'));
      // }
      // If our child does not overlap the right side of the Layout, set it's
      // `top`/`y` to the current `rowOffset` (the coordinate for the current
      // row).
      if (getObjectProperty(el, 'options.style.display') !== 'block' && el.position.left + el.width <= width) {
        el.position.top = rowOffset
      } else {
        // Otherwise we need to start a new row and calculate a new
        // `rowOffset` and `rowIndex` (the index of the child on the current
        // row).
        rowOffset += this.children.slice(rowIndex, i).reduce((out, el) => {
          if (!isElement(el) || !this.isRendered(el)) return out
          out = Math.max(out, el.lpos.yl - el.lpos.yi)
          return out
        }, 0)
        lastRowIndex = rowIndex
        rowIndex = i || 0
        el.position.left = 0
        el.position.top = rowOffset
      }
    }

    // Make sure the elements on lower rows graviatate up as much as possible
    if (this.options.layout === 'inline') {
      var above = null
      var abovea = Infinity
      for (var j = lastRowIndex; j < rowIndex; j++) {
        var l = this.children[j]
        if (!isElement(l) || !this.isRendered(l)) continue
        var abs = Math.abs(el.position.left - (l.lpos.xi - xi))
        // if (abs < abovea && (l.lpos.xl - l.lpos.xi) <= el.width) {
        if (abs < abovea) {
          above = l
          abovea = abs
        }
      }
      if (above) {
        el.position.top = above.lpos.yl - yi
      }
    }

    const overflow =
      el.height < 0 ||
      el.atop + el.height > this.atop + this.height ||
      el.position.top + el.height > height ||
      (el.getLines() || []).length > height
    // if (!overflow) {
    // //@ts-ignore
    // el.screen.log({
    //   type: el.type,
    //   el: [el.atop, el.abottom, el.height, el.iheight],
    //   this: [this.atop, this.abottom, this.height, this.iheight]
    // })
    // }
    // If our child overflows the Layout, do not render it!
    if (overflowHidden && overflow) {
      // Returning false tells blessed to ignore this child.
      return false
    }
  }
  return iterator
}

// declare global {
// export namespace Widgets {
//   export namespace Types{
//     interface TStyle {
//       display: string,
//       overflow: string
//     }
//   }}
// }
// // export declare module blessed {
//   // export namespace blessed {
//     // declare namespaceblessed {
//       export namespace Widgets {
//         export namespace Types {
//           export interface TStyle {
//             display: 'string', overflow: string
//           }
//       }
//       // export interface LayoutOptions{
//       //   foo: number
//       // }
//     }
//     // }

//   // }
// // }
