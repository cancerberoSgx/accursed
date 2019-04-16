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
installExitKeys(s)
try {
  
const app = React.render(<App screen={s} />)
s.append(app)
s.key('tab', k => s.focusNext())
s.key('S-tab', k => s.focusPrevious())
s.render()

} catch (error) {
  s && s.log(error)
}