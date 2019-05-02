import { inspect } from 'util'
import { ActionManager } from '../store/actionManager'
import { TOOL_PANEL_ACTION } from '../toolPanel/toolPanelActions'

export function PREFIX(key: string) {
  return 'cli-editor-of-mine_' + key
}

export function debugInApp(...args: any[]) {
  ActionManager.get().dispatch({
    type: TOOL_PANEL_ACTION.LOG_MESSAGE,
    message: args.map(a => inspect(a)).join(', ')
  })
}
