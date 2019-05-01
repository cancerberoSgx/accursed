import { Box, Div, IEditor, React } from 'accursed'
import { Component, Props } from '../component'
import { DocumentEditor } from './editorFactory'

interface EditorProps extends Props {
  document?: DocumentEditor
}
/** I'm just a container for a given editor widget and document */
export class Editor extends Component<EditorProps> {
  container: Box
  editor: IEditor
  constructor(p, s) {
    super(p, s)
    // this.openFiles = this.openFiles.bind(this)
    // this.onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, this.openFiles)
  }

  // docEd: DocumentEditor

  render() {
    // this.debug('rendering editor')
    return (
      <Div
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
    this.debug('editor.-setEitor cañled')
    if (this.editor) {
      // TODO : check in slap if there is some way to notify the widget when detached
      this.editor.detach()
    }
    this.editor = ed.editor
    this.container.append(this.editor)
    if (!this.editor.visible) {
      this.editor.show()
    }
    this.editor.screen.render()
  }
  // openFiles(a: OpenFilesAction, s: State): void {

  //   // HEADS UP!just supporting one file - first one
  //   let p: string = a.paths.length ? a.paths[0] : undefined
  //   if (!p) {
  //     return // maybe trying to open an already opened file or file read error
  //   }
  //   // reducer already executed, documents are updated. we just need to show or create a editor for `p`
  //   const doc = s.documents.find(d => d.path === p)
  //   ok(doc)
  //   const docEd = getEditorFor(doc, this.element)
  //   ok(docEd)

  // }
}
