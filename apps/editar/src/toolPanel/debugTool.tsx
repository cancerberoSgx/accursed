import { Log, React, ref } from 'accursed'
import { State } from '../store/state'
import { Component } from '../util/component'
import { scrollableOpts } from '../util/style'
import { LogMessageAction, TOOL_PANEL_ACTION } from './toolPanelActions'

export class LogPanel extends Component {
  logEl: Log
  constructor(p, s) {
    super(p, s)
    this.onActionDispatched(TOOL_PANEL_ACTION.LOG_MESSAGE, (a, s) => this.onLogMessage(a, s))
  }
  render() {
    return (
      // <Div>
      <log {...scrollableOpts()} height="100%" width="100%" ref={ref(c => (this.logEl = c))} />
      // </Div>
    )
  }
  private pendingMessages: LogMessageAction[] = []
  protected onLogMessage(a: LogMessageAction, s: State) {
    if (this.logEl) {
      if (this.pendingMessages.length) {
        this.pendingMessages.forEach(m => this.logEl.log(a.message))
        this.pendingMessages.length = 0
      }
      this.logEl.log(a.message)
    } else {
      this.pendingMessages.push(a)
    }
  }
}
