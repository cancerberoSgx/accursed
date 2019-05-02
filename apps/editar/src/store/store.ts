import { Store as ReduxStore } from 'redux'
import { GoToLineOpenAction } from '../editor/editorActions'
import { OpenFilesAction, SearchFilesOpenAction, SetCwdAction } from '../sidebar/sidebarActions'
import { LogMessageAction } from '../toolPanel/toolPanelActions'
import { State } from './state'

export interface Store extends ReduxStore<State> {}

export type AllActions = OpenFilesAction | SetCwdAction | LogMessageAction | GoToLineOpenAction | SearchFilesOpenAction

export type ActionType = AllActions['type']

export type ActionForType<T extends AllActions['type']> = AllActions extends infer R
  ? R extends AllActions
    ? T extends R['type']
      ? R
      : never
    : never
  : never
