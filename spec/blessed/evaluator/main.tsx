import { createScreen, debug, React, Screen } from '../../../src'
import { App } from './app'
function main() {
  try {
    debug('starting')
    var screen = createScreen({
      // sendFocus: true,
      smartCSR: true,
      title: 'editor-widget example'
      // , focusable: true,
      // tput: true
    })
    screen.key('C-q', k => {
      screen.destroy()
      process.exit(0)
    })

    // installExitKeys(screen)
    // screen.key(['esc'], function (ch, key) {
    //   screen.destroy()
    //   process.exit(0)
    // })
    installFocusHandlers(screen)
    // main(screen)
    const app = React.render(<App parent={screen} />)
    // screen.append(app)
    // screen.focusNext()
    // screen.render()
    screen.render()
  } catch (error) {
    debug(error)
  }
}
main()

function installFocusHandlers(screen: Screen) {
  screen.key('C-right', k => {
    // if (!screen.focused || !isAttached(screen.focused)) {
    //   screen.rewindFocus()
    // } else {
    screen.focusNext()
    // }
  })
  screen.key('C-left', k => {
    // if (!screen.focused || !isAttached(screen.focused)) {
    //   screen.rewindFocus()
    // } else {
    screen.focusPrevious()
    // }
  })
}
