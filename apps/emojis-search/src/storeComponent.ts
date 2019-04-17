import { Component } from 'accursed';
import { ActionType, UnicodeStore, UnicodeAction } from './store/actions';
import { getCategoryEmojis, getEmojiDefinitions, getCategoryNames } from './data/data';
import { MainView } from './store/uiActions';
import { Action } from './store/abstractStore';


export abstract class StoreComponent<P extends {store: UnicodeStore} = {store: UnicodeStore}, S={}> extends Component<P, S> {

  render(): JSX.BlessedJsxNode{
    if(this.blessedElement){
      //TODO: update childc omponents
      // return this.blessedElement
      return null
    }
    else {
      return this._render()
    }
  }

  abstract  _render(): JSX.BlessedJsxNode

  protected get el(){
    return this.blessedElement
  }
  protected get state(){
    return this.props.store.state
  }
  protected get store(){
    return this.props.store
  }
  protected get screen(){
    return this.state.screen
  }
  protected dispatch<T extends ActionType>(a: UnicodeAction){
    if(this.validateAction(a)){
      this.store.dispatch(a)
    }
  }
protected abstract  validateAction(a: UnicodeAction): boolean
}
// TODO : this should be more abstract
export abstract class UnicodeStoreComponent extends StoreComponent {

  protected getUnicodeCategories(){
    return getCategoryEmojis(this.state.currentView===MainView.Emojis)// TODO: wrong - we could be in search view - need a prop that indicate the last "catalog" source"
  }

  protected getCategoryNames(){
    return getCategoryNames(this.state.currentView===MainView.Emojis) // TODO: wrong - we could be in search view - need a prop that indicate the last "catalog" source"
  }

  protected getUnicodeDefinitions(){
    return getEmojiDefinitions(this.state.currentView===MainView.Emojis)// TODO: wrong - we could be in search view - need a prop that indicate the last "catalog" source"
  }

  protected debugError(e: Error){
    this.blessedElement.screen.log('Store component error: '+e)
    throw e
  }

  protected  validateAction(a: UnicodeAction): boolean {
    
    if(a.type===ActionType.CHANGE_MAIN_VIEW){
      return this.state.currentView!==a.view
    }    else {
      return true
    }
  }
}
