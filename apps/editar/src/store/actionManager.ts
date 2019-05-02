import { debug } from 'accursed'
import { ok } from 'assert'
import { State } from './state'
import { ActionForType, ActionType, AllActions, Store } from './store'

type ActionListener<A extends AllActions> = (a: A, state: State) => void
let instance: ActionManager
export class ActionManager {
  static get() {
    ok(instance)
    return instance
  }
  static _create(store: Store) {
    ok(!instance)
    instance = new ActionManager(store)
  }
  private constructor(private store: Store) {}
  protected _actionListener(): any {}
  protected _actionListeners: { [type in ActionType]: ActionListener<AllActions>[] } = {} as any
  onActionDispatched<T extends ActionType, A extends ActionForType<T>>(type: T, l: ActionListener<A>) {
    if (!this._actionListeners[type]) {
      this._actionListeners[type] = []
    }
    this._actionListeners[type].push(l)
  }
  /** all dispatches must pass though here */
  dispatch<A extends AllActions>(a: A) {
    try {
      this.store.dispatch(a)
    } catch (error) {
      debug('ERROR WHILE DISPATCHING ACTION', a, error)
    }
    if (this._actionListeners[a.type]) {
      const state = this.store.getState()
      this._actionListeners[a.type].forEach(l => l(a, state))
    }
  }
}
