import { Document } from '../dom'
import { ProgramElement } from './programElement'

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

  // createTextNode(content: string) {
  //   return new ProgramTextNode(content, this)
  // }

}
