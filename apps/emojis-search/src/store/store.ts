import { ActionType, ActionTypeMap , ActionListener as ConcreteActionListener} from './actions'
import { State } from './state'
// import { ActionType, ActionTypeMap } from './actions';

/**
 * A very simple redux-unlike store. Public and anyone can register as dispatcher. Tested usage practice is all the redux bad-practices: 
 * 
 *  * the state is shared between all objects, 
 *  * state is **mutable**. 
 *  * Is passed as a prop to/from all. 
 *  * state could have non-serialize - complex / binary projects (like a blessed screen)
 * Example: 
 * 
```
var store = createStore()
buildExplorer(store)
store.state.screen.render()
```

 */
export interface Store {
  /** this is similar to store.dispatch in the sense that anybody from user facing dispatch simple action objects against the store hen user performs something.  */
  dispatch<T extends ActionType>(a: ActionTypeMap[T]): void
  /** half store.subscribe() and half a redux-sage. this is the dispatch order:  `[...this.listeners.beforeWrite, ...this.listeners.beforeReadOnly, ...this.listeners.afterWrite, ...this.listeners.afterReadOnly]`. listeners can listen only  to one kind of action . */
  addActionListener<T extends ActionType>(l: ConcreteActionListener<T>): void
  state: State
}

/** analog to redux actions */
export interface Action<ActionType> {
  type: ActionType
}

export enum ActionListenerType {
  beforeReadOnly = 'beforeReadOnly',
  afterReadOnly = 'afterReadOnly',
  afterWrite = 'afterWrite',
  beforeWrite = 'beforeWrite'
}

/**
 * Dispatcher is like Reducer but with more freedom - receive the action and the entire state and mutates it if it needs so. There are different modes on how a listener is notified when the state change and this is declared with property [[listenerType]] 
 */
export interface ActionListener<ActionType extends string, ActionTypeMap extends {[AType in ActionType]: Action<AType>}, ActionListenerId> {
  /**
   * Since in this "agile" code we could be registering listeners / reducers/sagas in the middle of UI code, we want to 
   * ensure they are unique and well identified with names form a central dictionary
   */
  id: ActionListenerId
  /** declares the mode in which this listener is notified. Some listeners can be notified before or after the "dispatch" moment and can declare that they will "mutate" (write) the state. So ones could be more like redux reducers, and other could have a role more similar to redux sagas... */
  listenerType?: ActionListenerType
  /** the action type for which this listener will be notified (only) */
  actionType: ActionType
  /** the handler method */
  handle<T extends ActionType, A extends ActionTypeMap[T]>(action: A, state: State): void
}



export class StoreImpl implements Store {
  private _state: State

  private listeners: { [name in ActionListenerType]: ConcreteActionListener<ActionType>[] } = {
    beforeReadOnly: [],
    afterReadOnly: [],
    beforeWrite: [],
    afterWrite: []
  }

  get state() {
    return this._state
  }

  constructor(initialState: State) {
    this._state = initialState
  }

  addActionListener<T extends ActionType>(d: ConcreteActionListener<T>): void {
    // TODO: verify non duplicates ids
    this.listeners[d.listenerType||ActionListenerType.afterWrite].push(d)
  }

  dispatch<T extends ActionType>(a: ActionTypeMap[T]): void {
    ;[
      ...this.listeners.beforeWrite,
      ...this.listeners.beforeReadOnly,
      ...this.listeners.afterWrite,
      ...this.listeners.afterReadOnly
    ].forEach(l => {
      l.handle(a, this._state)
    })
    this.state.screen.render()
  }
  
}
