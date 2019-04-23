import { installExitKeys, React, createScreen2 } from 'accursed'
import { App } from './app'

(async ()=>{

  try {

  var s = await createScreen2({
    useBCE: true,
    // warnings: true,
    // log: 'log.txt',
    fullUnicode: true,
  })
  // debugger
  installExitKeys(s)
    const app = React.render(<App screen={s} />)
    s.append(app)
    s.key('tab', k => s.focusNext())
    s.key('S-tab', k => s.focusPrevious())
    s.render()
  } catch (error) {
    // log(error)
    s! && s!.log(error)
    console.error(error)
  }
  
})()