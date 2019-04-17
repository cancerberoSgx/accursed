// import { NodeSelectionAction } from './nodeSelection'
// import { State } from './state'
// import { ActionListener as AL, ActionListenerType } from './store'

// /**
//  * name convention Like redux actions they are expect to come with an event payload
//  */
// export enum ActionType {
//   DATA_MODE = 'node:selection'
// }
// /**
//  * Dispatcher is like Reducer but with more freedom - receive the action and the entire state and mutates it.
//  */
// export interface ActionListener<T extends ActionType> extends AL<ActionType, ActionTypeMap, ACTION_LISTENER> {
//   /**
//    * Since in this "agile" code we could be registering listeners / reducers/sagas in the middle of UI code, we want to ensure they are unique and well identified with names form a central dictionary
//    */
//   id: ACTION_LISTENER
//   listenerType: ActionListenerType
//   actionType: T
//   handle<T extends ActionType, A extends ActionTypeMap[T]>(action: A, state: State): void
// }
// /**
//  * centralized action map to typed actions
//  */
// export interface ActionTypeMap {
//   [ActionType.NODE_SELECTION]: NodeSelectionAction
// }

// export enum ACTION_LISTENER {
//   /** will just change the state after node selection */
//   reduceNodeSelection = 'reduceNodeSelection',
//   /** on explorerDetails UI, it will update the table and the value text when a node is selected */
//   updateDetailsViewOnNodeSelection = 'updateDetailsViewOnNodeSelection',
//   /** updates the code view UI when a node is selected */
//   updateCodeViewOnNodeSelection = 'updateCodeViewOnNodeSelection'
// }
