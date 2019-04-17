import { ActionListenerType , ActionListener as AL, Action, StoreImpl} from './abstractStore';
import { State } from './state';
import { changeViewAction, changeSearchResultView } from './uiActions';

export interface Props {
  store: UnicodeStore
}


/** analog to redux actions */
// export interface UnicodeAction<T extends ActionType> extends Action<T> {
//   // type: T
// }
export type UnicodeAction = changeViewAction|changeSearchResultView

export interface UnicodeStore {
  /** this is similar to store.dispatch in the sense that anybody from user facing dispatch simple action objects against the store hen user performs something.  */
  dispatch<T extends ActionType>(a: ActionTypeMap[T]): void
  /** half store.subscribe() and half a redux-sage. this is the dispatch order:  `[...this.listeners.beforeWrite, ...this.listeners.beforeReadOnly, ...this.listeners.afterWrite, ...this.listeners.afterReadOnly]`. listeners can listen only  to one kind of action . */
  addActionListener<T extends ActionType>(l: UnicodeActionListener<T>): void
  state: State
}



// import { NodeSelectionAction } from './nodeSelection'
// import { State } from './state'
// import { ActionListener as AL, ActionListenerType } from './store'

/**
 * name convention Like redux actions they are expect to come with an event payload
 */
export enum ActionType {
  CHANGE_MAIN_VIEW = 'CHANGE_MAIN_VIEW',
  CHANGE_SEARCH_RESULT_VIEW='CHANGE_SEARCH_RESULT_VIEW'
}

/**
 * Dispatcher is like Reducer but with more freedom - receive the action and the entire state and mutates it.
 */
export interface UnicodeActionListener<T extends ActionType> extends AL<State,ActionType, ActionTypeMap, ACTION_LISTENER> {
  /**
   * Since in this "agile" code we could be registering listeners / reducers/sagas in the middle of UI code, we want to ensure they are unique and well identified with names form a central dictionary
   */
  id?: ACTION_LISTENER
  listenerType?: ActionListenerType
  actionType: T
  handle<T extends ActionType, A extends ActionTypeMap[T]>(action: A, state: State): void
}
/**
 * centralized action map to typed actions
 */
export interface ActionTypeMap {
  // [a in ActionType]: UnicodeAction
  [ActionType.CHANGE_MAIN_VIEW]: changeViewAction
  [ActionType.CHANGE_SEARCH_RESULT_VIEW]: changeSearchResultView
}

export enum ACTION_LISTENER {
  changeMainView = 'changeMainView',
  changeSearchResultView='changeSearchResultView'
  /** will just change the state after node selection */
  // reduceNodeSelection = 'reduceNodeSelection',
  // /** on explorerDetails UI, it will update the table and the value text when a node is selected */
  // /** updates the code view UI when a node is selected */
  // updateCodeViewOnNodeSelection = 'updateCodeViewOnNodeSelection'
}
