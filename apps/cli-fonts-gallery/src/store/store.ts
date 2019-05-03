import {
  ACTIONS,
  FontSelectedAction,
  FontsErrorAction,
  FontsMetadataShowAction,
  FontsShowAction,
  TextChangeAction
} from './fontsAction'
import { State } from './state'
import { Store } from './storeImpl'

export interface Action<T extends ActionType> {
  type: T
}

export type ActionForType<T extends AllActions['type']> = AllActions extends infer R
  ? R extends AllActions
    ? T extends R['type']
      ? R
      : never
    : never
  : never

export type AllActions =
  | FontSelectedAction
  | FontsErrorAction
  | FontsShowAction
  | TextChangeAction
  | FontsMetadataShowAction

export type ActionType = AllActions['type']

/**
 * reducers are synch pure functions that interpret an action and modify the state. They cannot dispatch()
 */
export type Reducer<T extends ActionType = ACTIONS> = (s: State, a: Action<T>) => State
export interface TypedReducer<T extends ActionType> {
  type: T
  reduce: Reducer<T>
}

/**
 * listeners react to actions AFTER they are dispatched (model changed) and can be asynchronous. They don't
 * modify the state but perform some action in consequence of a state change. (are like redux-sagas). They can
 * dispatch.
 */
export type Listener<T extends ActionType> = (a: ActionForType<T>, store: Store) => void
export interface Saga<T extends ActionType = ACTIONS> {
  type: T
  listener: Listener<T>
}
