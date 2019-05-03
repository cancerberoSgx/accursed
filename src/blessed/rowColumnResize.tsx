import { Element, findAscendant, isElement } from '..'
let rowColumnResize
interface Options {
  e: Element
  increment?: boolean
  step?: number
}
/**
 * TODO:
 *  * maximum and minimum (so containers dont get invisible)
 *  * restore button on all boxes
 *  * support width also since the algorithm should be the same.
 */
export function rowColumnResizeHandler(options: Options) {
  const { e, increment = false, step = 10 } = options
  const column = findAscendant<Element>(e, a => isElement(a) && a.options._data && a.options._data.rowColumnResize)
  if (column) {
    let columns = column.parent as Element
    const otherColumns = columns.children.filter(
      a => isElement(a) && a.options._data && a.options._data.rowColumnResize && a !== column
    ) as Element[]
    if (otherColumns.length) {
      const otherStep = Math.round(step / otherColumns.length)
      column.options._data.rowColumnResize.width =
        column.options._data.rowColumnResize.width + (increment ? step : step * -1)
      column.width = `${column.options._data.rowColumnResize.width}%`
      otherColumns.forEach(c => {
        c.options._data.rowColumnResize.width =
          c.options._data.rowColumnResize.width - (increment ? otherStep : otherStep * -1)
        c.width = `${c.options._data.rowColumnResize.width}%`
      })
      e.screen.render()
    }
  }
}
