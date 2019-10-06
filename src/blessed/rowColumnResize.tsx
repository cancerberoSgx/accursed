import { Element, findAscendant, isElement } from '..'
import { screenLogger } from '../util'

interface Options {
  e: Element
  increment?: boolean
  step?: number
  /**
   * if true it will work with element's `width` attribute, as if they were CColumns. If false it will work with `height` as if they were Rows.
   */
  width: boolean
}

/**
 * TODO:
 *  * maximum and minimum (so containers dont get invisible). Nice to have: per column/row
 *  * restore button on all boxes
 *  * support width also since the algorithm should be the same.
 * * a single button and be able to resize with arrow keys / mouse wheel
 */
export function rowColumnResizeHandler(options: Options) {
  const { e, increment = false, step = 10, width } = options
  const column = findAscendant<Element>(e, a => isElement(a) && a.options._data && a.options._data.rowColumnResize)
  if (column) {
    let columns = column.parent as Element
    const otherColumns = columns.children.filter(
      a => isElement(a) && a.options._data && a.options._data.rowColumnResize && a !== column
    ) as Element[]
    if (otherColumns.length) {
      screenLogger(e.screen).log(
        'otherColumns',
        otherColumns.length,
        get(column.options._data.rowColumnResize),
        'otherStep: ',
        Math.round(step / otherColumns.length)
      )
      set(
        column.options._data.rowColumnResize,
        get(column.options._data.rowColumnResize) + (increment ? step : step * -1)
      )
      const otherStep = Math.round(step / otherColumns.length)
      set(column, `${get(column.options._data.rowColumnResize)}%`)
      otherColumns.forEach(c => {
        set(
          c.options._data.rowColumnResize,
          get(c.options._data.rowColumnResize) - (increment ? otherStep : otherStep * -1)
        )
        set(c, `${get(c.options._data.rowColumnResize)}%`)
      })
      e.screen.render()
    }
  }

  function get<T extends { width: number; height: number }>(e: T): number {
    return width ? e.width : e.height
  }
  function set<T extends { width: string | number; height: string | number }>(e: T, value: string | number) {
    if (width) {
      e.width = value
    } else {
      e.height = value
    }
  }
}

// export class RowColumnResizer extends Component {
//   constructor(p,s){
//     super(p,s)
//   }
// render(){
//   return <Div height={1} name="rowColumnResize" hidden={true} ref={ref<Element>(c=>this.install(c))}>
//   <Button2
//     {...focusableOpts()}
//     border={undefined}
//     onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: false })}>
//     {'<'}
//   </Button2>
//   <Button2
//     {...focusableOpts()}
//     border={undefined}
//     onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: false  })}>
//     {'>'}
//   </Button2>
// </Div>
// }
// async install(box: Element){
//   await attached(box)

// }
// }

// async function attached(e: Element){
//   return isAttached(e) ? Promise.resolve(e) : new Promise(resolve=>e.once('attach', ()=>resolve(e)))
// }
