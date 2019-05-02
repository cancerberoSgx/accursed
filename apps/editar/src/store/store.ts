import { Store as ReduxStore } from 'redux'
import { OpenFilesAction, SetCwdAction } from '../sidebar/sidebarActions'
import { LogMessageAction } from './actions'
import { State } from './state'

export interface Store extends ReduxStore<State> {}

export type AllActions = OpenFilesAction | SetCwdAction | LogMessageAction
export type ActionType = AllActions['type']

export type ActionForType<T extends AllActions['type']> = AllActions extends infer R
  ? R extends AllActions
    ? T extends R['type']
      ? R
      : never
    : never
  : never
