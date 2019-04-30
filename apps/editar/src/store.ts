import { Store as ReduxStore } from 'redux'
import { NotifyFileErrorAction, WORKSPACE_ACTION } from './actions'
import { OpenFilesAction, SelectFilesAction, setCwd, SetCwdAction, SIDEBAR_ACTION, openFiles } from "./sidebarActions";
import { State } from './state'

export interface Store extends ReduxStore<State> {}

export type AllActions = SelectFilesAction | OpenFilesAction | SetCwdAction | NotifyFileErrorAction

export const initialState: State = {
  cwdRootFiles: [],
  cwd: '.',
  search: {},
  documents: [{ name: 'Unamed.txt', path: 'unamed.txt' }]
}

export function reducer(s: State = initialState, a: AllActions) {
  //TODO: use combineReducers
  if (a.type === SIDEBAR_ACTION.SET_CWD) {
    return setCwd(s, a)
  }
  if (a.type === WORKSPACE_ACTION.NOTIFY_FILE_ERROR) {
    // return setCwd(s, a)
  }
  if(a.type === SIDEBAR_ACTION.OPEN_FILES){
    return openFiles(s,a)
  }

  return { ...s }
}
