import { Action } from 'redux'
import { State, LogMessageType } from './state';
import { initialState } from './store';

export enum WORKSPACE_ACTION {
  NOTIFY_FILE_ERROR = 'WORKSPACE_ACTION.NOTIFY_FILE_ERROR',
  LOG_MESSAGE = 'WORKSPACE_ACTION.LOG_MESSAGE'
}

export interface NotifyFileErrorAction extends Action<WORKSPACE_ACTION.NOTIFY_FILE_ERROR> {
  error?: Error
  msg?: string
  type: WORKSPACE_ACTION.NOTIFY_FILE_ERROR
}
export interface LogMessageAction extends Action<WORKSPACE_ACTION.LOG_MESSAGE> {
  message: string
  messageType?: LogMessageType
  type: WORKSPACE_ACTION.LOG_MESSAGE
}
export function logMessage(s: State=initialState, a: LogMessageAction): State {
  return {...s, toolsPanel: {...s.toolsPanel, logMessages: [...s.toolsPanel.logMessages||[], {message: a.message, messageType: a.messageType}]}}
}