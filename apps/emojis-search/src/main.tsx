import { installExitKeys, React, screen, createScreen2 } from 'accursed'
import { App } from './app'

(async ()=>{

  var s = await createScreen2({
    useBCE: true,
    warnings: true,
    log: 'log.txt',
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
  
})()