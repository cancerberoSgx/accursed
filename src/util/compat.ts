import { Node } from '../blessedTypes'
import { IEditor } from '../editorWidget'

export function isEditorWidget(n: Node): n is IEditor {
  return n && (n as any).moveCursorHorizontal && (n as any).lineWithEndingForRow
}
