import { Box, buildEditor,  React } from 'accursed'
import { ActionManager } from '../store/actionManager'
import { WORKSPACE_ACTION } from '../store/actions'
import { Component, Props } from '../component'
import { getEditorFor, DocumentEditor } from './editorFactory'
import { SIDEBAR_ACTION } from "../sidebar/sidebarActions";
import { Document, State } from '../store/state'
import { AllActions, ActionType } from '../store/store'

interface EditorProps extends Props {
  document: Document
}

export class Editor extends Component<EditorProps> {
  
  constructor(p,s){
    super(p,s)
    this.openFiles = this.openFiles.bind(this)
    this.onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, this.openFiles);
  }

  docEd: DocumentEditor

  render() {
    this.debug('rendering editor')
    return <box ref={React.createRef<Box>(c => this.containerReady(c))} />
  }
  openFiles(a: AllActions, s: State): void {
    throw new Error('Method not implemented.')
  }
  async containerReady(parent: Box) {
    this.docEd = await getEditorFor(this.props.document, parent)
    this.screen.render()
    if (!this.docEd) {
     
    }
  }
}
