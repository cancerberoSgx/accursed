// interface EventTarget {
//   addEventListener(type: string, listener: EventListener | null, options?: boolean | AddEventListenerOptions): void
//   removeEventListener(type: string, callback: EventListener | null, options?: EventListenerOptions | boolean): void
// }

interface EventListenerOptions {
  capture?: boolean
}

interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean
  passive?: boolean
}

export type EventListener <T extends EventTarget = EventTarget>= (evt: Event<T>) => void

export interface Event<T extends EventTarget = EventTarget> {
  readonly currentTarget: T | null
  readonly target: T | null
  readonly type: string
  stopPropagation(): void
}

export class EventTarget   {

  addEventListener(type: string, listener: EventListener | null, options?: boolean | AddEventListenerOptions): void {
    // throw new Error('not implemented')
  }

  removeEventListener(type: string, callback: EventListener | null, options?: EventListenerOptions | boolean): void {
    // throw new Error('not implemented')
  }

}
