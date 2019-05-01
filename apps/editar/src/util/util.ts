import { inspect } from 'util'
import { ActionManager } from '../store/actionManager'
import { WORKSPACE_ACTION } from '../store/actions'

export function PREFIX(key: string) {
  return 'cli-editor-of-mine_' + key
}

export function debugInApp(...args: any[]) {
  ActionManager.get().dispatch({
    type: WORKSPACE_ACTION.LOG_MESSAGE,
    message: args.map(a => inspect(a)).join(', ')
  })
}
