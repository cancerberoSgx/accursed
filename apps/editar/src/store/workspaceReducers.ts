import { LogMessageAction } from './actions'
import { initialState } from './generalReducer'
import { State } from './state'

export function logMessage(s: State = initialState, a: LogMessageAction): State {
  return {
    ...s,
    toolsPanel: {
      ...s.toolsPanel,
      logMessages: [...(s.toolsPanel.logMessages || []), { message: a.message, messageType: a.messageType }]
    }
  }
}
