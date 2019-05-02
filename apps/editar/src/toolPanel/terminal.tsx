import { Div, React, terminal, Terminal as TerminalElement } from 'accursed'
import { SIDEBAR_ACTION } from '../sidebar/sidebarActions'
import { Component } from '../util/component'
import { focusableOpts } from '../util/style'

export class Terminal extends Component {
  terminal: TerminalElement
  constructor(p, s) {
    super(p, s)
    this.onActionDispatched(SIDEBAR_ACTION.SET_CWD, (a, s) => this.start())
  }
  render() {
    return <Div />
  }
  start() {
    if (this.terminal) {
      return
    }
    this.terminal = terminal({
      ...focusableOpts(),
      border: undefined,
      width: '100%',
      height: '100%',
      parent: this.blessedElement
    })
  }
}
