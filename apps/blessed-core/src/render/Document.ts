import { isObject } from 'misc-utils-of-mine-generic'
import { Program, ProgramOptions } from '../declarations/program'
import { Node } from '../dom'
import { Flor, isJSXElementImpl } from '../jsx/createElement'
import { FullProps, isElement, ProgramDocument, ProgramElement } from '../programDom'
import { installExitKeys } from '../util/util'
import { EventManager } from './eventManager'
import { ProgramDocumentRenderer, RendererOptions } from './renderer'

interface FlorDocumentOptions extends ProgramOptions, RendererOptions {
  program?: Program
}
/**
 * Main entry point of the library
 *
```
const flor = new FlorDocument({})
flor.create({bg: 'red', fg: 'black', border: 'round', children: []})
```
 */
export class FlorDocument {
  body: FlorBody
  static DOCUMENT_TYPE_NODE = Node.DOCUMENT_TYPE_NODE
  static TEXT_NODE = Node.TEXT_NODE
  static ELEMENT_NODE = Node.ELEMENT_NODE

  private _renderer: ProgramDocumentRenderer
  public get renderer(): ProgramDocumentRenderer {
    return this._renderer
  }
  private program: Program = undefined as any
  private document: ProgramDocument
  private events: EventManager

  constructor(o: FlorDocumentOptions = { buffer: true }) {
    if (!o.program) {
      this.program = new Program(o)
      installExitKeys(this.program)
    }
    this.events = new EventManager(this.program)
    this.document = new ProgramDocument(this.events)
    Flor.setDocument(this.document)
    this._renderer = new ProgramDocumentRenderer({ program: this.program })
    this.body = new FlorBody('flor', this.document, this)
    this.document.__setBody(this.body)
  }

  createElement(t: string) {
    return this.document.createElement(t)
  }
  createTextNode(c: string) {
    return this.document.createTextNode(c)
  }
  create(props: Partial<FullProps>) {
    return this.document.create(props)
  }
  add(el: ProgramElement | Partial<FullProps> | JSX.Element) {
    return this.body.add(el)
  }

  renderElement(el: JSX.Element) {
    const e = this.Flor.render(el)
    return this.renderer.renderElement(e)
  }
  get Flor() {
    return Flor
  }

}
class FlorBody extends ProgramElement {
  constructor(tagName: string, ownerDoc: ProgramDocument, private flor: FlorDocument) {
    super(tagName, ownerDoc)
  }
  add(el: ProgramElement | Partial<FullProps> | JSX.Element) {
    let r: ProgramElement | undefined
    if (isElement(el)) {
      r = el
    } else if (isJSXElementImpl(el)) {
      r = this.flor.renderElement(el)
    } else if (isObject(el)) {
      r = this.create({ ...el as any })
    }
    if (r) {
      if (!r.parentNode) {
        this.appendChild(r)
      }
      return r
    } else {
      // TODO: report error
      throw new Error('Could not create element for input ' + el)
    }
  }
}

// function isCreatable(e: any):e is Partial<FullProps> {
//   return e && e.children
// }
