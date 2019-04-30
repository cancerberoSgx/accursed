import {React, Columns, Column, TreeView, Rows, Row, Div, TabPanel, Tab, TabLabel, TabBody, Box, IEditor, buildEditor} from 'accursed'
import { State, Document } from './state';
import {PREFIX} from './util'
import { focusableOpts } from './style';
import { Store } from './store';
import { Component, Props } from './component';
import { getEditorFor } from './editorFactory';

interface EditorProps extends Props {
  document: Document
}

export class Editor extends Component<EditorProps>{
  editor:IEditor
  // editorContainer: Box;
  render(){
    this.debug('rendering editor')
    return <box ref={React.createRef<Box>(c=>this.containerReady(c))}>
    </box>
  }
  async containerReady(parent: Box) {
    this.editor = getEditorFor(this.props.document)
    if(!this.editor){
      buildEditor({
        parent,
        text: await this.props.context.fs.read(this.props.document.path),
        language: 'js'//TODO
      })
    }
  }
}