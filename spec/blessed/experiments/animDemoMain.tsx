import { createScreen, installExitKeys } from '../../../src'
import { animDemo } from './animDemo'
function animDemoMain() {
  var differ = require('ansi-diff-stream')
  var diff = differ()
  diff.pipe(process.stdout)
  const screen = createScreen({ fastCSR: true, useBCE: true, input: diff })
  installExitKeys(screen)
  animDemo(screen)
}
animDemoMain()
