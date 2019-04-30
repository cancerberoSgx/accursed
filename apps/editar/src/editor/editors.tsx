import { Div, ListBar2, ListBarCommand, React } from 'accursed'
import { ok } from 'assert'
import { Component } from '../component'
import { OpenFilesAction, SIDEBAR_ACTION } from '../sidebar/sidebarActions'
import { ActionManager } from '../store/actionManager'
import { State } from '../store/state'
import { Editor } from './editor'
import { DocumentEditor, getEditorFor } from './editorFactory'

export class Editors extends Component {
  protected listBar: ListBar2
  editorContainer: Editor
  constructor(p, s) {
    super(p, s)
    this.tabSelected = this.tabSelected.bind(this)
    ActionManager.get().onActionDispatched(SIDEBAR_ACTION.OPEN_FILES, (a, s) => this.onOpenedFiles(a, s))
  }
  render() {
    return (
      <Div>
        <ListBar2
          ref={React.createRef<ListBar2>(c => {
            this.listBar = c
            this.installEventHandlers()
          })}>
          {this.s.documents.map(d => (
            <ListBarCommand _data={{ filePath: d.path }} callback={this.tabSelected}>
              {d.name}
            </ListBarCommand>
          ))}
          {}
        </ListBar2>
        {/* <Div> <editor></editor></Div> */}
        <Editor
          {...this.props}
          ref={React.createRef<Editor>(c => {
            this.editorContainer = c
          })}
        />
        {/* <Div ref={React.createRef<Box>(c=>{this.editorContainer = c; this.installEventHandlers()})}></Div> */}
      </Div>
    )
  }
  installEventHandlers(): any {
    // throw new Error('Method not implemented.');
  }

  protected documentEditors: DocumentEditor[] = []
  protected tabSelected() {
    // debug(this.listBar.commands[this.listBar.selected].element)
  }

  /** when a new document  is opened we are responsible of get the EditorWidget from editorFactory, update the UI tabs, ask the file contents to the context.fs if needed, and switch the current widget widget. */
  protected async onOpenedFiles(a: OpenFilesAction, s: State) {
    // TODO: just supporting one file - first one
    let p: string = a.paths.length ? a.paths[0] : undefined
    if (!p) {
      return // maybe trying to open an already opened file or file read error
    }
    // reducer already executed, documents are updated. we just need to show or create a editor for `p`
    const doc = s.documents.find(d => d.path === p)
    ok(doc)
    const docEd = await getEditorFor(doc, this.element)
    ok(docEd)
    const exists = this.documentEditors.findIndex(e => e === docEd)
    if (exists >= 0) {
      //TODO focus / select it in the tabs and show the existing editor already mounted
    } else {
      await this.editorContainer.setEditor(docEd)
      // const text = this.props.context.fs.read(doc.path)
      this.listBar.element.addItem({
        // name: doc.path,
        text: doc.name,
        callback: this.tabSelected
      })
    }
  }
}
