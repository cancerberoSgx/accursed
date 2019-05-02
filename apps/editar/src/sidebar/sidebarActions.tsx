import { Action } from 'redux'

export enum SIDEBAR_ACTION {
  OPEN_FILES = 'SIDEBAR_ACTION_OPEN_FILE', // the document could already be opened or not. ust hadle both cases
  // SELECT_FILES = 'SIDEBAR_ACTION_SELECT',
  SET_CWD = 'SIDEBAR_ACTION_SET_CWD' // TODO: MOVE TO MORE GENREAL file
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
