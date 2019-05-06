import { EventTarget } from './event'
import { Document } from './document'
import { nodeHtml } from './nodeHtml';

export abstract class Node extends EventTarget {

  static DOCUMENT_TYPE_NODE: NodeType = 10
  static TEXT_NODE: NodeType = 3
  static ELEMENT_NODE: NodeType = 1
  static _WATERMARK = 'jsx-alone-dom-dom'

  readonly attributes: NamedNodeMap<Attr>
  protected _attributes: {
    [k: string]: Attr;
  } = {}

  protected _children: Node[] = []
  readonly childNodes: NodeList<Node>

  constructor(readonly nodeType: NodeType) {
    super()
    this._children = []
    this.childNodes = new NodeList(this._children)
    this.attributes = new NamedNodeMap(this._attributes)
  }

  protected _ownerDocument: Document | null = null
  get ownerDocument() {
    return this._ownerDocument
  }

  protected _textContent: string | null = null
  get textContent() {
    return this._textContent
  }
  set textContent(c: string | null) {
    this._textContent = c
  }

  protected _parentNode: Node | null = null
  get parentNode() {
    return this._parentNode
  }

  get innerHTML() {
    return nodeHtml(this, false)
  }
  set innerHTML(id: string | null) {
    throw new Error('not implemented')
  }

  get outerHTML() {
    return nodeHtml(this, true)
  }
  set outerHTML(id: string | null) {
    throw new Error('not implemented')
  }

  getAttribute(a: string) {
    return this._attributes[a] ? this._attributes[a].value : null
  }
  setAttribute(a: string, v: string | null) {
    return this._attributes[a] = { value: v, name: a }
  }

  appendChild(c: Node) {
    this._children.push(c)
    c._parentNode = this
  }

  /**
   * Returns whether node and otherNode have the same properties.
   */
  isEqualNode(otherNode: Node | null): boolean {
    return false // TODO
  }

  /**
   * Replaces node with nodes, while replacing strings in nodes with equivalent Text nodes. Throws a "HierarchyRequestError" DOMException if the constraints of the node tree are violated.
   */
  replaceWith(...nodes: (Node | string)[]): void {
    // if (this._parentNode) {
      const children = (this._parentNode as any)._children as Node[]
      children.splice(children.indexOf(this), 1,
        ...nodes.map(n => typeof n === 'string' ? this.ownerDocument!.createTextNode(n) : n))
    // }
  }

}

export type NodeType = 10 | 3 | 1

class NodeList<T> {
  [index: number]: T;

  constructor(protected list: T[]) {

  }
  [Symbol.iterator]() {
    return this.list[Symbol.iterator]()
  }
  get length() {
    return this.list.length
  }
  item(i: number): T | null {
    return this.list[i] || null
  }
}

export interface Attr {
  name: string
  value: string | null
}

// TODO: performance - we focus on the map, and not in the array/iteration
class NamedNodeMap<T extends Attr> {
  [index: number]: T;
  constructor(protected map: { [n: string]: T }) {

  }
  [Symbol.iterator]() {
    return Object.values(this.map)[Symbol.iterator]()
  }
  get length() {
    return Object.keys(this.map).length
  }
  item(i: number): T | null {
    return Object.values(this.map)[i] || null
  }
}