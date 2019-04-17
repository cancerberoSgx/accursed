import { installExitKeys, screen } from 'accursed';
import { MainView, changeMainViewDispatcher } from './uiActions';
import { StoreImpl } from './store';
import { State } from './state';
export function createStore() {
  const allReducers = [changeMainViewDispatcher];
  const store = new StoreImpl(getInitialState());
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
      categoryIndex: 0
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
