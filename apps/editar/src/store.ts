import { Store as ReduxStore } from 'redux'
import { NotifyFileErrorAction } from './actions'
import { OpenFilesAction, SelectFilesAction, setCwd, SetCwdAction, SIDEBAR_ACTION } from './sidebar'
import { State } from './state'

export interface Store extends ReduxStore<State> {}

export type AllActions = SelectFilesAction | OpenFilesAction | SetCwdAction | NotifyFileErrorAction

// const cwd = pwd()
export const initialState: State = {
  // documents: [{name: 'foo.ts', path: process.cwd()+'/project/src/foo.ts'  }, {name: 'bar.ts', path: process.cwd()+'/project/src/bar.ts'  }],
  cwdRootFiles: [], //ls(cwd).map(p=>({filePath: resolve(join(cwd, p)), children: [], name: p, isDirectory: test('-d', resolve(join(cwd, p)))})),
  cwd: '.',
  search: {},
  documents: [{ name: 'Unamed.txt', path: 'unamed.txt' }]
}

export function reducer(s: State = initialState, a: AllActions) {
  //TODO: use combineReducers
  if (a.type === SIDEBAR_ACTION.SET_CWD) {
    return setCwd(s, a)
  }
  return { ...s }
}
