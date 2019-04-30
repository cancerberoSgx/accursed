import { Store as ReduxStore } from 'redux'
import { NotifyFileErrorAction, WORKSPACE_ACTION, LogMessageAction, logMessage } from './actions'
import { OpenFilesAction, SelectFilesAction, setCwd, SetCwdAction, SIDEBAR_ACTION, openFiles } from "../sidebar/sidebarActions";
import { State } from './state'

export interface Store extends ReduxStore<State> {}

export type AllActions = SelectFilesAction | OpenFilesAction | SetCwdAction | NotifyFileErrorAction|LogMessageAction
export type ActionType = AllActions['type']

export const initialState: State = {
  cwdRootFiles: [],
  cwd: '.',
  search: {},
  toolsPanel: {logMessages: []},
  documents: [{ name: 'Unamed.txt', path: 'unamed.txt' }]
}

export function reducer(s: State = initialState, a: AllActions) {
  //TODO: use combineReducers
  if (a.type === SIDEBAR_ACTION.SET_CWD) {
    return setCwd(s, a)
  }
  else if (a.type === WORKSPACE_ACTION.NOTIFY_FILE_ERROR) {
    // return setCwd(s, a)
  }
  else if(a.type === SIDEBAR_ACTION.OPEN_FILES){
    return openFiles(s,a)
  }
  else if(a.type===WORKSPACE_ACTION.LOG_MESSAGE){
return logMessage(s, a)
  }

  return { ...s }
}
