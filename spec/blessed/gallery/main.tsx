import { createScreen2, debug } from '../../../src'
import { installExitKeys } from '../../../src/blessed/util'
import { React } from '../../../src/jsx/createElement'
import { App } from './App'

async function main() {
  try {
    const screen = await createScreen2({
      smartCSR: true,
      // log: './log.txt',
      focusable: true,
      // autoPadding: true,
      sendFocus: true
    })
    debug(screen)
    installExitKeys(screen)
    React.render(<App screen={screen} />)
    screen.render()

    screen.key('tab', k => screen.focusNext())
    screen.key('S-tab', k => screen.focusPrevious())

    // setInterval(() => {
    //   // screen.cursorReset()
    //   // screen.restoreFocus()
    //   screen.render() // i need to do this because when I click outside the clickable elements then they stop receiving clicks !
    // }, 2000)
  } catch (error) {
    debug('ERROR', error)
    console.error('ERROR', error)
  }
}

main()
