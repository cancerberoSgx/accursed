import { Action } from 'redux'
import { LogMessageType } from '../store/state'

export enum TOOL_PANEL_ACTION {
  // NOTIFY_FILE_ERROR = 'WORKSPACE_ACTION.NOTIFY_FILE_ERROR',
  LOG_MESSAGE = 'TOOL_PANEL_ACTION.LOG_MESSAGE'
}

// export interface NotifyFileErrorAction extends Action<WORKSPACE_ACTION.NOTIFY_FILE_ERROR> {
//   error?: Error
//   msg?: string
//   type: WORKSPACE_ACTION.NOTIFY_FILE_ERROR
// }

export interface LogMessageAction extends Action<TOOL_PANEL_ACTION.LOG_MESSAGE> {
  message: string
  messageType?: LogMessageType
  type: TOOL_PANEL_ACTION.LOG_MESSAGE
}
