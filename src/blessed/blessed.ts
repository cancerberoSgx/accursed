import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { getObjectProperty, setObjectProperty } from '../util/misc'
import { Checkbox, Element, Node } from './blessedTypes'
import { closeModal, isModalVisible } from './modal'

export function isBlessedElement(n: any): n is Element {
  return n && n.screenshot && n.enableDrag
}

export function visitDescendantNodes(node: Node, fn: (l: blessed.Widgets.Node) => boolean) {
  let stop: boolean = false
  node.children.forEach(c => {
    if (stop) {
      return
    }
    if (fn(c)) {
      stop = true
      return
    }
    if (isBlessedElement(c)) {
      visitDescendantNodes(c, fn)
    }
  })
}

export function visitDescendantElements(node: Node, fn: (l: Element) => boolean) {
  return visitDescendantNodes(node, n => (isBlessedElement(n) ? fn(n) : false))
}

export function findDescendantNode<T extends Node = Node>(node: Node, fn: (l: blessed.Widgets.Node) => boolean) {
  var found: T | undefined
  visitDescendantNodes(node, c => {
    if (fn(c)) {
      found = c as any
      return true
    }
    return false
  })
  return found
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
 * notifies when used "hovers" a tree node (not enter, just overs the node when navigating with arrow keys.)
 */
export function onTreeNodeFocus<T extends contrib.Widgets.TreeElementNode>(
  tree: contrib.Widgets.TreeElement<T>,
  fn: (selectedNode: T) => void
) {
  tree.rows.key(['down', 'up'], k => {
    const selectedNode =
      tree.nodeLines && tree.rows && tree.rows.selected && tree.nodeLines[tree.rows.getItemIndex(tree.rows.selected)]
    if (selectedNode) {
      fn(selectedNode)
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
