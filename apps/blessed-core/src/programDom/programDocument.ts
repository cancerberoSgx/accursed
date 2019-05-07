import { Document } from '../dom'
import { createElement } from '../util/util'
import { ProgramElement } from './programElement'
import { FullProps } from './types'
import { RegisteredEventListener, EventManager } from '../render';

export class ProgramDocument extends Document {
  static is(d: any): d is ProgramDocument {
    return d && d.body && d.createElement && d.create && d.handleEventListener
  }

   body: ProgramElement
  // private _head: ProgramElement
  __set_nody(_body: ProgramElement){
    this.removeChild(this.body)
    this.body = _body
    this.appendChild(_body)
  }
  // get body(){return this.body}
  constructor(private events?: EventManager) {
    super()
    this.body =  this.createElement('body')//new ProgramElement('body', this)
    // this.createElement('Body')
    this.appendChild(this.body)
    // this._body = this.createElement('Head')
    // this.appendChild(this._body)
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
      this._emptyEventListenerQueue();
    }else {
      this.registerEventListenerQueue.push(l)
    }
  }

  private _emptyEventListenerQueue() {
    if (this.registerEventListenerQueue.length) {
      this.registerEventListenerQueue.forEach(l => {
        this.events!._registerEventListener(l);
      });
      this.registerEventListenerQueue.length = 0;
    }
  }
}
