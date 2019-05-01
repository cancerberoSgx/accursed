import { basename } from 'path'
import { initialState } from '../store/generalReducer'
import { State } from '../store/state'
import { OpenFilesAction, SetCwdAction } from './sidebarActions'
import { listDirectoryAsNodes } from './treeViewUtil'

export function setCwd(s: State = initialState, a: SetCwdAction) {
  return { ...s, cwd: a.cwd, cwdRootFiles: listDirectoryAsNodes(a.cwd) }
}
export function openFiles(s: State = initialState, a: OpenFilesAction) {
  return {
    ...s,
    documents: [
      ...s.documents,
      ...a.paths.filter(p => !s.documents.find(d => d.path === p)).map(p => ({ path: p, name: basename(p) }))
    ]
  }
}
