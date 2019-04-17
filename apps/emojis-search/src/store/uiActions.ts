import { ActionListener, ActionType, ACTION_LISTENER, UnicodeAction } from './actions'
import {  ActionListenerType } from './store';
import { App } from '../app';

export interface changeViewAction extends UnicodeAction<ActionType.CHANGE_CURRENT_VIEW> {
  type: ActionType.CHANGE_CURRENT_VIEW
  view: MainView
}

export enum MainView { Emojis = 'Emojis', AllUnicode = 'AllUnicode', Search = 'Search', Help = 'Help' }

// export const changeMainViewDispatcher: App.instance()