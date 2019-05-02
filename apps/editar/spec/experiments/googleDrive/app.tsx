import { React, ref, Component, TreeView, TreeViewNode, createScreen, installFocusAndExitKeysForEditorWidget, debug, showInModal, Columns, Column, Div, Rows, Row, Br } from 'accursed'
import { focusableOpts } from '../../../src/util/style';
import { authorizeAndRun } from './driveClient';
import { google, drive_v3 } from 'googleapis';
import { readFileSync, createWriteStream } from 'fs';
import { FileManager, File } from './drive';
import { FileExplorer } from './fileExplorer';

export interface P {
  rootFiles: File[];
  fileManager: FileManager;
}
export class App extends Component<P> {
  render() {
    return (<Div ref={ref(c => this.start())}>
      <Columns>
        <Column width="25%">
          <FileExplorer {...this.props} />
        </Column>
        <Column width="75%">
          <Rows>
            <Row height="68%">
              editor
              </Row>
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
    </Div>);
  }
  start(): any {
    setTimeout(() => {
    }, 200);
  }
}
