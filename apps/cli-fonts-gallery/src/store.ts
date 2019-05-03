import { enumKeys } from 'misc-utils-of-mine-typescript';
import { ok } from 'assert';
import { FontSelectedAction, FontsErrorAction, FontsShowAction, TextChangeAction, ACTIONS } from './fontsAction';

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


export type AllActions = FontSelectedAction|FontsErrorAction|FontsShowAction|TextChangeAction

export type ActionType = AllActions['type']




export function getAllActionTypes(){
  return enumKeys(ACTIONS)
}

/**
 * reducers are sych pure functions that interpret an action and modify the state. They cannot dispatch()
 */
type Reducer<T extends ActionType = ACTIONS> = (s: State, a: Action<T>)=>State
export interface TypedReducer<T extends ActionType>  {
  type: T
  reduce: Reducer<T>
}


/** listeners react to actions AFTER they are dispatched (model changed) and can be asynchronous. They don't modify the state but perform some action in consequence of a state change. (are like redux-sagas). They can dispatch. */
type Listener<T extends ActionType> = (a: ActionForType<T>, store: Store)=>void
export interface Saga<T extends ActionType = ACTIONS> {
  type: T
  listener: Listener<T>
}


export interface State {
  fonts: {
    selected: string
    text: string
    output?: string
    error?: Error
  }
}


// store implementation


export class Store {
  private reducers: {[t in ACTIONS]: Reducer<ACTIONS>[]} = {} as any
  private listeners :  {[t in ACTIONS]: Listener<ACTIONS>[]} = {} as any
  private state: State;

  constructor(initialState: State){
    this.state = initialState
  }

  getState() {
    return this.state
  }
      addStateReducer<T extends ActionType>(t: ActionType, a: Reducer<T>) {
        // ok        (this.reducers.length)
      if(!this.reducers[t]){
        this.reducers[t] = []
      }
      if(!this.reducers[t].find(l=>l===a)){
        this.reducers[t].push(a)
      }
    }
      addActionListener<T extends ActionType>(t: ActionType, a: Listener<T>) {
        // ok        (this.reducers.length)
      this.verifyArrays<T>(t);
      if(!this.listeners[t].find(l=>l===a)){
        this.listeners[t].push(a)
      }
    }  
  private verifyArrays<T extends ActionType>(t: ACTIONS) {
    if (!this.listeners[t]) {
      this.listeners[t] = [];
    }
    if (!this.reducers[t]) {
      this.reducers[t] = [];
    }
  }

     dispatch<T extends ActionType>(a: ActionForType<T>){
      // ok        (this.reducers.length)
      this.reducers[a.type].forEach(r=>{
        this.state = r(this.state, a)
      })

      this.verifyArrays<T>(a.type);
      this.listeners[a.type].forEach(l=>l(a, this))
      
    }
  }


