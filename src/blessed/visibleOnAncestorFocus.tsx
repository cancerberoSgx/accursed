import { Element, ElementPredicate, findAscendant, findDescendant, onFocused, Screen } from '..'

interface Options {
  screen: Screen
  ancestorPredicate: ElementPredicate<Element>
  targetPredicate: ElementPredicate<Element>
}
/**
 * Will hide/show particular descendant nodes when a particular ancestor of them are focused or any descendant of that ancestor.
 *
 * Useful to automatically show/hide controls when any descendant of a particular container acquires focus.
 */
export function installVisibleOnAncestorFocus(options: Options) {
  onFocused(options.screen, ({ focused, old }) => {
    // logger.log('focus')
    let oldColumn: Element, newColumn: Element, newControl: Element, oldControl: Element
    if (old) {
      oldColumn = findAscendant<Element>(old, options.ancestorPredicate as any)
    }
    if (focused) {
      newColumn = findAscendant<Element>(focused, options.ancestorPredicate as any)
    }
    if (oldColumn !== newColumn) {
      if (oldColumn) {
        oldControl = findDescendant(oldColumn, options.targetPredicate as any) // findDescendantNamed(oldColumn, "visible-on-ancestor-focus-target")
      }
      // screenLogger(screen).log('oldColumn', !!oldColumn)
      if (newColumn) {
        newControl = findDescendant(newColumn, options.targetPredicate as any) //findDescendantNamed(newColumn, "visible-on-ancestor-focus-target")
      }
      if (newControl !== oldControl) {
        if (oldControl) {
          oldControl.hide()
        }
        if (newControl) {
          newControl.show()
        }
        options.screen.render()
      }
      // screenLogger(screen).log('newColumn', !!newColumn)
    }
  })
}
