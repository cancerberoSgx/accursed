import { Component as AccursedComponent } from 'accursed'
import { Context } from '../context/context'
import { ActionManager } from '../store/actionManager'
import { State } from '../store/state'
import { ActionForType, AllActions, Store } from '../store/store'
import { debugInApp } from './util'

export interface Props {
  store: Store
  //&{dispatch: undefined} // should be better to just pass the state TODO
  //  dispatch<A extends AllActions>(action: A):void
  // onActionDispatched<A extends AllActions>(type: A['type'], l: ActionListener<A>):void
  context: Context
}

export type ActionListener<A extends AllActions> = (a: A, state: State) => void

export abstract class Component<T extends Props = Props> extends AccursedComponent<T> {
  protected dispatch<A extends AllActions>(a: A) {
    ActionManager.get().dispatch(a)
  }

  protected onActionDispatched<T extends AllActions['type']>(type: T, l: ActionListener<ActionForType<T>>) {
    ActionManager.get().onActionDispatched(type, l)
  }

  protected get s() {
    return this.props.store.getState()
  }

  protected debug(...args: any[]) {
    debugInApp(...args)
  }
}
