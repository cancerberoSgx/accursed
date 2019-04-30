import { Column, Columns, Div, React, Row, Rows } from 'accursed'
import { Component } from './component'

// interface AppProps extends Props{
// }
export class App extends Component {
  render() {
    // setTimeout(() => {
    //   // this.debug('dispatching from app ', {
    //   //   type: SIDEBAR_ACTION.SET_CWD,
    //   //   cwd: pwd().toString()
    //   // })

    //   // mock - we simulate the user opening folder '.'
    //   this.dispatch({
    //     type: SIDEBAR_ACTION.SET_CWD,
    //     cwd: pwd().toString()
    //   })
    // }, 2000)
    return (
      <Div>
        <Columns>
          <Column width="30%">{/* <Sidebar {...this.props} /> */}</Column>
          <Column width="70%">
            <Rows>
              <Row height="70%">{/* <Editors {...this.props} /> */}</Row>

              <Row height="30%">{/* <Panel {...this.props} /> */}</Row>
              {}
            </Rows>
          </Column>
          {}
        </Columns>
      </Div>
    )
  }
}
