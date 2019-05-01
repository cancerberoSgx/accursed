import { debug, Div, Log, React, ref } from 'accursed'
import { LogMessageAction, WORKSPACE_ACTION } from '../store/actions'
import { State } from '../store/state'
import { Component } from '../util/component'
import { focusableOpts } from '../util/style'

export class LogPanel extends Component {
  logEl: Log
  constructor(p, s) {
    super(p, s)
    this.onActionDispatched(WORKSPACE_ACTION.LOG_MESSAGE, (a, s) => this.onLogMessage(a, s))
  }
  render() {
    return (
      <Div>
        <log
          name="debug"
          content="log"
          {...focusableOpts()}
          height="100%"
          width="100%"
          ref={ref(c => {
            this.logEl = c
          })}
        />
      </Div>
    )
  }
  private pendingMessages: LogMessageAction[] = []
  protected onLogMessage(a: LogMessageAction, s: State) {
    if (this.logEl) {
      if (this.pendingMessages.length) {
        debug('this.pendingMessages.length')
        this.pendingMessages.forEach(m => this.logEl.log(a.message))
        this.pendingMessages.length = 0
      }
      this.logEl.log(a.message)
    } else {
      this.pendingMessages.push(a)
      //TODO: handle logs when logel is not ready
    }
  }
}
