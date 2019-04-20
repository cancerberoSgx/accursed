import { createScreen } from '../blessed'
import { Screen, ScreenOptions } from '../blessedTypes'

/** creates a screen using term.js as input/output so it works in the browser.  */
export async function createScreenForBrowser(options: ScreenOptions = {}): Promise<Screen> {
  return new Promise(resolve => {
    //@ts-ignore
    window.onload = function() {
      const termJs = require('term.js')
      var term = new termJs.Terminal({
        cols: 80,
        rows: 24,
        useStyle: true,
        screenKeys: true
      })
      //@ts-ignore
      term.open(document.body)
      term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n')

      // glue to make blessed work in browserify
      term.columns = term.cols
      term.isTTY = true
      require('readline').emitKeypressEvents = function() {} // Can I side-affect a module this way? Apparently.
      process.listeners = function fakelisteners() {
        return []
      }
      term.resize(options.cols || 100, options.rows || 36)
      const screen = createScreen({ ...options, input: term, output: term, tput: undefined })
      resolve(screen)
    }
  })
}

export function inBrowser() {
  //@ts-ignore
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/** creates a screen that works both on node.js and in browsers */
export function createScreen2(options: ScreenOptions = {}): Promise<Screen> {
  if (inBrowser()) {
    return createScreenForBrowser(options)
  } else {
    return Promise.resolve(createScreen(options))
  }
}
