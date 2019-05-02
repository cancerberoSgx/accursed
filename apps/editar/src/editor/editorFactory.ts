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
      // debugInApp('editorFactory About to read file', document.path)
      const text = (await getContext().fs.read(document.path)) || ''
      // debugInApp(`editorFactory file ${document.path} successfully read, bytes: ${text.length}`)
      const editor = await createEditorAsync({
        ...focusableOpts(),
        text,
        language: getLanguage(document),
        wrap: true
      })
      editor.selection.setHeadPosition({ column: 0, row: 0 })
      editor.selection.setTailPosition({ column: 0, row: 0 })

      // debugInApp(`editor widget successfully created for file ${document.path} `)
      editors[document.path] = { editor, document }
    } catch (error) {
      debugInApp('Error while creating editor widget for file ' + document.path + ': ' + inspect(error))
      throw error
    }
  }
  // debugInApp('editorFactory returning ', !!editors[document.path], document.path)
  return editors[document.path]
}

function getLanguage(d: Document) {
  const ext = getFileExtension(d.path).toLowerCase() || 'js'
  // const known = ['js', 'css', 'json']
  // if()
  return ext
}

// export function getEditorsFor(documents: Document[], parents: []) {
//   return documents.map((d, i) => getEditorFor(d, parents[i])).filter(notUndefined)
// }
