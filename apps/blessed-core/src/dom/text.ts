import { Node } from './node'
import { Document } from './document'
export class TextNode extends Node {
  constructor(_textContent: string | null, ownerDocument: Document) {
    super(Node.TEXT_NODE)
    this._textContent = _textContent
    this._ownerDocument = ownerDocument
  }

}
