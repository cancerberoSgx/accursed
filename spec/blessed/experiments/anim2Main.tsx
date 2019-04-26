import { createScreen, debug, installExitKeys } from '../../../src'
import { anim2 } from './anim2'

try {
  // var differ = require('ansi-diff-stream');
  // var diff = differ();
  // diff.pipe(process.stdout);
  const screen = createScreen({
    fastCSR: true,
    useBCE: true,
    sendFocus: true
    // , input: diff
  })
  installExitKeys(screen)
  screen.key('tab', k => screen.focusNext())
  screen.key('S-tab', k => screen.focusPrevious())
  anim2(screen)
} catch (error) {
  debug(error)
}
