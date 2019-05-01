import { debug } from 'accursed'
import { ok } from 'assert'
import { State } from './state'
import { ActionForType, AllActions, Store } from './store'

let actionManager
// type ActionListener <A extends AllActions> = (type: A['type'], l: (a: A, state: State)=>void)=>void
type ActionListener<A extends AllActions> = (a: A, state: State) => void
let instance: ActionManager
// export function getActionManager(){
//   ok(instance)
//   return instance
// }
export class ActionManager {
  static get() {
    // if(!instance){
    //   instance = new ActionManager()
    // }
    ok(instance)
    return instance
  }
  // protected store: Store
  static _create(store: Store) {
    ok(!instance)
    instance = new ActionManager(store)
    // instance.store
    // ActionManager.get().store = store
    // instance = new ActionManager()
  }
  // set store(s: Store){
  //   ok(!this._store)
  //   this._store = s
  //   // s.subscribe(()=>{
  //   // })
  // }
  private constructor(private store: Store) {}
  protected _actionListener(): any {}
  protected _actionListeners: { [type in AllActions['type']]: ActionListener<AllActions>[] } = {} as any
  onActionDispatched<T extends AllActions['type'], A extends ActionForType<T>>(type: T, l: ActionListener<A>) {
    if (!this._actionListeners[type]) {
      this._actionListeners[type] = []
    }
    this._actionListeners[type].push(l)
  }
  // get actionListener(){
  //   if(!this._actionListener){
  //     // this._actionListener = new EventEmitter()
  //     this.props.store.subscribe(this._actionListener)
  //   }
  // }
  /** all dispatches must pass though here */
  dispatch<A extends AllActions>(a: A) {
    try {
      // debug('action manager dispatch', a, this._actionListeners)
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

// protected dispatch<A extends AllActions>(a: A) {
//   ActionManager.get().dispatch(a)
// }

// protected onActionDispatched<T extends AllActions['type']>(type: T, l: ActionListener<ActionForType<T>>) {
//   ActionManager.get().onActionDispatched(type, l)
// }
