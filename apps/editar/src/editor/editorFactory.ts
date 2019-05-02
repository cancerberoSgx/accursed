// associates EditorWidget with Documents
// responsible of dispatching /& coordinate, save(), open(), close(),etc

import { createEditorAsync, IEditor } from 'accursed'
import { getFileExtension } from 'misc-utils-of-mine-generic'
import { inspect } from 'util'
import { getContext } from '../context/contextFactory'
import { Document } from '../store/state'
import { focusableOpts } from '../util/style'
import { debugInApp } from '../util/util'

export interface DocumentEditor {
  editor: IEditor
  document: Document
}
const editors: { [path: string]: DocumentEditor } = {}

export async function getEditorFor(document: Document) {
  if (!editors[document.path]) {
    try {
      const text = (await getContext().fs.read(document.path)) || ''
      const editor = await createEditorAsync({
        ...focusableOpts(),
        text,
        language: getLanguage(document),
        scrollable: false
      })
      editor.once('render', () => {
        setTimeout(() => {
          editor.selection.setHeadPosition([0, 0])
          editor.selection.clearTail()
        }, 700)
      })
      editors[document.path] = { editor, document }
    } catch (error) {
      debugInApp('Error while creating editor widget for file ' + document.path + ': ' + inspect(error))
      throw error
    }
  }
  return editors[document.path]
}

function getLanguage(d: Document) {
  const ext = getFileExtension(d.path).toLowerCase() || 'js'
  return ext
}
