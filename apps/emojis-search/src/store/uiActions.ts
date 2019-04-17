import { UnicodeActionListener, ActionType, ACTION_LISTENER, UnicodeAction } from './actions'
import {  ActionListenerType, Action } from './abstractStore';
import { App } from '../app';


export interface changeViewAction extends Action<ActionType.CHANGE_MAIN_VIEW> {
  type: ActionType.CHANGE_MAIN_VIEW
  view: MainView
}

export enum MainView { Emojis = 'Emojis', AllUnicode = 'AllUnicode', Search = 'Search', Help = 'Help' }

export interface changeSearchResultView extends Action<ActionType.CHANGE_SEARCH_RESULT_VIEW> {
  type: ActionType.CHANGE_SEARCH_RESULT_VIEW
  view: SearchResultView
}

export enum SearchResultView { compact='compact', table='table' }



// export const changeMainViewDispatcher: App.instance()