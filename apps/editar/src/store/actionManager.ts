import { debug } from 'accursed'
import { ok } from 'assert'
import { TOOL_PANEL_ACTION } from '../toolPanel/toolPanelActions'
import { debugInApp } from '../util/util'
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
      a.type !== TOOL_PANEL_ACTION.LOG_MESSAGE && debugInApp('ActionManager before dispatch', a.type)
      this.store.dispatch(a)
      a.type !== TOOL_PANEL_ACTION.LOG_MESSAGE && debugInApp('ActionManager after dispatch', a.type)
    } catch (error) {
      debug('ERROR WHILE DISPATCHING ACTION', a, error)
    }
    if (this._actionListeners[a.type]) {
      a.type !== TOOL_PANEL_ACTION.LOG_MESSAGE &&
        debugInApp('ActionManager notifying listeners for action ', a.type, this._actionListeners[a.type].length)
      const state = this.store.getState()
      this._actionListeners[a.type].forEach(l => l(a, state))
    }
  }
}
