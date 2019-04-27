import { createScreen, debug, React } from '../../../src'
import { App } from './blessedEval3'
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
    // installExitKeys(screen)
    // screen.key(['esc'], function (ch, key) {
    //   screen.destroy()
    //   process.exit(0)
    // })
    screen.key('C-right', k => screen.focusNext())
    screen.key('C-left', k => screen.focusPrevious())
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
