import { Box, Div, findChildren, Maximize, React, closeModal, showInModal, IEditor } from 'accursed'
import { Component, Props } from '../util/component'
import { DocumentEditor } from './editorFactory'
import { GoToLineForm } from './goToLineForm';
import { EDITOR_ACTION } from './editorActions';

interface EditorProps extends Props {
  document?: DocumentEditor
}

/** I'm just a container for a given editor widget and document */
export class Editor extends Component<EditorProps> {
  container: Box
  currentDocumentEditor: DocumentEditor

  constructor(p, s) {
    super(p, s)
    this.onActionDispatched(EDITOR_ACTION.GOTO_LINE_OPEN, (a, s)=>this.gotoLine(this.currentDocumentEditor.editor))
  }

  render() {
    return (
        <Div
          height="100%"
          ref={React.createRef<Box>(c => {
            this.container = c
            if (this.props.document) {
              this.setEditor(this.props.document)
            }
          })}
        />
    )
  }

  async setEditor(ed: DocumentEditor) {
    if (this.currentDocumentEditor === ed) {
      // TODO refresh 
      return
    }
    if (this.currentDocumentEditor) {
      this.currentDocumentEditor.editor.textBuf.loaded
      this.currentDocumentEditor.editor.hide()
    }
    this.currentDocumentEditor = ed
    const existing = findChildren(this.container, c => c === ed.editor)
    if (!existing) {
      this.container.append(this.currentDocumentEditor.editor)
    }
    this.currentDocumentEditor.editor.insertMode(true)
    this.currentDocumentEditor.editor.show()
    this.screen.render()
  }  


gotoLine(editor: IEditor){
  this.debug('editor gotoLine')
  closeModal(this.screen)
  showInModal(this.screen, React.render(<GoToLineForm {...this.props} onSubmit={lineNumber=>{
    // this.dispatch({
    //   type: EDITOR_ACTION.GOTO_LINE,
    //   line      
    // })
    closeModal(this.screen)
    const validLineNumber = Math.max(0, Math.min(lineNumber-1, this.currentDocumentEditor.editor.textBuf.getLineCount()-1), 0)
    this.currentDocumentEditor.editor.selection.setHeadPosition([validLineNumber, 0])
    this.currentDocumentEditor.editor.selection.clearTail()
    this.currentDocumentEditor.editor.focus()
    this.screen.render()
  }}
  // onCancel={()=>{
  //   closeModal(this.screen)
  // }}
  ></GoToLineForm>))
}
}
