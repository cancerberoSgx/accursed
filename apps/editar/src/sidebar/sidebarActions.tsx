import { Action } from 'redux'

export enum SIDEBAR_ACTION {
  OPEN_FILES = 'SIDEBAR_ACTION.OPEN_FILE',
  // SELECT_FILES = 'SIDEBAR_ACTION_SELECT',
  SET_CWD = 'SIDEBAR_ACTION.SET_CWD',
  SEARCH_FILES_OPEN = "SIDEBAR_ACTION.SEARCH_FILES_OPEN"
}

/** this happens when the user explicitly enters [ENTER] or doiuble clicks with mouse, expliocitly giving the
 * gesture of open the file and nnt when they just navigate though the tree with arrow keys */
export interface OpenFilesAction extends Action<SIDEBAR_ACTION.OPEN_FILES> {
  type: SIDEBAR_ACTION.OPEN_FILES
  paths: string[]
}

// /** this happens when the users control-click or single click one or more files. The gesture is just select
//  * them to some action after. Could be opening the files, could be diff, could be see control version history,
//  * etc */
// export interface SelectFilesAction extends Action<SIDEBAR_ACTION.SELECT_FILES> {
//   type: SIDEBAR_ACTION.SELECT_FILES
//   paths: string[]
// }

/**  */
export interface SetCwdAction extends Action<SIDEBAR_ACTION.SET_CWD> {
  type: SIDEBAR_ACTION.SET_CWD
  cwd: string
}

export interface SearchFilesOpenAction extends Action<SIDEBAR_ACTION.SEARCH_FILES_OPEN> {
  type: SIDEBAR_ACTION.SEARCH_FILES_OPEN
}