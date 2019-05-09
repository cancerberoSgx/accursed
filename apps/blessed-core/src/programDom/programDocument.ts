import { Document } from '../dom'
import { EventManager, RegisteredEventListener } from '../render'
import { createElement } from '../util/util'
import { ProgramElement } from './programElement'
import { FullProps } from './types'

export class ProgramDocument extends Document {

  body: ProgramElement

  constructor(private events?: EventManager) {
    super()
    this.body =  this.createElement('body')
    this.appendChild(this.body)
  }

  __setBody(_body: ProgramElement) {
    this.removeChild(this.body)
    this.body = _body
    this.appendChild(_body)
  }

  createElement(t: string) {
    return new ProgramElement(t, this)
  }

  /**
   * better syntax for creating an element, setting properties, children and optionally parent.
   */
  create(props: Partial<FullProps>) {
    const el = createElement(this, props)
    this.body.appendChild(el)
    return el
  }

  setEventManager(eventManager: EventManager) {
    this.events = eventManager
    this._emptyEventListenerQueue()
  }

  private registerEventListenerQueue: RegisteredEventListener[] = []

  registerEventListener(l: RegisteredEventListener) {
    if (this.events) {
      this.events._registerEventListener(l)
      this._emptyEventListenerQueue()
    } else {
      this.registerEventListenerQueue.push(l)
    }
  }

  private _emptyEventListenerQueue() {
    if (this.registerEventListenerQueue.length) {
      this.registerEventListenerQueue.forEach(l => {
        this.events!._registerEventListener(l)
      })
      this.registerEventListenerQueue.length = 0
    }
  }

  static is(d: any): d is ProgramDocument {
    // debugger
    return !!(d && d.body && (d as ProgramDocument).createElement && (d as ProgramDocument).create) // && (d as ProgramDocument).handleEventListener
  }
}
