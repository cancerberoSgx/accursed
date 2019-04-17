import { Component } from 'accursed';
import { ActionType, UnicodeStore, UnicodeAction } from './store/actions';

export abstract class StoreComponent<P extends {store: UnicodeStore}, S={}> extends Component<P, S> {

  render(): JSX.BlessedJsxNode{
    if(this.blessedElement){
      //TODO: update childcomponents
      return this.blessedElement
    }
    else {
      return this._render()
    }
  }

  abstract  _render(): JSX.BlessedJsxNode

  get el(){
    return this.blessedElement
  }
  get state(){
    return this.props.store.state
  }
  get store(){
    return this.props.store
  }
  get screen(){
    return this.state.screen
  }
  dispatch<T extends ActionType>(a: UnicodeAction<T>){
    // this.store.dispatch(a)
  }

}
