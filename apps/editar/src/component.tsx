import {React, Component as AccursedComponent, Columns, Column, TreeView, Rows, Row, Div, TabPanel, Tab, TabLabel, TabBody} from 'accursed'
import { State } from './state';
import {PREFIX} from './util'
import { focusableOpts } from './style';
import { Store } from './store';

export interface Props{
 store: Store

}

export abstract class Component<T extends Props = Props> extends AccursedComponent<T>{

  get s(){
    return this.props.store.getState()
  }
}