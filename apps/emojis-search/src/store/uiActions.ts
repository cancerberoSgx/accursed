import { ActionListener, ActionType, ACTION_LISTENER } from './actions'
import { Action, ActionListenerType } from './store';

export interface changeViewAction extends Action<ActionType.CHANGE_CURRENT_VIEW> {
  type: ActionType.CHANGE_CURRENT_VIEW
  view: MainView
}

export enum MainView { Emojis = 'Emojis', AllUnicode = 'AllUnicode', Search = 'Search', Help = 'Help' }

export const changeMainViewDispatcher: ActionListener<ActionType.CHANGE_CURRENT_VIEW> = {
  listenerType: ActionListenerType.afterWrite,
  id: ACTION_LISTENER.changeMainView,
  actionType: ActionType.CHANGE_CURRENT_VIEW,
  handle(a, s) {
  }
}
