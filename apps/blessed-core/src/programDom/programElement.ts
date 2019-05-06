import { Element } from '../dom'
import { layoutChildren } from '../util'
import { createElement } from '../util/util'
import { ElementPropsImpl } from './elementProps'
import { ProgramDocument } from './programDocument'
import { FullProps } from './types'

export class ProgramElement extends Element {
  /**
   * Called by `Flor.render()` after all children `ProgramElement` are created and appended to this element.
   */
  childrenReady() {
    if (! this.props.childrenReady()) {
      this.layoutChildren()
    }
  }

  layoutChildren() {
    if (this.props.layout) {
      layoutChildren({
        el: this, ...this.props.layout
      })
    }
  }

  /**
   * Called by the rendered just after the element all all its children were rendered to the screen
   *
   * This gives Element subclasses the chance to change some props, or it's children just before rendering.
   */
  afterRender(): any {
    this.props.afterRender()
  }

  /**
   * Called by the renderer just after rendering this element. It's children were not yet rendered and will be next.
   *
   * This gives Element subclasses the chance to change some props, or it's children just before rendering.
   */
  afterRenderWithoutChildren(): any {
    this.props.afterRenderWithoutChildren()
  }
  /**
   * Called by the renderer just before rendering this element. It's children will follow.
   *
   * This gives Element subclasses the chance to change some props, or it's children just before rendering.
   */
  beforeRender(): any {
    if (!this.props.beforeRender()) {
      this.layoutChildren()
    }
  }

  private static counter = 1

  // get ownerDocument() {
  //   return this._ownerDocument
  // }

  // _ownerDocument: ProgramDocument

  props: ElementPropsImpl

  /** @internal */
  _renderCounter: number = -1

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
    while (n.parentNode && n.parentNode !== n.ownerDocument) {
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

  /**
   * creates a new element and appends it to this element.
   */
  create(props: FullProps) {
    if (!this.ownerDocument) {
      throw new Error('Cannot invoke this method on an unattached element')
    }
    return createElement(this.ownerDocument as ProgramDocument, { ...props, parent: this })
  }
}
