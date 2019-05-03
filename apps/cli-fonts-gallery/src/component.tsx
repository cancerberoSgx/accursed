import { Component as AccursedComponent } from 'accursed'
import { ActionForType, AllActions } from './store'
import { Store } from "./storeImpl";
import { State } from "./state";

export interface Props {
  store: Store
}

export abstract class Component<T extends Props = Props> extends AccursedComponent<T> {
  
  protected get s() {
    return this.props.store.getState()
  }
}
