import { createScreen, debug, React, Screen } from '../../../src'
import { App } from './app'
function main() {
  try {
    debug('starting')
    var screen = createScreen({
      smartCSR: true,
      useBCE: true,
      title: 'editor-widget example'
    })
    screen.key('C-q', k => {
      screen.destroy()
      process.exit(0)
    })

    installFocusHandlers(screen)
    const app = React.render(<App parent={screen} />)
    screen.render()
  } catch (error) {
    debug(error)
  }
}
main()

function installFocusHandlers(screen: Screen) {
  screen.key('C-right', k => {
    screen.focusNext()
  })
  screen.key('C-left', k => {
    screen.focusPrevious()
  })
}
