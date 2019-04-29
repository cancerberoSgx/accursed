import { Element, isElement, setElementData } from '..'
import { debug } from '../util'
import { findAscendant, visitDescendants } from './node'
import { getElementData } from './util'

interface Options {
  /**
   * If true, the framework will automatically add a "Restore" button when maximized that, when clicked, will
   * restore the element to its original size and parent. If false, the element itself is responsible of
   * providing such thing, probably with a button inside of it that allow the user to restore the element,
   * probably calling setMaximized(el, false)
   */
  auto?: boolean
}

/**
 * Maximize given element by attaching it as first child of the screen and with full dimensions. It stores original parent and index as data.
 *
 * TODO: if auto: true, then if we are adding a button for restoring we should also add a button for maximize which we dont
 */
export function setMaximized(el: Element, maximize: boolean, options: Options = { auto: true }) {
  if (!el) {
    return
  }
  const screen = el.screen
  if (maximize) {
    // setElementData(el, 'maximize-parent', el.parent)
    // setElementData(el, 'maximize-index', el.index)
    // //TODO: check if undefined and throw
    // const box = getBox()
    // const container = findDescendant(box, e => isElement(e) && e.name === 'maximize-el-container')
    // const restoreButton = findDescendant(box, e => isElement(e) && e.name === 'maximize-restore-button') as Element
    // if (options.auto) {
    //   restoreButton!.show()
    //   //TODO: set custom labels from options
    // } else {
    //   restoreButton.hide()
    // }
    // visitAscendants(el, a=>{
    //   if(isElement(a) && isScreen(a.parent)){
    //     a.setFront()
    //     a.width=screen.width
    //     a.height=screen.height
    //   }
    //   else if(isElement(a)) {
    //     a.setFront()
    //     a.width='100%'
    //     a.height='100%'
    //   }
    //   return false
    // })
    // setElementData(screen, 'maximize-target', el )
    currentTarget = el
    // debug(root && root.type, root && root.name)
    // screen.children.filter(c=>c!==root).filter(isElement).forEach(c=>{debug(c.type, getContent(c)); c.style.fg='magenta'; c.style.border={fg: 'magenta'}})
    visitDescendants(screen, d => {
      // debug(d.type, (d as any).name)//getContent(d))
      if (isElement(d) && (!findAscendant(d, a => a === el) && d !== el && !findAscendant(el, a => a === d))) {
        debug(d.type, d.name) //getContent(d))
        d.hide()
      }
      return false
    })

    setElementData(el, 'maximized-target-width', el.width)
    setElementData(el, 'maximized-target-height', el.height)
    setElementData(el, 'maximized-target-rtop', el.rtop)
    setElementData(el, 'maximized-target-rleft', el.rleft)

    el.width = screen.width
    el.height = screen.height
    el.rtop = 0
    el.rleft = 0
    // screen.render()

    // container!.children.forEach(e => e.detach())

    // el.detach()
    // container.append(el)
    // screen.append(box)
    // box.setFront()
    // setElementData(box, 'maximize-target', el) // needed in auto
  } else {
    //
    visitDescendants(screen, d => {
      //TODO: dont show the ones that were originally hidden
      if (isElement(d)) {
        // getElementData(el, 'maximized-target-width')
        // getElementData(el, 'maximized-target-height')
        // getElementData(el, 'maximized-target-rtop')
        // getElementData(el, 'maximized-target-rleft')

        if (d.hidden) {
          setTimeout(() => {
            d.show()
            d.render()
          }, 10)
        }
      }

      // debug(d.type, (d as any).name)//getContent(d))
      // if(isElement(d) &&( !findAscendant(d, a=>a===el)&&d!==el&&!findAscendant(el, a=>a===d))) {
      //   debug(d.type, d.name)//getContent(d))
      //   d.hide()
      // }
      return false
    })

    setTimeout(() => {
      screen.render()
    }, 100)

    el.width = getElementData(el, 'maximized-target-width')
    el.height = getElementData(el, 'maximized-target-height')
    el.rtop = getElementData(el, 'maximized-target-rtop')
    el.rleft = getElementData(el, 'maximized-target-rleft')

    currentTarget = undefined
    // const box = getBox()
    // //TODO: check that el is descendant of box
    // const parent = getElementData<Element>(el, 'maximize-parent')
    // const index = getElementData<number>(el, 'maximize-index')
    // //TODO: check if undefined and throw
    // el.detach()
    // parent.insert(el, index)
    // box.detach()
  }
  // if (options.auto) {
  screen.render()
  // }
}

let currentTarget: Element | undefined
/**
 * restore the state of current maximized element if any
 */
export function restoreMaximize(options: Options = { auto: true }) {
  // const target = getElementData<Element>(getBox(), 'maximize-target')
  setMaximized(currentTarget, false)
}

export function isMaximized(el: Element) {
  // return !!findAscendant(el, e => e === getBox())
  return !!currentTarget
}

// let bo: Box
// function getBox() {
//   function restore() {
//     const target = getElementData<Element>(getBox(), 'maximize-target')
//     setMaximized(target, false)
//   }

//   if (!bo) {
//     bo = box({
//       // parent: screen,
//       // style: { bg: 'blue', fg: 'white' },
//       border: 'line',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%'
//     })
//     const b = button({
//       parent: bo,
//       content: 'Restore',
//       name: 'maximize-restore-button',
//       input: true,
//       clickable: true,
//       focusable: true,
//       keyable: true
//     })
//     b.on('click', e => {
//       restore()
//     })
//     b.on('pressed', e => {
//       restore()
//     })
//     box({ parent: bo, name: 'maximize-el-container', width: '100%', height: '100%', top: 0, left: 0 })
//   }
//   return bo
// }
// // TODO: minimize ?
