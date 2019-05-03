import { Br, Column, Columns, Div, React, Row, Rows } from 'accursed'
import { Component } from './component'
import { Output } from './editor/outputPanel'
import { Sidebar } from './sidebar/sidebar'
import { Panel } from './toolPanel/toolPanel'

export class App extends Component {
  constructor(p, s) {
    super(p, s)
  }
  render() {
    return (
      <Div>
        {/* <ListBar2 {...focusableOpts()} ref={ref<ListBar2>(c => (this.listBar = c))} onSelectItem={this.tabSelected}> */}
        {/* {this.s.documents.map(d => (
              <ListBarCommand _data={{ filePath: d.path }} callback={this.tabSelected}>
                {d.name}
              </ListBarCommand>
            ))}
            {} */}
        {/* </ListBar2> */}
        <Columns>
          <Column width="70%">
            <Rows>
              <Row height="65%">
                <Output {...this.props} />
              </Row>

              <Row height="30%">
                <Br />
                <Panel {...this.props} />
              </Row>
              {}
            </Rows>
            <Br />
          </Column>
          <Column width="30%">
            <Sidebar {...this.props} />
          </Column>

          {}
        </Columns>
      </Div>
    )
  }
}
