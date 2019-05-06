import { Document } from '../dom'
import { ProgramElement } from './programElement'
import { FullProps } from './types';
import { createElement } from '../util/util';

export class ProgramDocument extends Document {

  readonly body: ProgramElement
  readonly head: ProgramElement

  constructor() {
    super()
    this.body = this.createElement('Body')
    this.appendChild(this.body)
    this.head = this.createElement('Head')
    this.appendChild(this.head)
  }

  createElement(t: string) {
    return new ProgramElement(t, this)
  }
  /**
   * better syntax for creating an element, setting properties, children and optionally parent.
   */
  create(props : FullProps){
    const el =  createElement(this , props)
    this.body.appendChild(el)
    return el
  }
}
