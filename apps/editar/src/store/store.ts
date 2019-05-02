import { Store as ReduxStore } from 'redux'
import { OpenFilesAction, SetCwdAction } from '../sidebar/sidebarActions'
import { LogMessageAction } from '../toolPanel/toolPanelActions'
import { State } from './state'
import { GoToLineOpenAction, GoToLineAction } from '../editor/editorActions';

export interface Store extends ReduxStore<State> {}

export type AllActions = OpenFilesAction | SetCwdAction | LogMessageAction|GoToLineOpenAction|GoToLineAction
export type ActionType = AllActions['type']

export type ActionForType<T extends AllActions['type']> = AllActions extends infer R
  ? R extends AllActions
    ? T extends R['type']
      ? R
      : never
    : never
  : never
