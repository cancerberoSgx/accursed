import { Element } from '../dom'
import { ProgramDocument } from './programDocument'
import { ElementPropsImpl } from './elementProps';

export class ProgramElement extends Element {

  private static counter = 1

  props: ElementPropsImpl

  /** @internal */
  _renderCounter: number = -1;

  constructor(public readonly tagName: string, ownerDocument: ProgramDocument) {
    super(tagName, ownerDocument)
    this.internalId = ProgramElement.counter++
    this.props = new ElementPropsImpl()
  }

  readonly internalId: number

  get parentNode(): ProgramElement | ProgramDocument {
    return this._parentNode as any
  }

  get absoluteLeft() {
    let x = this.props.left
    let n: ProgramElement | ProgramDocument = this
    while (n.parentNode !== n.ownerDocument) {
      x = x + (n.parentNode as ProgramElement).props.left + ((n.parentNode as ProgramElement).props.padding && (n.parentNode as ProgramElement).props.padding!.left || 0) + ((n.parentNode as ProgramElement).props.border ? 1 : 0)
      n = n.parentNode
    }
    return x
  }

  get absoluteTop() {
    let y = this.props.top
    let n: ProgramElement | ProgramDocument = this
    while (n.parentNode !== n.ownerDocument) {
      y = y + (n.parentNode as ProgramElement).props.top + ((n.parentNode as ProgramElement).props.padding && (n.parentNode as ProgramElement).props.padding!.top || 0) + ((n.parentNode as ProgramElement).props.border ? 1 : 0)
      n = n.parentNode
    }
    return y
  }

  get absoluteContentTop() {
    return this.absoluteTop + (this.props.border ? 1 : 0)
  }
  get absoluteContentLeft() {
    return this.absoluteLeft + (this.props.border ? 1 : 0)
  }
  get contentHeight() {
    return this.props.height - (this.props.border ? 1 : 0)
  }
  get contentWidth() {
    return this.props.width - (this.props.border ? 1 : 0)
  }
}



