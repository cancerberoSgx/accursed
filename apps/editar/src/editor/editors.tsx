import { Div, React, Tab, TabBody, TabLabel, TabPanel, ListBar2, ListBarCommand, debug } from 'accursed'
import { Component } from '../component'
import { Editor } from './editor'
import { focusableOpts } from '../style'
import { PREFIX } from '../util'
import { SIDEBAR_ACTION, OpenFilesAction } from '../sidebar/sidebarActions';
import { ActionManager } from '../store/actionManager';
import { State } from '../store/state';
import { getEditorFor } from './editorFactory';
import { ok } from 'assert';

export class Editors extends Component {
  protected listBar: ListBar2;
  constructor(p,s){
    super(p,s)
    this.tabSelected = this.tabSelected.bind(this)
    ActionManager.get().onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, (a: OpenFilesAction, s)=>this.onOpenedFiles(a, s))
  }
  render() {

    return (
      <Div>
        <ListBar2 ref={React.createRef<ListBar2>(c=>this.listBar = c)}>
          {this.s.documents.map(d => (
            <ListBarCommand   _data={{filePath: d.path}} callback={this.tabSelected}>{d.name}</ListBarCommand>
          ))}
          {}
        </ListBar2>
      </Div>
    )
  }

  protected tabSelected(){
    debug(this.listBar.commands[this.listBar.selected].element)
  }

  protected onOpenedFiles(a: OpenFilesAction, s: State): void {
    // HEADS UP!just supporting one file - first one
    let p:string = a.paths.length ? a.paths[0] : undefined
    if(!p){
      return // maybe trying to open an already opened file or file read error
    }
    // reducer already executed, documents are updated. we just need to show or create a editor for `p`
    const doc = s. documents.find(d=>d.path===p)
    ok(doc)
    const docEd =getEditorFor(doc, this.element)
  }
}
