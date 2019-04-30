import { State } from './state';
import {Store as ReduxStore, createStore, Action} from 'redux'
import { SelectFilesAction, OpenFilesAction, SetCwdAction, setCwd, SIDEBAR_ACTION } from './sidebar';
import { ok } from 'assert';
import { debug } from '../../../dist/src';

export interface Store extends ReduxStore<State>{

}

// const cwd = pwd()
export const initialState: State = {
  // documents: [{name: 'foo.ts', path: process.cwd()+'/project/src/foo.ts'  }, {name: 'bar.ts', path: process.cwd()+'/project/src/bar.ts'  }],
  cwdRootFiles: [],//ls(cwd).map(p=>({filePath: resolve(join(cwd, p)), children: [], name: p, isDirectory: test('-d', resolve(join(cwd, p)))})),
  cwd:'.',
  search: {},
  documents: []

}

export function reducer(s: State=initialState, a: AllActions){
  //TODO: use combineReducers
  if(a.type===SIDEBAR_ACTION.SET_CWD){
    return setCwd(s, a)
  }
  return {...s}
}

export type AllActions = SelectFilesAction|OpenFilesAction|SetCwdAction



// type ActionListener <A extends AllActions> = (type: A['type'], l: (a: A, state: State)=>void)=>void
type ActionListener <A extends AllActions> =   (a: A, state: State)=>void

let instance: ActionManager
// export function getActionManager(){
//   ok(instance)
//   return instance
// }
export class ActionManager {
  static get(){
    // if(!instance){
    //   instance = new ActionManager()
    // }
    ok(instance)
    return instance
  }
  // protected store: Store
  static _create(store: Store){
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
  private constructor(private store: Store){}
  protected  _actionListener(): any {
  }
  protected  _actionListeners :{[type in AllActions['type'] ]:ActionListener<AllActions>[]} = {} as any

   onActionDispatched<A extends AllActions>(type: A['type'], l: ActionListener<A>){
    if(!this._actionListeners[type]) {
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
  dispatch<A extends AllActions>(a: A){
    try {
    // debug('action manager dispatch', a, this._actionListeners)
    this.store.dispatch(a)
    } catch (error) {
      debug('ERROR WHILE DISPATCHING ACTION', a, error)
    }

    if(this._actionListeners[a.type]){
      const state = this.store.getState()
      this._actionListeners[a.type].forEach(l=>l(a, state))
    }
  }
}