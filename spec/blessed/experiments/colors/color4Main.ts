import { createScreen, installExitKeys } from '../../../../src'
import { color4 } from './colors4'

var screen = createScreen({
  dockBorders: true,
  autoPadding: true,
  ignoreDockContrast: true,
  //  focusable: true,
  // grabKeys: false,
  title: 'Color Palettes',
  sendFocus: true
})
installExitKeys(screen)
screen.key('tab', k => screen.focusNext())
screen.key('S-tab', k => screen.focusPrevious())

color4(screen)
