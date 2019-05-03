import { ACTIONS } from './fontsAction'
import { State } from './state'
import { ActionForType, ActionType, Listener, Reducer } from './store'
// store implementation
let storeImpl
export class Store {
  private reducers: { [t in ACTIONS]: Reducer<ACTIONS>[] } = {} as any
  private listeners: { [t in ACTIONS]: Listener<ACTIONS>[] } = {} as any
  private state: State
  constructor(initialState: State) {
    this.state = initialState
  }
  getState() {
    return this.state
  }
  addStateReducer<T extends ActionType>(t: ActionType, a: Reducer<T>) {
    // ok        (this.reducers.length)
    if (!this.reducers[t]) {
      this.reducers[t] = []
    }
    if (!this.reducers[t].find(l => l === a)) {
      this.reducers[t].push(a)
    }
  }
  addActionListener<T extends ActionType>(t: ActionType, a: Listener<T>) {
    // ok        (this.reducers.length)
    this.verifyArrays<T>(t)
    if (!this.listeners[t].find(l => l === a)) {
      this.listeners[t].push(a)
    }
  }
  private verifyArrays<T extends ActionType>(t: ACTIONS) {
    if (!this.listeners[t]) {
      this.listeners[t] = []
    }
    if (!this.reducers[t]) {
      this.reducers[t] = []
    }
  }
  dispatch<T extends ActionType>(a: ActionForType<T>) {
    // ok        (this.reducers.length)
    this.verifyArrays<T>(a.type)
    this.reducers[a.type].forEach(r => {
      this.state = r(this.state, a)
    })
    this.listeners[a.type].forEach(l => l(a, this))
  }
}
