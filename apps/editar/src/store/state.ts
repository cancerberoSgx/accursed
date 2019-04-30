import { TreeViewNode } from '../../../../dist/src'

export interface Document {
  /** basename */
  name: string
  /** absolute path */
  path: string
}

export interface State {
  search: Search
  toolsPanel: ToolsPanel
  /** opened docs */
  documents: Document[]
  cwd: string
  cwdRootFiles: File[]
}

export interface Search {
  caseSensitive?: boolean
}

export interface File extends TreeViewNode {
  filePath: string
  /** we will list directory files async */
  directoryLoaded?: boolean
  isDirectory?: boolean
}

export interface ToolsPanel {
  logMessages: LogMessages[]

}

export interface LogMessages {
  message: string
  messageType?: LogMessageType
}

export type LogMessageType = 'info'|'warninng'|'error'|'debug'