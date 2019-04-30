import { State } from './state';
import {Store as ReduxStore, createStore, Action} from 'redux'

export interface Store extends ReduxStore<State>{

}

const initialState: State = {
  documents: [{name: 'foo.ts', path: process.cwd()+'/project/src/foo.ts'  }, {name: 'bar.ts', path: process.cwd()+'/project/src/bar.ts'  }],
  cwd:  process.cwd()+'/project/',
  search: {}
}

export function reducer(s: State=initialState, a: Action){
  return {...s}
}
