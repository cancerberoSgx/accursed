import { Div, React, Tab, TabBody, TabLabel, TabPanel } from 'accursed'
import { Component } from './component'
import { Editor } from './editor'
import { focusableOpts } from './style'
import { PREFIX } from './util'
import { SIDEBAR_ACTION, OpenFilesAction } from './sidebarActions';
import { ActionManager } from './actionManager';
import { State } from './state';
import { getEditorFor } from './editorFactory';
// import { getEditorFor, getEditorsFor } from './editorFactory';

// interface EditorsProps{
//   store: Store
// }

export class Editors extends Component {
  render() {
    ActionManager.get().onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, (a: OpenFilesAction, s)=>this.onOpenedFiles(a, s))

    return (
      <Div>
        <TabPanel>
          {this.s.documents.map(d => (
            <Tab _data={{ [PREFIX('path')]: d.path }}>
              <TabLabel {...focusableOpts()}>{d.name}</TabLabel>
              <TabBody>
                <Editor {...this.props} document={d} />
              </TabBody>
              {}
            </Tab>
          ))}
          {}
        </TabPanel>
      </Div>
    )
  }
  onOpenedFiles(a: OpenFilesAction, s: State): void {
    // HEADS UP!just supporting one file - first one
    let p:string = a.paths.length ? a.paths[0] : undefined
    if(!p){
      return // maybe trying to open an already opened file or file read error
    }
    const ed = getEditorFor(s.documents.find(d=>d.path===p), )
  }
}
