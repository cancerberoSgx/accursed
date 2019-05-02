import * as blessed from 'blessed'
import { Emitter } from 'misc-utils-of-mine-generic'
import { Element, Screen, Style } from '../blessedTypes'
import { isBlessedElement } from './util'

export function isFocused(screen: blessed.Widgets.Screen, el: Element) {
  return el === screen.focused || el.hasDescendant(screen.focused)
}

/**
 * Same as [[onFocus]] but without polling screen.focused. This implementation wraps Screen.prototype._focus to detect when focused element changes
 */
export function onFocused(screen: Screen, f: OnFocusedListener) {
  if (!onFocused_focus) {
    const onFocused_focus = blessed.widget.Screen.prototype._focus
    blessed.widget.Screen.prototype._focus = function(focused: Element, old?: Element) {
      const result = onFocused_focus.apply(this, [focused, old])
      onFocusedEmitter.emit({ focused, old })
      return result
    }
  }
  onFocusedEmitter.add(f)
}
type OnFocusedListener = ({ focused, old }: { focused: Element; old?: Element }) => void
/**
 * Removes an onFocused listener. See [[onFocused]]
 */
export function offFocused(f: OnFocusedListener) {
  onFocusedEmitter.remove(f)
}
const onFocusedEmitter = new Emitter()
let onFocused_focus: typeof blessed.widget.Screen.prototype._focus | undefined

const focusStyle: Style = {
  // border: {
  //   type: 'line',
  //   fg: 'red'
  // }
}

/**
 * @obsolete in favor of [[onFocused]].
 *
 * Provides blur/focus notifications on those terminals that focus protocol is not supported (so bless focus/blur events won't work).
 *
 * It will poll screen.focused and notify when focus/blur is detected.
 */
export function onBlur(
  el: Element,
  screen: blessed.Widgets.Screen,
  fn: (focused?: Element, previous?: Element) => void,
  emitNow: boolean = false
) {
  onFocusChange(screen, (actual, previous) => {
    if (previous === el && actual !== el) {
      fn(actual, lastFocused)
    }
  })
  if (emitNow && screen.focused !== el) {
    fn(screen.focused, lastFocused)
  }
}

/**
 * @obsolete in favor of [[onFocused]].
 *
 * Provides blur/focus notifications on those terminals that focus protocol is not supported (so bless focus/blur events won't work).
 *
 * It will poll screen.focused and notify when focus/blur is detected.
 */
export function onFocus(
  el: Element,
  screen: blessed.Widgets.Screen,
  fn: OnFocusChangeListener,
  emitNow: boolean = false
) {
  onFocusChange(screen, (actual, previous) => {
    if (previous !== el && actual === el) {
      fn(actual, lastFocused)
    }
  })
  if (emitNow && screen.focused === el) {
    fn(screen.focused, lastFocused)
  }
}

type OnFocusChangeListener = (focused?: Element, previous?: Element) => void

/**
 * @obsolete in favor of [[onFocused]].
 *
 * Provides blur/focus notifications on those terminals that focus protocol is not supported (so bless focus/blur events won't work).
 *
 * It will poll screen.focused and notify when focus/blur is detected.
 *
 * TODO: offFocusChange()
 */
export function onFocusChange(screen: blessed.Widgets.Screen, fn: OnFocusChangeListener) {
  lastFocused = lastFocused || screen.focused
  if (typeof onFocusChangeTimer === 'undefined') {
    onFocusChangeTimer = setInterval(() => {
      if (lastFocused !== screen.focused) {
        onFocusChangeListeners.forEach(l => l(screen.focused, lastFocused))
      }
      lastFocused = screen.focused
    }, onFocusChangeInterval)
  }
  if (!onFocusChangeListeners.includes(fn)) {
    onFocusChangeListeners.push(fn)
  }
}

const onFocusChangeListeners: OnFocusChangeListener[] = []
let onFocusChangeInterval = 500

/**
 * @obsolete in favor of [[onFocused]].
 *
 * change the polling interval. By default it's 500 ms
 */
export function setOnFocusChangeInterval(t: number) {
  onFocusChangeInterval = t
}

let onFocusChangeTimer: NodeJS.Timeout | undefined = undefined

let lastFocused: Element | undefined
let lastFocus: { [id: string]: number } = {}

/**
 * @obsolete in favor of [[onFocused]].
 *
 * It resets the focus manager. Useful if you are destroying / recreating the screen.
 */
export function resetFocusManager() {
  lastFocused = undefined
  onFocusChangeTimer && clearInterval(onFocusChangeTimer)
  lastFocus = {}
  onFocusChangeListeners.length = 0
}
/**
 * @obsolete in favor of [[onFocused]].
 */
export function uninstallFocusHandler(focusId: string) {
  if (typeof lastFocus[focusId] === 'undefined') {
    console.log('Cannot uninstall focus handler that is not yet installed: ' + focusId)
    throw new Error('Cannot uninstall focus handler that is not yet installed: ' + focusId)
  }
  lastFocus[focusId] = -Infinity
}
/**
 * @obsolete in favor of [[onFocused]].
 */
export function installFocusHandler(
  focusId: string,
  elements: Element[],
  screen: blessed.Widgets.Screen,
  keys: [string, string] = ['tab', 'S-tab'],
  styleChildren = false,
  focusFirst = false
) {
  if (lastFocus[focusId] === -Infinity && typeof lastFocus[focusId] !== 'undefined') {
    throw new Error('Focus handler with key already installed: ' + focusId)
  } else if (lastFocus[focusId] === -Infinity || typeof lastFocus[focusId] === 'undefined') {
    lastFocus[focusId] = 0
    screen.key(keys, function(ch, key) {
      try {
        if (screen.focused) {
          const notFocused = elements.filter(e => e && e !== screen.focused)
            //TODO: better is to check on the other lastFocus[IDS] and unselect all!
          ;[...notFocused, ...(styleChildren ? notFocused.map(e => e.children).flat() : [])]
            .filter(e => screen.focused !== e)
            .filter(isBlessedElement)
            .forEach(c => {
              c.style = { ...(c.style || {}), border: {} }
            })
        }

        // if they had uninstalled we don't do more
        if (lastFocus[focusId] !== -Infinity) {
          lastFocus[focusId] = key.shift
            ? lastFocus[focusId] <= 0
              ? elements.length - 1
              : lastFocus[focusId] - 1
            : lastFocus[focusId] >= elements.length - 1
            ? 0
            : lastFocus[focusId] + 1

          // otherwise we assume that key press was for us.
          // TODO: are we certain ?
          // TODO: what if other keys have register with the same key ? we should check which is more close to the real focused

          elements[lastFocus[focusId]].focus()
          ;[elements[lastFocus[focusId]], ...(styleChildren ? elements[lastFocus[focusId]].children : [])]
            .filter(isBlessedElement)
            .forEach(c => {
              c.style = { ...(c.style || {}), ...focusStyle }
            })
          screen.render()
        }
      } catch (error) {
        console.log(error)
        throw error
      }
    })

    if (focusFirst) {
      elements[0].focus()
      ;[elements[0], ...(styleChildren ? elements[0].children : [])].filter(isBlessedElement).forEach(c => {
        c.style = { ...(c.style || {}), ...focusStyle }
      })
    }
  }
}
