import * as blessed from 'blessed'
import { asArray } from 'misc-utils-of-mine-generic'
import { Checkbox, Element, isElement } from '../blessedTypes'
import { getObjectProperty, setObjectProperty } from '../util/misc'
import { closeModal, isModalVisible } from './modal'
import { visitAscendants, visitDescendants } from './node';

export function isBlessedElement(n: any): n is Element {
  return n && n.screenshot && n.enableDrag
}

/**
 * Besides reacting for click, also will react for pressed, enter and space keys.
 */
export function onButtonClicked(b: blessed.Widgets.ButtonElement, fn: () => void) {
  b.on('pressed', e => {
    fn()
  })
  b.key(['enter', 'space'], e => {
    fn()
  })
  b.on('click', e => {
    fn()
  })
}

/**
 * @param screen install common exit keys on screen taking into account modals and other widgets that could use the same.
 */
export function installExitKeys(screen: blessed.Widgets.Screen) {
  screen.key(['escape', 'q', 'Q', 'C-c'], function(ch, key) {
    if (isModalVisible()) {
      closeModal(screen)
    } else {
      return process.exit(0)
    }
  })
}

/**
 * extract property stored on e.$ by path.
 */
export function getElementData<T>(e: Element, path: string) {
  e.$ = e.$ || {}
  return getObjectProperty(e.$, path) as T | undefined
}

/**
 * set property stored on e.$ by path.
 */
export function setElementData<T>(e: Element, path: string, value: T) {
  e.$ = e.$ || {}
  setObjectProperty(e.$, path, value)
}


export function onValueChange(el: Checkbox, cb: (this: Checkbox, value: boolean) => void) {
  function listener(this: Checkbox) {
    cb.apply(this, [this.checked])
  }
  el.on('check', listener)
  el.on('uncheck', listener)
  setElementData(el, 'onChangeCallback', listener)
}

export function offValueChange(el: Checkbox) {
  const listener = getElementData<(...args: any[]) => void>(el, 'onChangeCallback')
  if (listener) {
    el.on('unchecked', listener)
    el.off('check', listener)
  }
  setElementData(el, 'onChangeCallback', undefined)
}

/**
 * returns element's internal representation of the label. Warning it uses internal blessed properties that could break in the future.
 */
export function getElementLabel(el: Element): Element | undefined {
  return (el as any)._label
}

/**
 * Hot replace all children of given container element with given [[newChildren]] array elements.
 *
 * This can be used in dynamic views that need to
 * replace a whole element subtree because they radically changed. For example, a Panel could offer different modalities for
 * represent some data, that the user can demonically and each uses different element types. (for example one is a Tree, other
 * is a Table and other is a listtab).
 *
 * This method try to do and support the following modes:
 *
 *  * quickly, just destroy current children and append new ones, and only after that call render.screen()
 *  * dontRender: same as previous but without calling render.screen()
 *  * careful: using previous, for complex data, seems to have flickering and the final screen looks dirty, with segments
 * that are a mix from new UI and old .... this mode try to do several renders / hide/show so this doesn't happen, but it
 * could be slower/costly.
 */
export function replaceChildren(
  container: Element,
  newChildren: Element | Element[],
  options: { mode: 'quickly' | 'careful' | 'dontRender' } = { mode: 'careful' }
) {
  if (options.mode === 'careful') {
    container.children.filter(isElement).forEach(c => {
      container.screen.cleanSides(c)
      container.remove(c)
      c.destroy()
    })
    container.screen.cleanSides(container)
    visitDescendants(container.screen, c=>isElement(c) && container.screen.cleanSides(c))
    container.screen.once('render', () => {
      setTimeout(() => {
        asArray(newChildren).forEach(c => {
          container.append(c)
        })
        // visitAscendants(container, n=>{
          // if(isElement(n)) {
            // n.screen.cleanSides(n); n.children.forEach(c=>isElement(c) // )})
        // container.screen.cleanSides(container)
        container.screen.render()
      }, 10)
    })
    container.screen.render()
  } else {
    container.children.forEach(c => {
      // container.remove(c);
      c.destroy()
    })
    asArray(newChildren).forEach(c => {
      container.append(c)
    })
    options.mode !== 'dontRender' && container.screen.render()
  }
}

let BlessedNodeTypeVirtualInstalled = false
export function installBlessedNodeTypeVirtual<Data = any>() {
  if (BlessedNodeTypeVirtualInstalled) {
    return
  }
  // const Node = blessed.
  // require('blessed').
  return null
}

// import  * as  from 'blessed'
export class VirtualNode extends blessed.widget.Node {
  // constructor(options){
  //   super()
  // }
}

// var blessed = require('blessed')
//   , Node = blessed.Node
// function Canvas(options, canvasType) {

//   var self = this

//   if (!(this instanceof Node)) {
//     return new Canvas(options);
//   }

//   options = options || {};
//   this.options = options
//   Box.call(this, options);

//   this.on("attach", function() {
//     self.calcSize()

//     self._canvas = new InnerCanvas(this.canvasSize.width, this.canvasSize.height, canvasType)
//     self.ctx = self._canvas.getContext()

//     if (self.options.data) {
//       self.setData(self.options.data)
//     }
//   })
// }

// Canvas.prototype = Object.create(Box.prototype);

// Canvas.prototype.type = 'canvas';

// Canvas.prototype.calcSize = function() {
//   this.canvasSize = {width: this.width*2-12, height: this.height*4}
// }

// Canvas.prototype.clear = function() {
//   this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
// }

// Canvas.prototype.render = function() {

//   this.clearPos(true);
//   var inner = this.ctx._canvas.frame()
//   this.setContent(inner)
//   return this._render();
// };

// module.exports = Canvas
