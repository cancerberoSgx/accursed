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
    currentTarget = el
    visitDescendants(screen, d => {
      if (isElement(d) && (!findAscendant(d, a => a === el) && d !== el && !findAscendant(el, a => a === d))) {
        debug(d.type, d.name)
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
  } else {
    visitDescendants(screen, d => {
      //TODO: dont show the ones that were originally hidden
      if (isElement(d)) {
        if (d.hidden) {
          setTimeout(() => {
            d.show()
            d.render()
          }, 10)
        }
      }
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
  }
  screen.render()
}

let currentTarget: Element | undefined

/**
 * restore the state of current maximized element if any
 */
export function restoreMaximize(options: Options = { auto: true }) {
  setMaximized(currentTarget, false)
}

export function isMaximized(el: Element) {
  return !!currentTarget
}
