import { createScreen } from '../blessed'
import { Screen, ScreenOptions } from '../blessedTypes'

declare var window:any
declare var document: any
// import { Terminal } from 'xterm';
// import { fit } from 'xterm/lib/addons/fit/fit';

/** creates a screen using term.js as input/output so it works in the browser.  */
export async function createScreenForBrowser(options: ScreenOptions = {}): Promise<Screen> {
  return new Promise(resolve => {
    //@ts-i gnore
    window.onload = function() {
      const container = document.createElement('div')
      document.body.appendChild(container)
      // const term = new Terminal({
      // });
      // term.open(container)
      
      const termJs = require('term.js')
      var term = new termJs.Terminal({
          cols: 80,
          rows: 24,
          useStyle: true,
          screenKeys: true
        })
        // @ts-i gnore
        // term.open(document.body)
        term.open(container)
        // fit(term);  // Fit the terminal when necessary
      term.write('\x1b[31mWelcome to term.js!\x1b[m\r\n')

      // term.get
      // glue to make blessed work in browserify
      term.columns = term.cols
      // term.set
      term.isTTY = true
      // // debugger
      term.isRaw = true
      // console.log(typeof term.setRawMode , term.setRawMode);
      
      // // term.setRawMode && term.setRawModel(true)
      // require('readline').emitKeypressEvents = function() {} // Can I side-affect a module this way? Apparently.
      // process.listeners = function fakelisteners() {
      //   return []
      // }
      term.resize(options.cols || 120, options.rows || 36)
      const screen = createScreen({ ...options, input: term,output: term, tput: undefined       })
      resolve(screen)
    }
  })
}

export function inBrowser() {
  //@ts- gnore
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
