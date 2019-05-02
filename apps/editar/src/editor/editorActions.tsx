import { Action } from 'redux'

export enum EDITOR_ACTION {
  GOTO_LINE_OPEN = 'EDITOR_ACTION.GOTO_LINE_OPEN'
  // GOTO_LINE = 'EDITOR_ACTION.GOTO_LINE',
}

export interface GoToLineOpenAction extends Action<EDITOR_ACTION.GOTO_LINE_OPEN> {
  type: EDITOR_ACTION.GOTO_LINE_OPEN
}

// export interface GoToLineAction extends Action<EDITOR_ACTION.GOTO_LINE> {
//   type: EDITOR_ACTION.GOTO_LINE
//   line: number
// }
