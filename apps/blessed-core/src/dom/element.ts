import { Node } from './node'
import { Document } from './document'

export class Element  extends Node  {

  children: ElementList

  constructor(public readonly tagName: string, ownerDocument: Document) {
    super(Node.ELEMENT_NODE)
    this.children = new ElementList(this._children)
    this._ownerDocument = ownerDocument
  }

  get textContent(): string | null {
    return !this.childNodes || this.childNodes.length === 0 ? '' : Array.from(this.childNodes || []).map(c => c.textContent).join('')
  }

  set textContent(c: string | null) {
    this._textContent = c
  }

  // outerHTML: string;

  get id() {
    return this.getAttribute('id')
  }
  set id(id: string | null) {
    this.setAttribute('id', id)
  }
  // innerHTML: string;
  // readonly classList: DOMTokenList;
  // className: string;  // get/set

  // HTMLELEMENT :
  // click(): void;
  // innerText: string;

}

class ElementList<T extends Node = Node> {
  constructor(protected list: T[]) {

  }
  item(i: number): T | undefined {
    return this.list[i] || undefined
  }
  get length() {
    return this.list.length
  }
}
