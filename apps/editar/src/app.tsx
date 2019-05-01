import { Br, Column, Columns, Div, React, Row, Rows } from 'accursed'
import { pwd } from 'shelljs'
import { Editors } from './editor/editors'
import { Sidebar } from './sidebar/sidebar'
import { SIDEBAR_ACTION } from './sidebar/sidebarActions'
import { Panel } from './toolPanel/toolPanel'
import { Component } from './util/component'

export class App extends Component {
  render() {
    setTimeout(() => {
      // mock - we simulate the user opening folder '.'
      this.dispatch({
        type: SIDEBAR_ACTION.SET_CWD,
        cwd: pwd().toString()
      })
    }, 2000)
    return (
      <Div>
        <Columns>
          <Column width="30%">
            <Sidebar {...this.props} />
          </Column>
          <Column width="70%">
            <Rows>
              <Row height="70%">
                <Editors {...this.props} />
              </Row>

              <Row height="30%">
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
}
