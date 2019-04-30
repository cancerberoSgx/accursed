import { Action } from 'redux'

export enum WORKSPACE_ACTION {
  NOTIFY_FILE_ERROR = 'WORKSPACE_ACTION.NOTIFY_FILE_ERROR'
}

export interface NotifyFileErrorAction extends Action<WORKSPACE_ACTION.NOTIFY_FILE_ERROR> {
  error?: Error
  msg?: string
  type: WORKSPACE_ACTION.NOTIFY_FILE_ERROR
}
