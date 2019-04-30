import { Component as AccursedComponent, findDescendant, isElement, Log } from 'accursed'
import { inspect } from 'util'
import { ActionManager } from './store/actionManager'
import { Context } from './context/context'
import { State } from './store/state'
import { AllActions, Store, ActionType } from './store/store'
import { WORKSPACE_ACTION } from './store/actions';

export interface Props {
  store: Store
  //&{dispatch: undefined} // should be better to just pass the state TODO
  //  dispatch<A extends AllActions>(action: A):void
  // onActionDispatched<A extends AllActions>(type: A['type'], l: ActionListener<A>):void
  context: Context
}

// export type ActionDispatchListener <A extends AllActions>=  (a: A, s: State) => void

// type ActionListener <A extends AllActions> = (type: A['type'], l: (a: A, state: State)=>void)=>void
export type ActionListener<A extends AllActions> = (a: A, state: State) => void

export abstract class Component<T extends Props = Props> extends AccursedComponent<T> {

  protected dispatch<A extends AllActions>(a: A) {
    ActionManager.get().dispatch(a)
  }

  protected onActionDispatched<A extends AllActions>(type: A['type'], l: ActionListener<A>) {
    ActionManager.get().onActionDispatched(type,l );
  }
  
  protected get s() {
    return this.props.store.getState()
  }


  protected debug(...args: any[]) {
    this.dispatch({
      type: WORKSPACE_ACTION.LOG_MESSAGE, 
      message: args.map(a => inspect(a)).join(', '), 
      messageType: 'debug'
    })
    // const d = this.screen && findDescendant<Log>(this.screen, d => isElement(d) && d.name === 'debug')
    // if (d) {
      // if (this._debugPending) {
      //   this._debugPending.forEach(l => {
      //     d.log(l)
      //   })
      //   this._debugPending = []
      // }
      // d.log(args.map(a => inspect(a)).join(', '))
      // this.screen.render()
    // } else {
    //   this._debugPending.push(args.map(a => inspect(a)).join(', '))
    //   setTimeout(() => {
    //     this.debug(' ')
    //   }, 2000)
    // }
  }


  // protected static _actionListener(): any {
  // }
  // protected static _actionListeners :{[type in AllActions['type'] ]:ActionListener<AllActions>[]} = {} as any

  // static afterActionDispatch<A extends AllActions>(type: A['type'], l: ActionListener<A>){
  //   if(!Component._actionListeners[type]) {
  //     Component._actionListeners[type] = []
  //   }
  //   Component._actionListeners[type].push(l)
  // }

  // get actionListener(){
  //   if(!Component._actionListener){
  //     // this._actionListener = new EventEmitter()
  //     this.props.store.subscribe(Component._actionListener)
  //   }
  // }
}
