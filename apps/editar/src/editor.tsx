import { Box, buildEditor, IEditor, React } from 'accursed'
import { ActionManager } from './actionManager'
import { WORKSPACE_ACTION } from './actions'
import { Component, Props } from './component'
import { getEditorFor } from './editorFactory'
import { SIDEBAR_ACTION } from './sidebar'
import { Document, State } from './state'
import { AllActions } from './store'

interface EditorProps extends Props {
  document: Document
}

export class Editor extends Component<EditorProps> {
  protected editor: IEditor

  render() {
    ActionManager.get().onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, (a, s) => this.openFiles(a, s))

    this.debug('rendering editor')
    return <box ref={React.createRef<Box>(c => this.containerReady(c))} />
  }
  openFiles(a: AllActions, s: State): void {
    throw new Error('Method not implemented.')
  }
  async containerReady(parent: Box) {
    this.editor = getEditorFor(this.props.document)
    if (!this.editor) {
      try {
        const text = (await this.props.context.fs.read(this.props.document.path)) || ''
        buildEditor({
          parent,
          text, //TODO: check errors
          language: 'js' //TODO
        })
        this.screen.render()
      } catch (error) {
        this.dispatch({
          type: WORKSPACE_ACTION.NOTIFY_FILE_ERROR,
          error,
          msg: 'Error while opening file ' + this.props.document.path + ' to open it in editor-widget'
        })
      }
    }
  }
}
