import * as blessed from 'blessed'
import { installExitKeys } from '../../../src/blessed'
import { React } from '../../../src/jsx/createElement'
import { App } from './App'

export const screen = blessed.screen({
  smartCSR: true,
  log: './log.txt',
  focusable: true,
  // autoPadding: true,
  sendFocus: true
})
try {
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
  screen.log('ERROR', error)
  console.error('ERROR', error)
}
