import { Element, IMouseEventArg, Screen } from '../blessedTypes';
interface Options {
  /** 
   * Element to listen for clicks on.
   */
  target: Element|Screen, 
  /**
   * The handler function to be called on clicks. Notice that it receives a event object with a `count`
   * property that indicate the amount of clicks.
   */
  handler: (e: IMouseEventArg&{count: number})=>void
  /**
   * The time tolerance for multiple clicks. If more time that this passes between multiple clicks then
   * `count` resets. Default value is 250. 
   */
  interval?: number
  /**
   * Install the click handler with `once()` instead of `on()`
   */
  once?:boolean
  /**
   * Remove the click listener from the target instead adding one.
   */
  remove?: boolean
}

/**
 * Adds click listener that also reports the amount of clicks in event.count property of event with which the
 * handler function is called. 
 */
export function  clicks(options: Options) {
  let t0 = Date.now()
  let count = 0
  const interval = options.interval || 250
  let timer
  function handler(e: IMouseEventArg ) {
    const t = Date.now()
    if(t-t0>interval) {
      count = 0
    }
    clearTimeout(timer)
    t0 = t
    count++
      timer = setTimeout(() => {
        if(count){
          options.handler({...e, count})
        }
      }, interval + 20)

  }
  if(options.remove){
    options.target.removeListener('click', handler)
  }
  else {
    const fn = (options.once ?  options.target.once: options.target.on).bind(options.target)
    fn('click', handler)
  }
}
