import { Box, buildEditor, IEditor, React } from 'accursed'
import { ActionManager } from './actionManager'
import { WORKSPACE_ACTION } from './actions'
import { Component, Props } from './component'
import { getEditorFor, DocumentEditor } from './editorFactory'
import { SIDEBAR_ACTION } from "./sidebarActions";
import { Document, State } from './state'
import { AllActions } from './store'

interface EditorProps extends Props {
  document: Document
}

export class Editor extends Component<EditorProps> {
  // protected editor: IEditor
  docEd: DocumentEditor

  render() {
    ActionManager.get().onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, (a, s) => this.openFiles(a, s))

    this.debug('rendering editor')
    return <box ref={React.createRef<Box>(c => this.containerReady(c))} />
  }
  openFiles(a: AllActions, s: State): void {
    throw new Error('Method not implemented.')
  }
  async containerReady(parent: Box) {
    // this.editor = 
    this.docEd = await getEditorFor(this.props.document, parent)
    this.screen.render()
    if (!this.docEd) {
     
    }
  }
}
