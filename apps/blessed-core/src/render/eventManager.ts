import { ProgramKeyEvent ,ProgramMouseEvent, Program , MouseAction} from '../declarations/program';
import { Event, EventListener, EventTarget } from '../dom/event';
import { ProgramElement } from '../programDom';
import { RemoveProperties } from '../util/misc';
import { debug } from '../util';

/**
 * auxiliary class that bind events with ProgramElements rendered by renderer
 */
export class EventManager {
//   registerEventListener(e: RegisteredEventListener): any {
//     if(e.name.startsWith('key')){
// this.k
//     }
//   }

  // protected eventTargets: { [id: number]: { el: ProgramElement } } = {}

  constructor(protected program: Program) {
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onMouse = this.onMouse.bind(this)
    this.program.on('keypress', this.onKeyPress)
    program.on('mouse', this.onMouse)
  }

  // /**
  //  * register the element (event target) in our dictionary
  //  */
  // register(el: ProgramElement) {
  //   this.eventTargets[el.internalId] = this.eventTargets[el.internalId] || { el }
  // }

  onKeyPress(ch: string, e: ProgramKeyEvent) {
    this.keyListeners.some(l => {
      return  notifyListener(l.listener, { type: l.name, ch, ...e, currentTarget: l.el, target: l.el }as any)
    })
  }

  private beforeAllMouseListeners: MouseListener[] =[]

  addBeforeAllMouseListener(l: MouseListener){
    if (!this.beforeAllMouseListeners.find(ll => l!==ll)) {
      this.beforeAllMouseListeners.push(l)
    }
  }

  onMouse(e: ProgramMouseEvent) {

debug('onMouse,', e)
    this.beforeAllMouseListeners.forEach(l=>{
      // const ev: MouseEvent = {  ...e, currentTarget: l.el, target: l.el,type: l.name}

        // l.l(ev)
      })

    // if (self.lockKeys) return;

    // if (self._needsClickableSort) {
    //   self.clickable = helpers.hsort(self.clickable);
    //   self._needsClickableSort = false;
    // }
    this.mouseListeners.forEach(({ el, name, listener }) => {
// let stopPropagation = false
      // var i = 0
      //   , el
      //   , set
      //   , pos;

      // // for (; i < self.clickable.length; i++) {
      // //   el = self.clickable[i];

      // if (el.detached || !el.visible) {                                              ignore retached - invisible listeners
      //   continue;
      // }

      //   // if (self.grabMouse && self.focused !== el                                       IGNORE FOCUSED
      //   //     && !el.hasAncestor(self.focused)) continue;                                         

      //   pos = el.lpos;
      //   if (!pos) continue;

      if (e.x >= el.absoluteLeft && e.x < el.absoluteLeft + el.props.width &&
        e.y >= el.absoluteTop && e.y < el.absoluteTop + el.props.height) {
          const ev = {  ...e, currentTarget: el, target: el, type: name}

          if(notifyListener(listener, ev)){
            return 
          }
         

        // (ev)
        if (e.action === 'mouseup' && name === 'click') {
          if(notifyListener(listener, { ...ev, type: 'click' })){
            return 
          }
        }
        //     el.emit('mouse', data);
        //     if (data.action === 'mousedown') {
        //       self.mouseDown = el;                                                         // DRAG
        //     } else if (data.action === 'mouseup') {
        //       (self.mouseDown || el).emit('click', data);
        //       self.mouseDown = null;                                                       // DRAG
        //     } else if (data.action === 'mousemove') {
        //       if (self.hover && el.index > self.hover.index) {
        //         set = false;
        //       }
        //       if (self.hover !== el && !set) {
        //         if (self.hover) {
        //           self.hover.emit('mouseout', data);                                     // MOUSEOUT
        //         }
        //         el.emit('mouseover', data);                                               // MOUSEOUT
        //         self.hover = el;
        //       }
        //       set = true;
        //     }
        //     el.emit(data.action, data);
        //     break;
        //   }
      }

      // // Just mouseover?
      // if ((data.action === 'mousemove'
      //     || data.action === 'mousedown'
      //     || data.action === 'mouseup')
      //     && self.hover
      //     && !set) {
      //   self.hover.emit('mouseout', data);                                               // MOUSEOUT
      //   self.hover = null;
      // }


    })
  }

  private mouseListeners: RegisteredEventListener[] = []
  /** @internal */
  _registerEventListener(o: RegisteredEventListener): any {
    if (o.name === 'keypress' || o.name.startsWith('key') && !this.keyListeners.find(l => l.el === o.el)) {
      this.keyListeners.push(o)
    }
  }
  // private   _addEventHandlers: { name: string; listener: any; }[] = []
  private keyListeners: RegisteredEventListener[] = []

}

export type RegisteredEventListener = { el: ProgramElement, name: string; listener: EventListener; }

export type MouseListener = (ev: MouseEvent)=>boolean

export interface IKeyEvent extends Event {
  full: string;
  sequence: string;
  name: string;
  shift: boolean;
  ctrl: boolean;
  meta: boolean;
  type: string;
  raw: [number, number, number, string];
  bug: Buffer;
  ch: string;
}

export interface MouseEvent extends Event {
  x: number;
  y: number;
  action: MouseAction
  button: "left" | "right" | "middle" | "unknown";
  name: "mouse";
  shift: boolean;
  ctrl: boolean;
  meta: boolean;
  type: string;
  raw: any[]
  bug: Buffer;
}

function notifyListener<T extends EventTarget= EventTarget, E extends Event<T> = Event<T>>(l: EventListener<T>, ev: RemoveProperties<E, 'stopPropagation'>) {
  let stop = false
  l({...ev, stopPropagation(){stop=true}} as any)
  return false
}

