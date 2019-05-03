import { Br, Column, Columns, Div, React, ref, Row, Rows, ListBar2 } from 'accursed'
import { Output } from './editor/editors'
import { Sidebar } from './sidebar/sidebar'
import { Panel } from './toolPanel/toolPanel'
import { focusableOpts } from './util/style';
import { Component } from './component';

export class App extends Component {

  constructor(p, s) {
    super(p, s)
    this.tabSelected = this.tabSelected.bind(this)
  }

  listBar: ListBar2;
  render() {
    return (
      <Div ref={ref(c => this.start())}>
        <ListBar2 {...focusableOpts()} ref={ref<ListBar2>(c => (this.listBar = c))} onSelectItem={this.tabSelected}>
            {/* {this.s.documents.map(d => (
              <ListBarCommand _data={{ filePath: d.path }} callback={this.tabSelected}>
                {d.name}
              </ListBarCommand>
            ))}
            {} */}
          </ListBar2>

        <Columns>
          <Column width="40%">
            <Sidebar {...this.props} />
          </Column>
          <Column width="60%">
            <Rows>
              <Row height="65%">
                <Output {...this.props} />
              </Row>
              <Row height="37%">
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
    
    }, 200)
  }

  protected tabSelected() {
  }
}
