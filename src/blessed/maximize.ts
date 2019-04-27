import { box, Box, button, Element, findDescendant, isElement, setElementData } from '..'
import { findAscendant } from './node'
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
export function setMaximized(el: Element, maximized: boolean, options: Options = { auto: true }) {
  if (!el) {
    return
  }
  const screen = el.screen
  if (maximized) {
    setElementData(el, 'maximize-parent', el.parent)
    setElementData(el, 'maximize-index', el.index)
    //TODO: check if undefined and throw
    const box = getBox()
    const container = findDescendant(box, e => isElement(e) && e.name === 'maximize-el-container')
    const restoreButton = findDescendant(box, e => isElement(e) && e.name === 'maximize-restore-button') as Element
    if (options.auto) {
      restoreButton!.show()
      //TODO: set custom labels from options
    } else {
      restoreButton.hide()
    }
    container!.children.forEach(e => e.detach())
    el.detach()
    container.append(el)
    screen.append(box)
    box.setFront()
    setElementData(box, 'maximize-target', el) // needed in auto
  } else {
    const box = getBox()
    //TODO: check that el is descendant of box
    const parent = getElementData<Element>(el, 'maximize-parent')
    const index = getElementData<number>(el, 'maximize-index')
    //TODO: check if undefined and throw
    el.detach()
    parent.insert(el, index)
    box.detach()
  }
  if (options.auto) {
    screen.render()
  }
}

/**
 * restore the state of current maximized element if any
 */
export function restoreMaximize(options: Options = { auto: true }) {
  const target = getElementData<Element>(getBox(), 'maximize-target')
  setMaximized(target, false)
}

export function isMaximized(el: Element) {
  return !!findAscendant(el, e => e === getBox())
}

let bo: Box
function getBox() {
  function restore() {
    const target = getElementData<Element>(getBox(), 'maximize-target')
    setMaximized(target, false)
  }

  if (!bo) {
    bo = box({
      // parent: screen,
      // style: { bg: 'blue', fg: 'white' },
      border: 'line',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%'
    })
    const b = button({
      parent: bo,
      content: 'Restore',
      name: 'maximize-restore-button',
      input: true,
      clickable: true,
      focusable: true,
      keyable: true
    })
    b.on('click', e => {
      restore()
    })
    b.on('pressed', e => {
      restore()
    })
    box({ parent: bo, name: 'maximize-el-container', width: '100%', height: '100%', top: 0, left: 0 })
  }
  return bo
}
// TODO: minimize ?
