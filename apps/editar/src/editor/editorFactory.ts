// associates EditorWidget with Documents
// responsible of dispatching /& coordinate, save(), open(), close(),etc

import { createEditorAsync, IEditor } from 'accursed'
import { inspect } from 'util'
import { getContext } from '../context/contextFactory'
import { Document } from '../store/state'
import { focusableOpts } from '../style'
import { debugInApp } from '../util'

export interface DocumentEditor {
  editor: IEditor
  document: Document
}
const editors: { [path: string]: DocumentEditor } = {}

export async function getEditorFor(document: Document) {
  if (!editors[document.path]) {
    try {
      debugInApp('editorFactory About to read file', document.path)
      const text = (await getContext().fs.read(document.path)) || ''
      debugInApp(`editorFactory file ${document.path} successfully read, bytes: ${text.length}`)
      const editor = await createEditorAsync({
        ...focusableOpts(),
        text,
        language: 'js'
      })
      debugInApp(`editor widget successfully created for file ${document.path} `)
      editors[document.path] = { editor, document }
    } catch (error) {
      debugInApp('Error while creating editor widget for file ' + document.path + ': ' + inspect(error))
      throw error
    }
  }
  debugInApp('editorFactory returning ', !!editors[document.path], document.path)
  return editors[document.path]
}

// export function getEditorsFor(documents: Document[], parents: []) {
//   return documents.map((d, i) => getEditorFor(d, parents[i])).filter(notUndefined)
// }
