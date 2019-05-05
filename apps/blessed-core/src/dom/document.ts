import { Node } from './node'
import { Element } from './element'
import { TextNode } from './text'

export class Document extends Node {
  constructor() {
    super(Node.DOCUMENT_TYPE_NODE)
    this.head = new MHeadElement('head', this)
    this.body = new MBodyElement('body', this)
  }
  head: MHeadElement
  body: MBodyElement
  createElement(t: string) {
    return new Element(t, this)
  }
  createTextNode(content: string) {
    return new TextNode(content, this)
  }
}

class MHeadElement extends Element {
  // constructor(public readonly tagName: string) {
  //   super(tagName)
  // }
}

class MBodyElement extends Element {
  // constructor(public readonly tagName: string) {
  //   super(tagName)
  // }
}
