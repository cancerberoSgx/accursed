import { installExitKeys, React, screen } from 'accursed'
import { App } from './app'

var s = screen({
  autoPadding: false,
  log: 'log.txt',
  focusable: true,
  sendFocus: true,
  smartCSR: true,
  // forceUnicode: true,
  fullUnicode: true
})
const app = React.render(<App screen={s} />)
s.append(app)
installExitKeys(s)
s.key('tab', k => s.focusNext())
s.key('S-tab', k => s.focusPrevious())
s.render()
