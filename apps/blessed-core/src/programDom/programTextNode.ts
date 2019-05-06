import { Node, NodeType } from '../dom'
import { Program } from '../declarations/program'
import { TextNode } from '../dom/text'
import { ProgramElement } from './programElement'
import { ProgramDocument } from './programDocument'

export class ProgramTextNode extends ProgramElement {
  static TEXT_NODE_TAG = 'text'
  constructor(text: string, ownerDocument: ProgramDocument) {
    super(ProgramTextNode.TEXT_NODE_TAG, ownerDocument)
    this._text = text
  }
  private _text: string
  public get text(): string {
    return this._text
  }
  public set text(value: string) {
    this._text = value
  }
}
