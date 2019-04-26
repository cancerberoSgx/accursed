import { createScreen, installExitKeys, debug } from '../../../../src';
import { allColors } from './allColors';


// var differ = require('ansi-diff-stream')
// var diff = differ()
// diff.pipe(process.stdout)

allColorsMain();

function allColorsMain() {

  var screen = createScreen({
    // input: diff,
    smartCSR: true,
    fastCSR: true,
    // dockBorders: true,
    // autoPadding: true,
    // ignoreDockContrast: true,
    // focusable: true,
    title: 'All Colors',
    // sendFocus: true
  });
  installExitKeys(screen);
  screen.key('tab', k => screen.focusNext());
  screen.key('S-tab', k => screen.focusPrevious());
  try {
    allColors(screen);
  }
  catch (error) {
    debug(error);
  }
  screen.focusNext();
  screen.render();
}
