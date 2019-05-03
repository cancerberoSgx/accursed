import { Component as AccursedComponent } from 'accursed'
import { ActionForType, AllActions, Store, State } from './store'

export interface Props {
  store: Store
}

export abstract class Component<T extends Props = Props> extends AccursedComponent<T> {
  
  protected get s() {
    return this.props.store.getState()
  }
}
