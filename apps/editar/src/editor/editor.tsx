import { Box, Div, findChildren, Maximize, React } from 'accursed'
import { Component, Props } from '../util/component'
import { DocumentEditor } from './editorFactory'

interface EditorProps extends Props {
  document?: DocumentEditor
}

/** I'm just a container for a given editor widget and document */
export class Editor extends Component<EditorProps> {
  container: Box
  currentDocumentEditor: DocumentEditor
  constructor(p, s) {
    super(p, s)
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
      return
    }
    if (this.currentDocumentEditor) {
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
}
