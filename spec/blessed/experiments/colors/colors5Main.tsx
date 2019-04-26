import { createScreen, debug, installExitKeys } from '../../../../src';
import { colors5Demo } from './colors5';

colors5Main();

export function colors5Main() {
  var screen = createScreen({
    dockBorders: true,
    autoPadding: true,
    ignoreDockContrast: true,
    focusable: true,
    title: 'Color Palettes',
    sendFocus: true
  });
  installExitKeys(screen);
  screen.key('tab', k => screen.focusNext());
  screen.key('S-tab', k => screen.focusPrevious());
  try {
    colors5Demo(screen);
  }
  catch (error) {
    debug(error);
  }
  screen.focusNext();
  screen.render();
}
