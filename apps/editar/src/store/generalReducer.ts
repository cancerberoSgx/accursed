import { SIDEBAR_ACTION } from '../sidebar/sidebarActions'
import { openFiles, setCwd } from '../sidebar/sideBarReducers'
import { WORKSPACE_ACTION } from './actions'
import { State } from './state'
import { AllActions } from './store'
import { logMessage } from './workspaceReducers'

export const initialState: State = {
  cwdRootFiles: [],
  cwd: '.',
  search: {},
  toolsPanel: { logMessages: [] },
  documents: [] //[{ name: 'Unamed.txt', path: '/home/sg/projects/cool/unamed.txt' }]
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
