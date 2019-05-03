import { Br, Column, Columns, Component, Div, React, ref, Row, Rows } from 'accursed'
import { File, FileManager } from './drive'
import { FileExplorer } from './fileExplorer'

export interface P {
  rootFiles: File[]
  fileManager: FileManager
}
export class App extends Component<P> {
  render() {
    return (
      <Div ref={ref(c => this.start())}>
        <Columns>
          <Column width="25%">
            <FileExplorer {...this.props} />
          </Column>
          <Column width="75%">
            <Rows>
              <Row height="68%">editor</Row>
              <Row height="30%">
                <Br />
                tools
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
    setTimeout(() => {}, 200)
  }
}
