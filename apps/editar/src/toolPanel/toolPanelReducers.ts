import { initialState } from '../store/generalReducer'
import { State } from '../store/state'
import { LogMessageAction } from './toolPanelActions'

export function logMessage(s: State = initialState, a: LogMessageAction): State {
  // debug(a)
  return {
    ...s,
    toolsPanel: {
      ...s.toolsPanel,
      logMessages: [...(s.toolsPanel.logMessages || []), { message: a.message, messageType: a.messageType }]
    }
  }
}
