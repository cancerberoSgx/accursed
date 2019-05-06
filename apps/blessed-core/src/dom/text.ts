import { Document } from './document'
import { Node } from './node'
export class TextNode extends Node {
  constructor(_textContent: string | null, ownerDocument: Document) {
    super(Node.TEXT_NODE)
    this._textContent = _textContent
    this._ownerDocument = ownerDocument
  }

}
