import { Br, debug, Div, Log, React, ref } from 'accursed'
import { inspect } from 'util'
import { Component } from '../component'
import { ACTIONS, FontsErrorAction } from '../store/fontsAction'
import { scrollableOpts } from '../util/style'

let logEl: Log
export class LogPanel extends Component {
  constructor(p, s) {
    super(p, s)
    // this.debug = this.debug.bind(this)
    this.props.store.addActionListener(ACTIONS.FONTS_ERROR, dispatchErrorAction)
  }

  render() {
    return (
      <Div>
        <log {...scrollableOpts()} height="100%" width="100%" ref={ref(c => (logEl = c))} />
        <Br />
        <Br />
      </Div>
    )
  }
}

// interface LogMessageAction{
//   message: string
// }
const pendingMessages: string[] = []
export function appLogger(...args: any[]) {
  const s = args.map(a => inspect(a)).join(', ')
  if (logEl) {
    if (pendingMessages.length) {
      pendingMessages.forEach(m => logEl.log(s))
      pendingMessages.length = 0
    }
    logEl.log(s)
    debug(...args)
    logEl.screen.render()
    // appLogger(a.error);
  } else {
    pendingMessages.push(s)
  }
}

export function dispatchErrorAction(a: FontsErrorAction) {
  appLogger(a.error)
}
