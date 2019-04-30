import { Store as ReduxStore } from 'redux'
import {
  OpenFilesAction,
  SelectFilesAction,
  SetCwdAction,
  SIDEBAR_ACTION
} from '../sidebar/sidebarActions'
import { openFiles, setCwd } from "../sidebar/sideBarReducers";
import { logMessage, LogMessageAction, NotifyFileErrorAction, WORKSPACE_ACTION } from './actions'
import { State } from './state'

export interface Store extends ReduxStore<State> {}

export type AllActions = SelectFilesAction | OpenFilesAction | SetCwdAction | NotifyFileErrorAction | LogMessageAction
export type ActionType = AllActions['type']

export type ActionForType<T extends AllActions['type']> = AllActions extends infer R
  ? R extends AllActions
    ? T extends R['type']
      ? R
      : never
    : never
  : never

export const initialState: State = {
  cwdRootFiles: [],
  cwd: '.',
  search: {},
  toolsPanel: { logMessages: [] },
  documents: [{ name: 'Unamed.txt', path: '/home/sg/projects/cool/unamed.txt' }]
}

export function reducer(s: State = initialState, a: AllActions) {
  //TODO: use combineReducers
  if (a.type === SIDEBAR_ACTION.SET_CWD) {
    return setCwd(s, a)
  } else if (a.type === WORKSPACE_ACTION.NOTIFY_FILE_ERROR) {
    // return setCwd(s, a)
  } else if (a.type === SIDEBAR_ACTION.OPEN_FILES) {
    return openFiles(s, a)
  } else if (a.type === WORKSPACE_ACTION.LOG_MESSAGE) {
    return logMessage(s, a)
  }

  return { ...s }
}
