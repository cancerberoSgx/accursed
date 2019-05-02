// import { basename, join, resolve } from 'path'
// import { ls, test } from 'shelljs'
// import { initialState } from '../store/generalReducer'
// import { State } from '../store/state'
// import { OpenFilesAction, SetCwdAction } from './editorActions'

// export function setCwd(s: State = initialState, a: SetCwdAction) {
//   return { ...s, cwd: a.cwd, cwdRootFiles: listDirectoryAsNodes(a.cwd) }
// }

// export function openFiles(s: State = initialState, a: OpenFilesAction) {
//   return {
//     ...s,
//     documents: [
//       ...s.documents,
//       ...a.paths.filter(p => !s.documents.find(d => d.path === p)).map(p => ({ path: p, name: basename(p) }))
//     ]
//   }
// }

// export function listDirectoryAsNodes(cwd: string) {
//   return ls(cwd).map(p => ({
//     filePath: resolve(join(cwd, p)),
//     children: [],
//     name: p,
//     isDirectory: test('-d', resolve(join(cwd, p)))
//   }))
// }
