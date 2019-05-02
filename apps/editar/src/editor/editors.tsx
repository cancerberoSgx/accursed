import { Div, ListBar2, ListBarCommand, Maximize, React, ref } from 'accursed'
import { ok } from 'assert'
import { OpenFilesAction, SIDEBAR_ACTION } from '../sidebar/sidebarActions'
import { State } from '../store/state'
import { Component } from '../util/component'
import { focusableOpts } from '../util/style'
import { debugInApp } from '../util/util'
import { Editor } from './editor'
import { DocumentEditor, getEditorFor } from './editorFactory'

export class Editors extends Component {
  protected listBar: ListBar2
  editorContainer: Editor
  constructor(p, s) {
    super(p, s)
    this.tabSelected = this.tabSelected.bind(this)
    this.onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, (a, s) => this.onOpenedFiles(a, s))
  }
  render() {
    return (
      // <Div  >
      <Maximize>
        <Div style={{ overflow: undefined }}>
          <ListBar2 {...focusableOpts()} ref={ref<ListBar2>(c => (this.listBar = c))} onSelectItem={this.tabSelected}>
            {this.s.documents.map(d => (
              <ListBarCommand _data={{ filePath: d.path }} callback={this.tabSelected}>
                {d.name}
              </ListBarCommand>
            ))}
            {}
          </ListBar2>
          <Editor
            {...this.props}
            ref={React.createRef<Editor>(c => {
              this.editorContainer = c
            })}
          />
        </Div>
      </Maximize>
      // </Div>
    )
  }

  protected documentEditors: DocumentEditor[] = []
  protected tabSelected() {
    debugInApp(
      'editors tabSelected()',
      this.listBar.selectedIndex,
      this.documentEditors[this.listBar.selectedIndex].document.name
    )
    const selectedEd = this.documentEditors[this.listBar.selectedIndex]
    this.editorContainer.setEditor(selectedEd)
  }

  /** when a new document  is opened we are responsible of get the EditorWidget from editorFactory, update the UI tabs, ask the file contents to the context.fs if needed, and switch the current widget widget. */
  protected async onOpenedFiles(a: OpenFilesAction, s: State) {
    try {
      // TODO: just supporting one file - first one
      let p: string = a.paths.length ? a.paths[0] : undefined
      if (!p) {
        return // maybe trying to open an already opened file or file read error
      }
      // reducer already executed, documents are updated. we just need to show or create a editor for `p`
      const doc = s.documents.find(d => d.path === p)
      ok(doc)
      const docEd = await getEditorFor(doc)
      ok(docEd)
      const index = this.documentEditors.findIndex(e => e === docEd)
      await this.editorContainer.setEditor(docEd)
      if (index >= 0) {
        this.listBar.select(index)
      } else {
        this.listBar.addCommand({
          text: doc.name, //TODO: check if there's already a document with the name and of so name the listBar command with different one.
          callback: this.tabSelected
        })
        this.documentEditors.push(docEd)
        this.listBar.select(this.documentEditors.length - 1)
        // debugInApp('editors calling this.editorContainer.setEditor')
      }
      this.screen.render()
    } catch (error) {
      this.debug(error)
    }
  }
}
