import { Node } from './node'
import { Element } from './element'
import { TextNode } from './text'

export class Document extends Node {
  constructor() {
    super(Node.DOCUMENT_TYPE_NODE)
    this.head = new HeadElement('head', this)
    this.body = new BodyElement('body', this)
  }
  head: HeadElement
  body: BodyElement
  createElement(t: string) {
    return new Element(t, this)
  }
  createTextNode(content: string) {
    return new TextNode(content, this)
  }
}

class HeadElement extends Element {
  // constructor(public readonly tagName: string) {
  //   super(tagName)
  // }
}

class BodyElement extends Element {
  // constructor(public readonly tagName: string) {
  //   super(tagName)
  // }
}
