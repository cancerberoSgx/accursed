import { Component as AccursedComponent, findDescendant, isElement, Log } from 'accursed'
import { inspect } from 'util'
import { ActionManager } from './actionManager'
import { Context } from './context'
import { State } from './state'
import { AllActions, Store } from './store'

export interface Props {
  store: Store
  //&{dispatch: undefined} // should be better to just pass the state TODO
  //  dispatch<A extends AllActions>(action: A):void
  // onActionDispatched<A extends AllActions>(type: A['type'], l: ActionListener<A>):void
  context: Context
}

// type ActionListener <A extends AllActions> = (type: A['type'], l: (a: A, state: State)=>void)=>void
type ActionListener<A extends AllActions> = (a: A, state: State) => void

export abstract class Component<T extends Props = Props> extends AccursedComponent<T> {
  protected dispatch<A extends AllActions>(a: A) {
    ActionManager.get().dispatch(a)
  }

  private _debugPending: string[] = []
  protected debug(...args: any[]) {
    const d = this.screen && findDescendant<Log>(this.screen, d => isElement(d) && d.name === 'debug')
    if (d) {
      if (this._debugPending) {
        this._debugPending.forEach(l => {
          d.log(l)
        })
        this._debugPending = []
      }
      d.log(args.map(a => inspect(a)).join(', '))
      this.screen.render()
    } else {
      this._debugPending.push(args.map(a => inspect(a)).join(', '))
      setTimeout(() => {
        this.debug(' ')
      }, 2000)
    }
  }

  protected get s() {
    return this.props.store.getState()
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
