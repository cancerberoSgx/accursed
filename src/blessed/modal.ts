// import * as blessed from 'blessed'
import { tryTo } from 'misc-utils-of-mine-generic'
import { box, Element, Screen } from '..'
import { Box } from '../blessedTypes'
// import { box } from '..';

let lastOnClosedListener: undefined | (() => void)
/**
 * Easy to use modal: ``` showInModal(screen, anElement)``` or simply:  ``` showInModal(screen, 'some text')```
 *
 */
export function showInModal(
  screen: Screen,
  s: string | Element,
  title = 'Modal',
  width = '50%',
  height = '50%',
  onClosed?: () => void
) {
  closeModal(screen)
  if (!modalInstance) {
    modalInstance = box({
      parent: screen,
      // focusable: true,
      // focused: true,
      left: 'center',
      top: 'center',
      width,
      height,
      border: 'line',
      label: title
    })
    //TODO: remove those childs ?
    ;[modalInstance, ...modalInstance.children].forEach(c => c.on('click', data => modalInstance!.hide()))
  }
  if (typeof s === 'string') {
    modalInstance.setContent(s)
  } else {
    tryTo(() => {
      modalInstance && lastModalContent && modalInstance.remove(lastModalContent)
      lastModalContent && lastModalContent.destroy()
    })
    lastModalContent = s
    modalInstance.append(s)
  }
  modalInstance.setFront()
  modalInstance.setLabel(title)
  modalInstance.show()
  if (onClosed) {
    lastOnClosedListener = onClosed
  }
  screen.render()
  return modalInstance
}

let modalInstance: Box | undefined
let lastModalContent: Element | undefined

/**
 * Close current opened modal
 */
export function closeModal(screen: Screen) {
  if (lastOnClosedListener) {
    lastOnClosedListener()
    lastOnClosedListener = undefined
  }
  tryTo(() => {
    if (modalInstance) {
      modalInstance.hide()
    }
    resetModals() // safer not reuse
    screen.render()
  })
}

/**
 * Resets this manager. Useful when you are destroying / recreating screen to make sure there are no missing references to forgotten nodes.
 */
export function resetModals() {
  tryTo(() => {
    modalInstance && lastModalContent && modalInstance.remove(lastModalContent)
    lastModalContent && lastModalContent.destroy()
    modalInstance && modalInstance.destroy()
  })
  modalInstance = undefined
  lastModalContent = undefined
}

export function isModalVisible() {
  return modalInstance && !modalInstance.hidden
}
