import { Component, Log, React, ref } from 'accursed'
import { scrollableOpts } from './style'

export class LogPanel extends Component {
  logEl: Log
  // constructor(p, s) {
  //   super(p, s)
  //   this.onActionDispatched(TOOL_PANEL_ACTION.LOG_MESSAGE, (a, s) => this.onLogMessage(a, s))
  // }
  render() {
    return (
      // <Div>
      <log {...scrollableOpts()} height="100%" width="100%" ref={ref(c => (this.logEl = c))} />
      // </Div>
    )
  }
  private pendingMessages: string[] = []
  logMessage(m: string) {
    if (this.logEl) {
      if (this.pendingMessages.length) {
        this.pendingMessages.forEach(m => this.logEl.log(m))
        this.pendingMessages.length = 0
      }
      this.logEl.log(m)
    } else {
      this.pendingMessages.push(m)
    }
  }
}
