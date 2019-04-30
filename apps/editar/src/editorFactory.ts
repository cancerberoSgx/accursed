import { Document } from './state';
import {IEditor, buildEditor} from 'accursed'

// associates EditorWidget with Documents
// responsible of dispatching /& coordinate, save(), open(), close(),etc


const editors:  {[path: string]: {editor: IEditor, document: Document}} = {}
export function getEditorFor(d: Document){

// if(!editors[d.path]) {
//   // TODO: create the editor widget
//   // buildEditor()
// }
// else {
  return editors[d.path] && editors[d.path].editor
// }
  
}