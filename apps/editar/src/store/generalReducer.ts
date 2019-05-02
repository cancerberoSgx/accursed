import { pwd } from 'shelljs'
import { SIDEBAR_ACTION } from '../sidebar/sidebarActions'
import { openFiles, setCwd } from '../sidebar/sideBarReducers'
import { TOOL_PANEL_ACTION } from '../toolPanel/toolPanelActions'
import { logMessage } from '../toolPanel/toolPanelReducers'
import { State } from './state'
import { AllActions } from './store'

export const initialState: State = {
  cwdRootFiles: [],
  cwd: pwd().toString(),
  search: {},
  toolsPanel: { logMessages: [] },
  documents: []
}

export function reducer(s: State = initialState, a: AllActions): State {
  // TODO: use combineReducers
  if (a.type === SIDEBAR_ACTION.SET_CWD) {
    return setCwd(s, a)
  }
  // else if (a.type === WORKSPACE_ACTION.NOTIFY_FILE_ERROR) {
  //   // return setCwd(s, a)
  // }
  else if (a.type === SIDEBAR_ACTION.OPEN_FILES) {
    return openFiles(s, a)
  } else if (a.type === TOOL_PANEL_ACTION.LOG_MESSAGE) {
    return logMessage(s, a)
  }
  return { ...s }
}
