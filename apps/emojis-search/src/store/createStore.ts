import { installExitKeys, screen } from 'accursed';
import { MainView } from './uiActions';
import { StoreImpl } from './store';
import { State } from './state';
import { App } from '../app';
import { ActionType, ActionTypeMap, ACTION_LISTENER, UnicodeStore } from './actions';


export class UnicodeStoreImpl extends StoreImpl<State, ActionType, ActionTypeMap, ACTION_LISTENER> implements UnicodeStore {
  dispatch<T extends ActionType>(a: ActionTypeMap[T]){
    super.dispatch(a)
    this.state.screen.render()
  
  }
  }

  
export function createStore() {
  const store = new UnicodeStoreImpl(getInitialState());
  const allReducers = [App.instance(store)];
  allReducers.forEach(r => {
    store.addActionListener(r);
  });
  return store;
}
function getInitialState(): State {
  return {
    currentView: MainView.Emojis,
    onlyEmojis: true,
    categoriesView: {
      compact: false,
      // selectedCategory?:string
    },
    searchView: {
      compact: false,
      query: 'ball'
    },
    screen: createScreen()
  };
}

function createScreen() {
  var s = screen({
    // autoPadding: false,
    log: 'log.txt',
    useBCE: true,
    // focusable: true,
    // sendFocus: true,
    // smartCSR: true,
    // forceUnicode: true,
    fullUnicode: true
  });
  installExitKeys(s);
  return s;
}
