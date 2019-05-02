import { Br, Column, Columns, Div, React, ref, Row, Rows } from 'accursed'
import { Editors } from './editor/editors'
import { installKeyBindings } from './keyBindings'
import { Sidebar } from './sidebar/sidebar'
import { SIDEBAR_ACTION } from './sidebar/sidebarActions'
import { Panel } from './toolPanel/toolPanel'
import { Component } from './util/component'

export class App extends Component {
  render() {
    return (
      <Div ref={ref(c => this.start())}>
        <Columns>
          <Column width="25%">
            <Sidebar {...this.props} />
          </Column>
          <Column width="75%">
            <Rows>
              <Row height="68%">
                <Editors {...this.props} />
              </Row>
              <Row height="30%">
                <Br />
                <Panel {...this.props} />
              </Row>
              {}
            </Rows>
            <Br />
          </Column>
          {}
        </Columns>
      </Div>
    )
  }
  start(): any {
    setTimeout(() => {
      // mock - we simulate the user opening folder '.'
      this.dispatch({
        type: SIDEBAR_ACTION.SET_CWD,
        cwd: this.s.cwd
      })
      this.screen.focusNext()
      installKeyBindings({
        screen: this.screen
      })
    }, 200)
  }
}
