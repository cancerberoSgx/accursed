// Type definitions for blessed 0.1
// Project: https://github.com/chjj/blessed
// Definitions by: Bryn Austin Bellomy <https://github.com/brynbellomy>
//                 Steve Kellock <https://github.com/skellock>
//                 Max Brauer <https://github.com/mamachanko>
// Definitions: https://github.com/borisyankov/DefinitelyTyped
// TypeScript Version: 2.1

/// <reference types="node" />

import * as child_process from 'child_process'
import { EventEmitter } from 'events'
import * as stream from 'stream'
import { BlessedProgram } from './blessedProgram'

export namespace Widgets {
  export namespace Types {
    type TTopLeft = string | number | 'center'

    type TPosition = string | number

    type TMouseAction = 'mousedown' | 'mouseup' | 'mousemove' | 'wheelup' | 'wheeldown'

    interface TBorder extends TStyle {
      /**
       * Type of border (line or bg). bg by default.
       */
      type?: BorderType

      /**
       * Character to use if bg type, default is space.
       */
      ch?: string

      top?: boolean
      left?: boolean
      right?: boolean
      bottom?: boolean
    }

    type BorderType = string //'line' | 'bg'

    export interface TStyle {
      /**
       * Artificial type for user custom data (it doesn't exists just a type) .
       */
      custom?: { [name: string]: any }
      overflow?: 'hidden'

      bg?: Color
      fg?: Color
      bold?: boolean
      ch?: string
      underline?: boolean
      blink?: boolean
      inverse?: boolean
      invisible?: boolean
      transparent?: boolean
      shadow?: boolean
      border?: TBorder | BorderType
      label?: TStyle
      track?: TStyle
      scrollbar?: TStyle & { style?: TStyle } | true
      focus?: TStyle
      item?: TStyle
      selected?: TStyle
      hover?: TStyle
      header?: any
      cell?: any
    }

    interface TCursor {
      /**
       * Have blessed draw a custom cursor and hide the terminal cursor (experimental).
       */
      artificial: boolean

      /**
       * Shape of the cursor. Can be: block, underline, or line.
       */
      shape: 'block' | 'underline' | 'line'

      /**
       * Whether the cursor blinks.
       */
      blink: boolean

      /**
       * Color of the color. Accepts any valid color value (null is default).
       */
      color: string
    }

    type TAlign = 'left' | 'center' | 'right'

    interface ListbarCommand {
      key?: string
      callback(): void
    }

    interface TImage {
      /**
       * Pixel width.
       */
      width: number

      /**
       * Pixel height.
       */
      height: number

      /**
       * Image bitmap.
       */
      bmp: any

      /**
       * Image cellmap (bitmap scaled down to cell size).
       */
      cellmap: any
    }

    interface Cursor {
      /**
       * Have blessed draw a custom cursor and hide the terminal cursor (experimental).
       */
      artificial: boolean

      /**
       * Shape of the cursor. Can be: block, underline, or line.
       */
      shape: boolean

      /**
       * Whether the cursor blinks.
       */
      blink: boolean

      /**
       * Color of the color. Accepts any valid color value (null is default).
       */
      color: string
    }
  }

  namespace Events {
    interface IMouseEventArg extends IAbstractEventArg {
      x: number
      y: number
      action: Types.TMouseAction
      button: 'left' | 'right' | 'middle' | 'unknown'
      name: 'mouse'
    }

    interface IKeyEventArg extends IAbstractEventArg {
      full: string
      sequence: string
    }

    interface IAbstractEventArg {
      name: string
      shift: boolean
      ctrl: boolean
      meta: boolean
      type: string
      raw: [number, number, number, string]
      bug: Buffer
    }

    interface INodeGenericEventArg extends PositionCoords {
      base: number
      renders: number
    }
  }

  interface NodeChildProcessExecOptions {
    cwd?: string
    stdio?: any
    customFds?: any
    env?: any
    encoding?: string
    timeout?: number
    maxBuffer?: number
    killSignal?: string
  }

  interface IDestroyable {
    destroy(): void
  }

  interface IOptions {}

  interface IHasOptions<T extends IOptions> {
    options: T
  }

  interface TputsOptions extends IOptions {
    terminal?: string
    extended?: boolean
    debug?: boolean
    termcap?: string
    terminfoFile?: string
    terminfoPrefix?: string
    termcapFile?: string
  }

  class Tput implements IHasOptions<TputsOptions> {
    constructor(opts: TputsOptions)

    /**
     * Original options object.
     */
    options: TputsOptions

    debug: boolean
    padding: boolean
    extended: boolean
    printf: boolean
    termcap: string
    terminfoPrefix: string
    terminfoFile: string
    termcapFile: string
    error: Error
    terminal: string

    setup(): void
    term(is: any): boolean
    readTerminfo(term: string): string
    parseTerminfo(
      data: any,
      file: string
    ): {
      header: {
        dataSize: number
        headerSize: number
        magicNumber: boolean
        namesSize: number
        boolCount: number
        numCount: number
        strCount: number
        strTableSize: number
        extended: {
          dataSize: number
          headerSize: number
          boolCount: number
          numCount: number
          strCount: number
          strTableSize: number
          lastStrTableOffset: number
        }
      }
      name: string
      names: string[]
      desc: string
      bools: any
      numbers: any
      strings: any
    }
  }

  interface IDestroyable {
    destroy(): void
  }

  interface INodeOptions extends IOptions {
    name?: string
    screen?: Screen
    parent?: Node
    children?: Node[]
    /**
     * If true, the node will obtain focus when m
     */
    focusable?: boolean
  }
  /**
  ```
   'adopt' :  Received when node is added to a parent. 
   
   'remove' : Received when node is removed from it's current parent. 
   
   'reparent' : Received when node gains a new parent. 
   
   'attach' : Received when node is attached to the screen directly or somewhere in its ancestry. 
   
   'detach' : Received when node is detached from the screen directly or somewhere in its ancestry. 
  ``` 
   */
  type NodeEventType =
    /** Received when node is added to a parent. */
    | 'adopt'
    /** Received when node is removed from it's current parent. */
    | 'remove'
    /** Received when node gains a new parent. */
    | 'reparent'
    /** Received when node is attached to the screen directly or somewhere in its ancestry. */
    | 'attach'
    /** Received when node is detached from the screen directly or somewhere in its ancestry. */
    | 'detach'

  /**
   * The base node which everything inherits from.
   */
  export abstract class Node extends EventEmitter implements IHasOptions<INodeOptions>, IDestroyable {
    constructor(options: INodeOptions)

    /** Unique identifier for Node instances. @internal */
    uid: number

    focusable: boolean

    /**
     * Original options object.
     */
    options: INodeOptions

    /**
     * An object for any miscellaneous user data.
     */
    data: { [index: string]: any }

    /**
     * An object for any miscellaneous user data.
     */
    _: { [index: string]: any }

    /**
     * An object for any miscellaneous user data.
     */
    $: { [index: string]: any }

    lpos: PositionCoords

    /**
     * Type of the node (e.g. box).
     */
    type: string

    /**
     * Render index (document order index) of the last render call.
     */
    index: number

    /**
     * Parent screen.
     */
    screen: Screen

    /**
     * Parent node. If null it means the element is not attached to any screen or program, or the node is a Screen.
     */
    parent?: Node

    /**
     * Array of node's children.
     */
    children: Node[]

    /**
     * Prepend a node to this node's children.
     */
    prepend(node: Node): void

    /**
     * Append a node to this node's children.
     */
    append(node: Node): void

    /**
     * Remove child node from node.
     */
    remove(node: Node): void

    /**
     * Insert a node to this node's children at index i.
     */
    insert(node: Node, index: number): void

    /**
     * Insert a node to this node's children before the reference node.
     */
    insertBefore(node: Node, refNode: Node): void

    /**
     * Insert a node from node after the reference node.
     */
    insertAfter(node: Node, refNode: Node): void

    /**
     * Remove node from its parent.
     */
    detach(): void
    free(): void
    /**
     * Visit each node's descendants, with [[iter]] function,  parents first.
     * If `s` is provided it will call [[iter]] on self first.
     */
    forDescendants(iter: (node: Node) => void, s?: boolean): void
    forAncestors(iter: (node: Node) => void, s?: boolean): void
    collectDescendants(s?: boolean): void
    collectAncestors(s?: boolean): void

    /**
     * Emit event for element, and recursively emit same event for all descendants. If `s` is provided it will call [[iter]] on self first.
     */
    emitDescendants(type?: string, ...args: any[]): void
    emitAncestors(): void
    hasDescendant<T extends Node = Node>(target: Node): Node
    hasAncestor<T extends Node = Node>(target: Node): Node
    /**
     * [[detach]]() this node from its parent, and will also detach and destroy each of its descendant nodes each of them emitting [[destory]] event also.
     */
    destroy(): void

    /**
     * Get user property with a potential default value.
     */
    get<T>(name: string, def: T): T

    /**
     * Set user property to value.
     */
    set(name: string, value: any): void

    /**
     * Received when node gains a new parent. If the node was detached from the sreen, newParent will be undefined.
     */
    on(event: 'reparent', listener: (this: this, newParent?: Node) => void): void
    /**
     * emitted by a parent node when adding a new child node.
     */
    on(event: 'adopt', listener: (this: this, newChildren: Node) => void): void
    on(event: 'attach', listener: (this: this, newParent: Node) => void): void
    /** Emitted by a node that is being detached frmo the screen or ancester. */
    on(event: 'detach', listener: (this: this, newParent: Node) => void): void
    /** Triggered by a parent node when removing a child node */
    on(event: 'remove', listener: (this: this, removedChild: Node) => void): void
    on(event: string, listener: (...args: any[]) => void): this
    // on(event: NodeEventType, callback: (arg: Node) => void): this
  }

  /**
     *  'focus' : Received when the terminal window focuses/blurs. Requires a terminal supporting the
     * focus protocol and focus needs to be passed to program.enableMouse().
    
     * 'blur': Received when the terminal window focuses/blurs. Requires a terminal supporting the
     * focus protocol and focus needs to be passed to program.enableMouse().

     * 'click': Element was clicked (slightly smarter than mouseup).
   */
  type NodeScreenEventType =
    /**
     * Received when the terminal window focuses/blurs. Requires a terminal supporting the
     * focus protocol and focus needs to be passed to program.enableMouse().
     */
    | 'focus'
    /**
     * Received when the terminal window focuses/blurs. Requires a terminal supporting the
     * focus protocol and focus needs to be passed to program.enableMouse().
     */
    | 'blur'
    /**
     * Element was clicked (slightly smarter than mouseup).
     */
    | 'click'
    | 'element click'
    | 'element mouseover'
    | 'element mouseout'
    | 'element mouseup'
    | 'element mouse'
    | 'element mousedown'
    | 'element mousewheel'
    | 'element wheeldown'
    | 'element wheelup'
    | 'element mousemove'

  type NodeMouseEventType =
    | 'mouse'
    | 'mouseout'
    | 'mouseover'
    | 'mousedown'
    | 'mouseup'
    | 'mousewheel'
    | 'wheeldown'
    | 'wheelup'
    | 'mousemove'
    | 'click'

  /**
    'resize': Received on screen resize. 
  
    'prerender':  Received before render. 
  
    'render': Received on render. 
  
    'destroy'    :  Received when the screen is destroyed (only useful when using multiple screens).
  
    'move':  Received when the element is moved. For example when [[rtop]] or [[position]] properties are
      updated. 
  
    'show':  Received when element is shown. 
  
    'hide':  Received when element becomes hidden. 
  
    'set content':  Received when element [[content]] is updated.
  
    'parsed content':  Received when element [[content]] is parsed.
   */
  type NodeGenericEventType =
    | 'resize'
    | 'prerender'
    | 'render'
    | 'destroy'
    | 'move'
    | 'show'
    | 'hide'
    | 'set content'
    | 'parsed content'

  export type KeyEventListener = (ch: string, key: Events.IKeyEventArg) => void

  class NodeWithEvents extends Node {
    /**
     * Bind a keypress listener for a specific key.
     */
    key(name: string | string[], listener: KeyEventListener): void

    /**
     * Bind a keypress listener for a specific key once.
     */
    onceKey(name: string, listener: KeyEventListener): void

    /**
     * Remove a keypress listener for a specific key.
     */
    unkey(name: string, listener: KeyEventListener): void

    /**
     * Remove a keypress listener for a specific key.
     */
    removeKey(name: string, listener: KeyEventListener): void
    /**
     * Registers event listener to be notified on mouse events.
     */
    on(event: string, listener: (...args: any[]) => void): this
    /**
     * Registers event listener to be notified on mouse events.
     */
    on(event: NodeMouseEventType, callback: (arg: Events.IMouseEventArg) => void): this

    /**
     * Received on key events.
     */
    on(event: 'keypress', callback: KeyEventListener): this
    on(event: NodeScreenEventType, callback: (arg: Screen) => void): this
    /**
     * Received when blessed notices something untoward (output is not a tty, terminfo not found, etc).
     */
    on(event: 'warning', callback: (text: string) => void): this
    on(event: NodeGenericEventType, callback: (arg: Events.INodeGenericEventArg) => void): this
  }

  interface IScreenOptions extends INodeOptions {
    /**
     * The blessed Program to be associated with. Will be automatically instantiated if none is provided.
     */
    program?: BlessedProgram

    /**
     * Attempt to perform CSR optimization on all possible elements (not just full-width ones, elements with
     * uniform cells to their sides). This is known to cause flickering with elements that are not full-width,
     * however, it is more optimal for terminal rendering.
     */
    smartCSR?: boolean

    /**
     * Do CSR on any element within 20 cols of the screen edge on either side. Faster than smartCSR,
     * but may cause flickering depending on what is on each side of the element.
     */
    fastCSR?: boolean

    /**
     * Attempt to perform back_color_erase optimizations for terminals that support it. It will also work
     * with terminals that don't support it, but only on lines with the default background color. As it
     * stands with the current implementation, it's uncertain how much terminal performance this adds at
     * the cost of overhead within node.
     */
    useBCE?: boolean

    /**
     * Amount of time (in ms) to redraw the screen after the terminal is resized (Default: 300).
     */
    resizeTimeout?: number

    /**
     * The width of tabs within an element's content.
     */
    tabSize?: number

    /**
     * Automatically position child elements with border and padding in mind (NOTE: this is a recommended
     * option. It may become default in the future).
     */
    autoPadding?: boolean

    cursor?: Types.TCursor

    /**
     * Create a log file. See log method.
     */
    log?: string

    /**
     * Dump all output and input to desired file. Can be used together with log option if set as a boolean.
     */
    dump?: string | boolean

    /**
     * Debug mode. Enables usage of the debug method. Also creates a debug console which will display when
     * pressing F12. It will display all log and debug messages.
     */
    debug?: boolean

    /**
     * Instance of the debug console that is enabled when calling debug options is actuve and key f12 is pressed.
     * Useful to programmatically access it in case keys don't wonk.
     * @internal
     */
    debugLog?: Log

    /**
     * Array of keys in their full format (e.g. C-c) to ignore when keys are locked or grabbed. Useful
     * for creating a key that will always exit no matter whether the keys are locked.
     */
    ignoreLocked?: boolean

    /**
     * Automatically "dock" borders with other elements instead of overlapping, depending on position
     * (experimental). For example: These border-overlapped elements:
     */
    dockBorders?: boolean

    /**
     * Normally, dockable borders will not dock if the colors or attributes are different. This option
     * will allow them to dock regardless. It may produce some odd looking multi-colored borders though.
     */
    ignoreDockContrast?: boolean

    /**
     * Allow for rendering of East Asian double-width characters, utf-16 surrogate pairs, and unicode
     * combining characters. This allows you to display text above the basic multilingual plane. This
     * is behind an option because it may affect performance slightly negatively. Without this option
     * enabled, all double-width, surrogate pair, and combining characters will be replaced by '??',
     * '?', '' respectively. (NOTE: iTerm2 cannot display combining characters properly. Blessed simply
     * removes them from an element's content if iTerm2 is detected).
     */
    fullUnicode?: boolean

    /**
     * Send focus events after mouse is enabled.
     */
    sendFocus?: boolean

    /**
     * Display warnings (such as the output not being a TTY, similar to ncurses).
     */
    warnings?: boolean

    /**
     * Force blessed to use unicode even if it is not detected via terminfo, env variables, or windows code page.
     * If value is true unicode is forced. If value is false non-unicode is forced (default: null).
     */
    forceUnicode?: boolean

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    input?: stream.Writable

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    output?: stream.Readable

    /**
     * The blessed Tput object (only available if you passed tput: true to the Program constructor.)
     */
    tput?: Tput | boolean

    /**
     * Top of the focus history stack.
     */
    focused?: BlessedElement

    /**
     * Width of the screen (same as program.cols).
     */
    width?: number

    /**
     * Height of the screen (same as program.rows).
     */
    height?: number

    /**
     * Same as screen.width.
     */
    cols?: number

    /**
     * Same as screen.height.
     */
    rows?: number

    /**
     * Relative top offset, always zero.
     */
    top?: Types.TTopLeft

    /**
     * Relative left offset, always zero.
     */
    left?: Types.TTopLeft

    /**
     * Relative right offset, always zero.
     */
    right?: Types.TPosition

    /**
     * Relative bottom offset, always zero.
     */
    bottom?: Types.TPosition

    /**
     * Absolute top offset, always zero.
     */
    atop?: Types.TTopLeft

    /**
     * Absolute left offset, always zero.
     */
    aleft?: Types.TTopLeft

    /**
     * Absolute right offset, always zero.
     */
    aright?: Types.TPosition

    /**
     * Absolute bottom offset, always zero.
     */
    abottom?: Types.TPosition

    /**
     * Whether the focused element grabs all keypresses.
     */
    grabKeys?: any

    /**
     * Prevent keypresses from being received by any element.
     */
    lockKeys?: boolean

    /**
     * The currently hovered element. Only set if mouse events are bound.
     */
    hover?: any

    /**
     * Set or get terminal name. Set calls screen.setTerminal() internally.
     */
    terminal?: string

    /**
     * Set or get window title.
     */
    title?: string
  }

  /**
   * A point in the screen. The first element represent the attr (value combining the color, and effects like bold, underline, etc) and the second it the character to paint. See [[Element.sattr]]
   */
  type ScreenLine = [number, string]

  /**
   * The screen on which every other node renders. Can be compared wih the DOM document and manages many aspects of its descendants such as :
   *
   * ## Focus:
   *
   * The focus of all its descendant Elements is managed by the Screen, which adds any [[focusable]] node an index, in order of evaluation.
   *
   * Focus can be changed using mehods public methods like [[focusPrevious]], [[focusNext]], Also it support focusing elements in a region and save/restor the focus state.
   *
   * Lsteners can be subscribed for focus changes with evenst [[focus]] and [[blur]]. The current focused element, if any, is available in attribtue [[focused]]
   *
   * A common scenario is to call focusNext or focusPrev on certain key presses (tab, S-tab).
   */
  class Screen extends NodeWithEvents implements IHasOptions<IScreenOptions> {
    constructor(opts: IScreenOptions)

    /**
     * Parse the sides of an element to determine whether an element has uniform cells on both sides.
     * If it does, we can use CSR to optimize scrolling on a scrollable element. Not exactly sure how worthwile this is.
     * This will cause a performance/cpu-usage hit, but will it be less or greater than the performance hit of slow-rendering scrollable boxes with clean sides? */
    cleanSides(el: Widgets.BlessedElement): boolean

    /** true is the terminal was destroyed. @internal.  */
    destroyed?: boolean

    /** focus history. @internal */
    history: BlessedElement[]

    /**
     * Original options object.
     */
    options: IScreenOptions

    /**
     * The blessed Program to be associated with. Will be automatically instantiated if none is provided.
     */
    program: BlessedProgram

    /**
     * Attempt to perform CSR optimization on all possible elements (not just full-width ones, elements with
     * uniform cells to their sides). This is known to cause flickering with elements that are not full-width,
     * however, it is more optimal for terminal rendering.
     */
    smartCSR: boolean

    /**
     * Do CSR on any element within 20 cols of the screen edge on either side. Faster than smartCSR,
     * but may cause flickering depending on what is on each side of the element.
     */
    fastCSR: boolean

    /**
     * Attempt to perform back_color_erase optimizations for terminals that support it. It will also work
     * with terminals that don't support it, but only on lines with the default background color. As it
     * stands with the current implementation, it's uncertain how much terminal performance this adds at
     * the cost of overhead within node.
     */
    useBCE: boolean

    /**
     * Amount of time (in ms) to redraw the screen after the terminal is resized (Default: 300).
     */
    resizeTimeout: number

    /**
     * The width of tabs within an element's content.
     */
    tabSize: number

    /**
     * Automatically position child elements with border and padding in mind (NOTE: this is a recommended
     * option. It may become default in the future).
     */
    autoPadding: boolean

    cursor: Types.TCursor

    /**
     * Dump all output and input to desired file. Can be used together with log option if set as a boolean.
     */
    dump: string

    /**
     * Array of keys in their full format (e.g. C-c) to ignore when keys are locked or grabbed. Useful
     * for creating a key that will always exit no matter whether the keys are locked.
     */
    ignoreLocked: boolean

    /**
     * Automatically "dock" borders with other elements instead of overlapping, depending on position
     * (experimental). For example: These border-overlapped elements:
     */
    dockBorders: boolean

    /**
     * Normally, dockable borders will not dock if the colors or attributes are different. This option
     * will allow them to dock regardless. It may produce some odd looking multi-colored borders though.
     */
    ignoreDockContrast: boolean

    /**
     * Allow for rendering of East Asian double-width characters, utf-16 surrogate pairs, and unicode
     * combining characters. This allows you to display text above the basic multilingual plane. This
     * is behind an option because it may affect performance slightly negatively. Without this option
     * enabled, all double-width, surrogate pair, and combining characters will be replaced by '??',
     * '?', '' respectively. (NOTE: iTerm2 cannot display combining characters properly. Blessed simply
     * removes them from an element's content if iTerm2 is detected).
     */
    fullUnicode: boolean

    /**
     * Send focus events after mouse is enabled.
     */
    sendFocus: boolean

    /**
     * Display warnings (such as the output not being a TTY, similar to ncurses).
     */
    warnings: boolean

    /**
     * Force blessed to use unicode even if it is not detected via terminfo, env variables, or windows code page.
     * If value is true unicode is forced. If value is false non-unicode is forced (default: null).
     */
    forceUnicode: boolean

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    input: stream.Writable

    /**
     * Input and output streams. process.stdin/process.stdout by default, however, it could be a
     * net.Socket if you want to make a program that runs over telnet or something of that nature.
     */
    output: stream.Readable

    /**
     * The blessed Tput object (only available if you passed tput: true to the Program constructor.)
     */
    tput: Tput

    /**
     * Top of the focus history stack.
     */
    focused: BlessedElement

    /**
     * Width of the screen (same as program.cols).
     */
    width: number

    /**
     * Height of the screen (same as program.rows).
     */
    height: number

    /**
     * Same as screen.width.
     */
    cols: number

    /**
     * Same as screen.height.
     */
    rows: number

    /**
     * Relative top offset, always zero.
     */
    top: Types.TTopLeft

    /**
     * Relative left offset, always zero.
     */
    left: Types.TTopLeft

    /**
     * Relative right offset, always zero.
     */
    right: Types.TPosition

    /**
     * Relative bottom offset, always zero.
     */
    bottom: Types.TPosition

    /**
     * Absolute top offset, always zero.
     */
    atop: Types.TTopLeft

    /**
     * Absolute left offset, always zero.
     */
    aleft: Types.TTopLeft

    /**
     * Absolute right offset, always zero.
     */
    aright: Types.TPosition

    /**
     * Absolute bottom offset, always zero.
     */
    abottom: Types.TPosition

    /**
     * Whether the focused element grabs all keypresses.
     */
    grabKeys: any

    /**
     * Prevent keypresses from being received by any element.
     */
    lockKeys: boolean

    /**
     * The currently hovered element. Only set if mouse events are bound.
     */
    hover: any

    /**
     * Element that implements the text hover. @internal
     */
    _hoverText?: BoxElement

    /**
     * Set or get terminal name. Set calls screen.setTerminal() internally.
     */
    terminal: string

    /**
     * Set or get window title.
     */
    title: string

    /**
     * Internal Screen buffer of current lines. Exposed for debug purpuses. @internal
     */
    lines: ScreenLine[][]

    /**
     * Write string to the log file if one was created.
     */
    log(...msg: any[]): void

    /**
     * Same as the log method, but only gets called if the debug option was set.
     */
    debug(...msg: string[]): void

    /**
     * Allocate a new pending screen buffer and a new output screen buffer.
     */
    alloc(): void

    /**
     * Reallocate the screen buffers and clear the screen.
     */
    realloc(): void

    /**Convert an SGR string to our own attribute format.*/
    attrCode(code: string, cur: number, def: number): number

    // Convert our own attribute format to an SGR string.
    codeAttr(attr: number): string
    /**
     * Draw the screen based on the contents of the screen buffer.
     */
    draw(start: number, end: number): void

    /**
     * Resets the focus, buffers, clear the sreen, alloc new memory, reset the keypad keys, stop listening to
     * the mouse, etc. But won't emit destroy or other events nor unregister any listener. (I guess is like a
     * reset)
     * @internal
     */
    leave(): void

    /**
     * @internal
     */
    postEnter(): void

    /**
     * Render all child elements, writing all data to the screen buffer and drawing the screen.
     */
    render(): void

    /**
     * Clear any region on the screen.
     */
    clearRegion(x1: number, x2: number, y1: number, y2: number, override?: boolean): void

    /**
     * Fill any region with a character of a certain attribute.
     *
     * Will force writing to screen input even if current pixel attr value didn't changed..
     */
    fillRegion(attr: string, ch: string, x1: number, x2: number, y1: number, y2: number, override?: boolean): void

    /**
     * Focus element by offset of focusable elements.
     */
    focusOffset(offset: number): any

    /**
     * Focus previous [[focusable]] element in the index.
     */
    focusPrevious(): void

    /**
     * Focus next [[focusable]] element in the index.
     */
    focusNext(): void

    /**
     * Push element on the focus stack (equivalent to screen.focused = el).
     */
    focusPush(element: BlessedElement): void

    /**
     * Pop element off the focus stack.
     */
    focusPop(): BlessedElement

    /**
     * Save the focused element.
     */
    saveFocus(): BlessedElement

    /**
     * Restore the saved focused element.
     */
    restoreFocus(): BlessedElement

    /**
     * "Rewind" focus to the last visible and attached element.
     */
    rewindFocus(): BlessedElement

    /**
     * Spawn a process in the foreground, return to blessed app after exit.
     */
    spawn(file: string, args?: string[], options?: NodeChildProcessExecOptions): child_process.ChildProcess

    /**
     * Spawn a process in the foreground, return to blessed app after exit. Executes callback on error or exit.
     */
    exec(
      file: string,
      args: string[],
      options: NodeChildProcessExecOptions,
      callback: (...args: any[]) => void
    ): child_process.ChildProcess

    /**
     * Read data from text editor.
     */
    readEditor(options: any, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void
    readEditor(callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void

    /**
     * Set effects based on two events and attributes.
     */
    setEffects(el: BlessedElement, fel: BlessedElement, over: any, out: any, effects: any, temp: any): void

    /**
     * Insert a line into the screen (using csr: this bypasses the output buffer).
     */
    insertLine(n: number, y: number, top: number, bottom: number): void

    /**
     * Delete a line from the screen (using csr: this bypasses the output buffer).
     */
    deleteLine(n: number, y: number, top: number, bottom: number): void

    /**
     * Insert a line at the bottom of the screen.
     */
    insertBottom(top: number, bottom: number): void

    /**
     * Insert a line at the top of the screen.
     */
    insertTop(top: number, bottom: number): void

    /**
     * Delete a line at the bottom of the screen.
     */
    deleteBottom(top: number, bottom: number): void

    /**
     * Delete a line at the top of the screen.
     */
    deleteTop(top: number, bottom: number): void

    /**
     * Enable mouse events for the screen and optionally an element (automatically called when a form of
     * on('mouse') is bound).
     */
    enableMouse(el?: BlessedElement): void

    /**
     * Enable keypress events for the screen and optionally an element (automatically called when a form of
     * on('keypress') is bound).
     */
    enableKeys(el?: BlessedElement): void

    /**
     * Enable key and mouse events. Calls bot enableMouse and enableKeys.
     */
    enableInput(el?: BlessedElement): void

    /**
     * Attempt to copy text to clipboard using iTerm2's proprietary sequence. Returns true if successful.
     */
    copyToClipboard(text: string): void

    /**
     * Attempt to change cursor shape. Will not work in all terminals (see artificial cursors for a solution
     * to this). Returns true if successful.
     */
    cursorShape(shape: boolean, blink: boolean): any

    /**
     * Attempt to change cursor color. Returns true if successful.
     */
    cursorColor(color: string): void

    /**
     * Attempt to reset cursor. Returns true if successful.
     */
    cursorReset(): void

    /**
     * Take an SGR screenshot of the screen within the region. Returns a string containing only
     * characters and SGR codes. Can be displayed by simply echoing it in a terminal.
     */
    screenshot(xi: number, xl: number, yi: number, yl: number): string
    screenshot(): void

    /**
     * Destroy the screen object and remove it from the global list. Also remove all global events relevant
     * to the screen object. If all screen objects are destroyed, the node process is essentially reset
     * to its initial state.
     */
    destroy(): void

    /**
     * Reset the terminal to term. Reloads terminfo.
     */
    setTerminal(term: string): void
  }

  interface Padding {
    left?: number
    right?: number
    top?: number
    bottom?: number
  }

  type Color = number | string

  class PositionCoords {
    xi: number
    xl: number
    yi: number
    yl: number
  }

  interface Position {
    left: number | string
    right: number | string
    top: number | string
    bottom: number | string
  }

  interface ElementOptions extends INodeOptions {
    tags?: boolean

    fg?: Color
    bg?: Color
    bold?: boolean
    underline?: boolean
    blink?: boolean
    inverse?: boolean
    invisible?: boolean
    transparent?: boolean

    style?: Widgets.Types.TStyle

    /**
     * Border object, see below.
     */
    border?: Widgets.Types.TBorder | Widgets.Types.BorderType

    /**
     * Element's text content.
     */
    content?: string

    /**
     * Element is clickable.
     */
    clickable?: boolean

    /**
     * Element is focusable and can receive key input.
     */
    input?: boolean

    /**
     * Keys enabled for this element.
     */
    keyable?: boolean

    /**
     * Automatically "dock" borders with other elements instead of overlapping, depending on position
     * (experimental).
     */
    dockBorders?: boolean

    /**
     * Hide content or children outside this element's viewport.
     */
    noOverflow?: boolean

    fixed?: boolean

    /**
     * Wrap content inside this element viewport.
     */
    wrap?: boolean

    /**
     * Element is focused.
     */
    focused?: boolean

    /**
     * Whether the element is hidden.
     */
    hidden?: boolean

    /**
     * A simple text label for the element.
     */
    label?: string | LabelOptions

    /**
     * A floating text label for the element which appears on mouseover.
     */
    hoverText?: string

    /**
     * Same as style.hover.bg
     */
    hoverBg?: Color

    /**
     * Same as style.hover
     */
    hoverEffects?: Widgets.Types.TStyle
    /**
     * Same as style.focus
     */
    focusEffects?: Widgets.Types.TStyle
    /**
     * Same as style.focus and style.hover
     */
    effects?: {
      focus?: Widgets.Types.TStyle
      hover?: Widgets.Types.TStyle
    }
    /**
     * Text alignment: left, center, or right.
     */
    align?: 'left' | 'center' | 'right'

    /**
     * Vertical text alignment: top, middle, or bottom.
     */
    valign?: 'top' | 'middle' | 'bottom'

    /**
     * Shrink/flex/grow to content and child elements. Width/height during render.
     */
    shrink?: boolean

    /**
     * Amount of padding on the inside of the element. Can be a number or an object containing
     * the properties: left, right, top, and bottom.
     */
    padding?: number | Padding

    top?: Types.TTopLeft
    left?: Types.TTopLeft
    right?: Types.TPosition
    bottom?: Types.TPosition

    /**
     * Width/height of the element, can be a number, percentage (0-100%), or keyword (half or shrink).
     * Percentages can also have offsets (50%+1, 50%-1).
     */
    width?: number | string

    /**
     * Offsets of the element relative to its parent. Can be a number, percentage (0-100%), or
     * keyword (center). right and bottom do not accept keywords. Percentages can also have
     * offsets (50%+1, 50%-1).
     */
    height?: number | string

    /**
     * Can contain the above options.
     */
    position?: Position

    /**
     * Whether the element is scrollable or not.
     */
    scrollable?: boolean

    /**
     * Background character (default is whitespace ).
     */
    ch?: string

    /**
     * Allow the element to be dragged with the mouse.
     */
    draggable?: boolean

    /**
     * Draw a translucent offset shadow behind the element.
     */
    shadow?: boolean

    /** Miscelanus options. Currently JavaScript/Blessed allows to pass anything as option,
     * this is just a bucket for TypeScript and have impact */
    _data?: { [name: string]: any }

    /** `accursed` library custom support for React-like Refs. Declare the option here so it works out of the box. https://reactjs.org/docs/refs-and-the-dom.html. TODO: documentation */
    ref?: RefObject
  }

  interface RefObject<T = any> {
    current: T | undefined
  }

  interface Pos {
    aleft: number
    atop: number
    aright: number
    abottom: number

    width?: number
    height?: number
  }
  interface SimpleCoords {
    xl: number
    xi: number
    yl: number
    yi: number
  }
  interface Coords extends Pos, SimpleCoords {
    base: number
    _contentEnd: { x: number; y: number } | undefined
    notop: Types.TTopLeft | undefined
    noleft: Types.TTopLeft | undefined
    noright: Types.TPosition | undefined
    nobot: Types.TPosition | undefined
  }

  interface LabelOptions {
    text: string
    side: Types.TAlign
  }

  // TODO: scrollable - Note: If the scrollable option is enabled, Element inherits all methods from ScrollableBox.
  /**
   * Abstract base element. Elements are [[Node]] that are rendered visually so they have dimention, position, content,
   * border, padding, etc.
   *
   * ## Content Methods
   *
   * * Methods for dealing with text content, line by line. Useful for writing a text editor,
   * irc client, etc.
   *
   * * Note: All of these methods deal with pre-aligned, pre-wrapped text. If you use deleteTop()
   * on a box with a wrapped line at the top, it may remove 3-4 "real" lines (rows) depending
   * on how long the original line was.
   *
   * * The lines parameter can be a string or an array of strings. The line parameter must
   * be a string.
   */
  abstract class BlessedElement<Options extends ElementOptions = ElementOptions> extends NodeWithEvents
    implements IHasOptions<ElementOptions> {
    shrink: boolean
    constructor(opts: Options)

    /**
     * Original options object.
     */
    options: Options

    /**
     * Name of the element. Useful for form submission.
     */
    name: string

    /**
     * Border object.
     */
    border: Widgets.Types.TBorder

    /** Current element padding */
    padding: Required<Padding>

    style: Widgets.Types.TStyle
    position: Position
    content: string
    hidden: boolean
    visible: boolean
    detached: boolean

    /**
     * Border foreground and background, must be numbers (-1 for default).
     */
    bg: number
    fg: number

    /**
     * Border attributes.
     */
    bold: string

    underline: string

    /**
     * Calculated width.
     */
    width: number | string

    /**
     * Calculated height.
     */
    height: number | string

    /**
     * Calculated relative top offset.
     */
    top: number | string

    /**
     * Calculated relative left offset.
     */
    left: number | string

    /**
     * Calculated relative right offset.
     */
    right: number | string

    /**
     * Calculated relative bottom offset.
     */
    bottom: number | string

    /**
     * Calculated absolute top offset.
     */
    atop: number

    /**
     * Calculated absolute left offset.
     */
    aleft: number

    /**
     * Calculated absolute right offset.
     */
    aright: number

    /**
     * Calculated absolute bottom offset.
     */
    abottom: number

    /**
     * Whether the element is draggable. Set to true to allow dragging.
     */
    draggable: boolean

    /**
     * If true, the element won't be filled.
     * @internal
     */
    _noFill?: boolean

    /**
     * Calculated top coordinate taking into account padding and boder.
     */
    readonly itop: number
    /**
     * Calculated left coordinate taking into account padding and boder.
     */
    readonly ileft: number
    /**
     * Calculated height taking into account padding and boder.
     */
    readonly iheight: number
    /**
     * Calculated width taking into account padding and boder.
     */
    readonly iwidth: number

    /**
     * Setting this property will cause the element to change element's [[position]] property and emit [[move]] event.
     */
    rtop: Types.TTopLeft

    /**
     * Setting this property will cause the element to change element's [[position]] property and emit [[move]] event.
     */
    rleft: Types.TTopLeft

    /**
     * Calculated relative bottom offset.
     *
     * Setting this property will cause the element to change element's [[position]] property and emit [[move]] event.
     */
    rright: Types.TPosition

    /**
     * Calculated relative bottom offset.
     *
     * Setting this property will cause the element to change element's [[position]] property and emit [[move]] event.
     */
    rbottom: Types.TPosition

    /**
     * Get's the child element implementing the current label of this node.
     * @internal
     */
    _label?: BlessedElement | undefined

    /**
     * Givesthe total padding on any direction.
     */
    readonly tpadding: number

    /**
     * Write content and children to the screen buffer.
     */
    render(): Coords | undefined

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getCoords(get?: boolean, noscroll?: boolean): Coords | undefined

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getShrinkBox(xi: number, xl: number, yi: number, yl: number, get?: boolean): SimpleCoords | undefined

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getShrink(xi: number, xl: number, yi: number, yl: number, get?: boolean): SimpleCoords | undefined

    /**
     * whenever Box.render is called `lpos` gets set on the element, an object containing the rendered
     * coordinates. Since these don't update if the element is moved somehow, they're unreliable in that
     * situation. However, if we can guarantee that lpos is good and up to date, it can be more accurate than
     * the calculated positions below. In this case, if the element is being rendered, it's guaranteed that
     * the parent will have been rendered first, in which case we can use the parant's lpos instead of
     * recalculating it's position (since that might be wrong because it doesn't handle content shrinkage).
     * @internal
     */
    _getPos(): Pos

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getLeft(get?: boolean): number

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getWidth(get?: boolean): number

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getTop(get?: boolean): number

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getBottom(get?: boolean): number

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getRight(get?: boolean): number

    /**
     * @param get if true it will force to recalculate.
     * @internal
     */
    _getHeight(get?: boolean): number

    /**
     * Hide element, clear the element's region on the screen and triggers [[hide]] event.
     */
    hide(): void

    /**
     * Show element.
     */
    show(): void

    /**
     * Toggle hidden/shown.
     */
    toggle(): void

    /**
     * Focus element.
     */
    focus(): void

    /**
     * Parses given content string with no tags before rendering. Removes / transform characters that break the output.
     *
     * For example, double-width chars will eat the next char after render in this case it creates a blank character
     * after it so it doesn't eat the real next char.
     *
     * @internal
     */
    parseContent(noTags: string): boolean

    /**
     * Same as el.on('screen', ...) except this will automatically keep track of which listeners
     * are bound to the screen object. For use with removeScreenEvent(), free(), and destroy().
     */
    onScreenEvent(type: string, handler: (...args: any[]) => void): void

    /**
     * Same asel.removeListener('screen', ...) except this will automatically keep track of which
     * listeners are bound to the screen object. For use with onScreenEvent(), free(), and destroy().
     */
    removeScreenEvent(type: string, handler: (...args: any[]) => void): void

    /**
     * Free up the element. Automatically unbind all events that may have been bound to the screen
     * object. This prevents memory leaks. For use with onScreenEvent(), removeScreenEvent(),
     * and destroy().
     */

    free(): void

    /**
     * Same as the detach() method, except this will automatically call free() and unbind any screen
     * events to prevent memory leaks. for use with onScreenEvent(), removeScreenEvent(), and free().
     */
    destroy(): void

    /**
     * Change this element's index in its parent's children array. This will change the rendering order. If all elements are positioned by their selves then this could be similar to CSS z-index property. But if you are using a layout or relaying somhow in the children order then it will change the position of this element and its siblings.
     */
    setIndex(z: number): void

    /**
     * Put the element in front of its siblings. Uses [[setIndex]]
     */
    setFront(): void

    /**
     * Put the element in back of its siblings.
     */
    setBack(): void

    /**
     * text/options - Set the label text for the top-left corner. Example options: {text:'foo',side:'left'}
     */
    setLabel(arg: string | LabelOptions): void

    /**
     * Remove the label completely.
     */
    removeLabel(): any

    /**
     * text/options - Set a hover text box to follow the cursor. Similar to the "title" DOM attribute
     * in the browser. Example options: {text:'foo'}
     */
    setHover(arg: string | LabelOptions): void

    /**
     * Remove the hover label completely.
     */
    removeHover(): void

    /**
     * Enable mouse events for the element (automatically called when a form of on('mouse') is bound).
     */
    enableMouse(): void

    /**
     * Enable keypress events for the element (automatically called when a form of on('keypress') is bound).
     */
    enableKeys(): void

    /**
     * Enable key and mouse events. Calls bot enableMouse and enableKeys.
     */
    enableInput(): void

    /**
     * Enable dragging of the element.
     */
    enableDrag(cb: (e: Widgets.Events.IMouseEventArg) => any): void

    kill(): any

    /**
     * Disable dragging of the element.
     */
    disableDrag(): void

    /**
     * Take an SGR screenshot of the screen within the region. Returns a string containing only
     * characters and SGR codes. Can be displayed by simply echoing it in a terminal.
     */
    screenshot(xi: number, xl: number, yi: number, yl: number): string
    /**
     * Take an SGR screenshot of the whole screen. Returns a string containing only
     * characters and SGR codes. Can be displayed by simply echoing it in a terminal.
     */
    screenshot(): string

    /**
     * Converts `{red-fg}foo{/red-fg}` to `\x1b[31mfoo\x1b[39m`. @internal.
     */
    _parseTags(s: string): string

    /** @internal */
    _parseAttr(ines: string[]): string[]

    /** @internal */
    _align(line: string, width: number, align: string): void

    /** @internal  */
    _wrapContent(content: string, width: number): void

    /**
     * calculates the value for `style` (could be substyle like style.bar) to paint in the screen according to
     * the rest of the properties and optionally bg and fg.
     */
    sattr(style: Widgets.Types.TStyle, fg?: string, bg?: string): any // TODO: I don't fully understand what this does but is ery used in widget implementations to obtain the charvalues for painting in the screen... this is why I think it whould ebavailablr for implementors

    /**
     * Cleans the rectangle of this element on the screen. Useful for subclasses before rendering.
     * @param get it's passed to [[_getCoords]]
     * @param override it's passed to  [[Screen.clearRegion]]
     *
     * @internal
     */
    clearPos(get?: boolean, override?: boolean): void

    /**
     * Set the content. Note: When text is input, it will be stripped of all non-SGR
     * escape codes, tabs will be replaced with 8 spaces, and tags will be replaced
     * with SGR codes (if enabled).
     */
    setContent(text: string, noClear?: boolean, noTags?: boolean): void
    /**
     * Return content, slightly different from el.content. Assume the above formatting.
     */
    getContent(): string

    /**
     * Similar to setContent, but ignore tags and remove escape codes.
     */
    setText(text: string, noClear?: boolean): void

    /**
     * Similar to getContent, but return content with tags and escape codes removed.
     */
    getText(): string

    /**
     * Insert a line into the box's content.
     */
    insertLine(i: number, lines: string | string[]): void

    /**
     * Delete a line from the box's content.
     */
    deleteLine(i: number): void

    /**
     * Get a line from the box's content.
     */
    getLine(i: number): string

    /**
     * Get a line from the box's content from the visible top.
     */
    getBaseLine(i: number): string

    /**
     * Set a line in the box's content.
     */
    setLine(i: number, line: string | string[]): void

    /**
     * Set a line in the box's content from the visible top.
     */
    setBaseLine(i: number, line: string | string[]): void

    /**
     * Clear a line from the box's content.
     */
    clearLine(i: number): void

    /**
     * Clear a line from the box's content from the visible top.
     */
    clearBaseLine(i: number): void

    /**
     * Insert a line at the top of the box.
     */
    insertTop(lines: string | string[]): void

    /**
     * Insert a line at the bottom of the box.
     */
    insertBottom(lines: string | string[]): void

    /**
     * Delete a line at the top of the box.
     */
    deleteTop(): void

    /**
     * Delete a line at the bottom of the box.
     */
    deleteBottom(): void

    /**
     * Unshift a line onto the top of the content.
     */
    unshiftLine(lines: string | string[]): void

    /**
     * Shift a line off the top of the content.
     */
    shiftLine(i: number): void

    /**
     * Push a line onto the bottom of the content.
     */
    pushLine(lines: string | string[]): void

    /**
     * Pop a line off the bottom of the content.
     */
    popLine(i: number): string

    /**
     * An array containing the content lines.
     */
    getLines(): string[]

    /**
     * An array containing the lines as they are displayed on the screen.
     */
    getScreenLines(): string[]

    /**
     * Get a string's displayed width, taking into account double-width, surrogate pairs,
     * combining characters, tags, and SGR escape codes.
     */
    strWidth(text: string): string
  }

  interface ScrollableBoxOptions extends ElementOptions {
    /**
     * A limit to the childBase. Default is Infinity.
     */
    baseLimit?: number

    /**
     * A option which causes the ignoring of childOffset. This in turn causes the
     * childBase to change every time the element is scrolled.
     */
    alwaysScroll?: boolean

    /**
     * Object enabling a scrollbar.
     *
     * Style of the scrollbar track if present (takes regular style options).
     */
    scrollbar?:
      | {
          style?: Widgets.Types.TStyle
          track?: Widgets.Types.TStyle
          ch?: string
          ignoreBorder?: boolean
        } & Widgets.Types.TStyle
      | boolean
  }

  interface ScrollableTextOptions extends ScrollableBoxOptions {
    /**
     * Whether to enable automatic mouse support for this element.
     * Use pre-defined mouse events (right-click for editor).
     */
    mouse?: boolean

    /**
     * Use pre-defined keys (i or enter for insert, e for editor, C-e for editor while inserting).
     */
    keys?: string | string[] | boolean

    /**
     * Use vi keys with the keys option.
     */
    vi?: boolean
  }

  interface BoxOptions extends ScrollableTextOptions {
    bindings?: any
  }

  /**
   * DEPRECATED - Use Box with the scrollable option instead. A box with scrollable content.
   */
  class ScrollableBoxElement extends BlessedElement {
    /**
     * The offset of the top of the scroll content.
     */
    childBase: number

    /**
     * The offset of the chosen item/line.
     */
    childOffset: number

    /**
     * Scroll the content by a relative offset.
     */
    scroll(offset: number, always?: boolean): void

    /**
     * Scroll the content to an absolute index.
     */
    scrollTo(index: number): void

    /**
     * Same as scrollTo.
     */
    setScroll(index: number): void

    /**
     * Set the current scroll index in percentage (0-100).
     */
    setScrollPerc(perc: number): void

    /**
     * Get the current scroll index in lines.
     */
    getScroll(): number

    /**
     * Get the actual height of the scrolling area.
     */
    getScrollHeight(): number

    /**
     * Get the current scroll index in percentage.
     */
    getScrollPerc(): number

    /**
     * Reset the scroll index to its initial state.
     */
    resetScroll(): void

    on(event: string, listener: (...args: any[]) => void): this

    /**
     * Received when the element is scrolled.
     */
    on(event: 'scroll', callback: () => void): this
  }

  /**
   * DEPRECATED - Use Box with the scrollable and alwaysScroll options instead.
   * A scrollable text box which can display and scroll text, as well as handle
   * pre-existing newlines and escape codes.
   */
  class ScrollableTextElement extends ScrollableBoxElement {}

  /**
   * A box element which draws a simple box containing content or other elements.
   */
  class BoxElement extends ScrollableTextElement implements IHasOptions<BoxOptions> {
    constructor(opts: BoxOptions)

    /**
     * Original options object.
     */
    options: BoxOptions
  }

  interface TextOptions extends ElementOptions {
    /**
     * Fill the entire line with chosen bg until parent bg ends, even if there
     * is not enough text to fill the entire width.
     */
    fill?: boolean

    /**
     * Text alignment: left, center, or right.
     */
    align?: Types.TAlign
  }

  /**
   * An element similar to Box, but geared towards rendering simple text elements.
   */
  class TextElement<Options extends Widgets.TextOptions = Widgets.TextOptions> extends BlessedElement<Options>
    implements IHasOptions<Options> {
    constructor(opts: TextOptions)

    // /**
    //  * Original options object.
    //  */
    // options: TextOptions
  }

  /**
   * A simple line which can be line or bg styled.
   */
  interface LineOptions extends BoxOptions {
    /**
     * Can be vertical or horizontal.
     */
    orientation?: 'vertical' | 'horizontal'

    /**
     * Treated the same as a border object. (attributes can be contained in style).
     */
    type?: string
    bg?: Color
    fg?: Color
    ch?: string
  }

  /**
   * A simple line which can be line or bg styled.
   */
  class LineElement extends BoxElement implements IHasOptions<LineOptions> {
    constructor(opts: LineOptions)

    /**
     * Original options object.
     */
    options: LineOptions
  }

  interface BigTextOptions extends BoxOptions {
    /**
     * bdf->json font file to use (see ttystudio for instructions on compiling BDFs to JSON).
     */
    font?: string

    /**
     * bdf->json bold font file to use (see ttystudio for instructions on compiling BDFs to JSON).
     */
    fontBold?: string

    /**
     * foreground character. (default: ' ')
     */
    fch?: string
  }

  /**
   * A box which can render content drawn as 8x14 cell characters using the terminus font.
   */
  class BigTextElement extends BoxElement implements IHasOptions<BigTextOptions> {
    constructor(opts: BigTextOptions)

    /**
     * Original options object.
     */
    options: BigTextOptions
  }

  interface ListElementStyle extends Widgets.Types.TStyle {
    selected?: Widgets.Types.TStyle
    item?: Widgets.Types.TStyle
  }

  interface ListOptions<TStyle extends ListElementStyle = {}> extends BoxOptions {
    // /**
    //  * Style for a selected item. Style for an unselected item.
    //  */
    // style?: TStyle

    /**
     * An array of strings which become the list's items.
     */
    items?: string[]

    /** selected item backgroundColor */
    selectedBg?: string

    //TODO: hold

    /**
     * A function that is called when vi mode is enabled and the key / is pressed. This function accepts a
     * callback function which should be called with the search string. The search string is then used to
     * jump to an item that is found in items.
     */
    search?(err: any, value?: string): void

    /**
     * Whether the list is interactive and can have items selected (Default: true).
     */
    interactive?: boolean

    /**
     * Whether to automatically override tags and invert fg of item when selected (Default: true).
     */
    invertSelected?: boolean
  }

  type ListElementEventType =
    /** List was canceled (when esc is pressed with the keys option). */
    | 'cancel'
    /** Either a select or a cancel event was received. */
    | 'action'
    | 'create item'
    | 'add item'
    | 'remove item'
    | 'insert item'
    | 'set items'

  class ListElement extends BoxElement implements IHasOptions<ListOptions<ListElementStyle>> {
    constructor(opts: ListOptions<ListElementStyle>)

    /**
     * The current selected index. @internal
     */
    selected?: number

    /**
     * The current value. @internal
     */
    value?: string

    /**
     * Current item elements in the list. @internal
     */
    ritems?: BlessedElement[]

    /**
     * Current item values in the list. @internal
     */
    items: BlessedElement[]

    /**
     * Original options object.
     */
    options: ListOptions<ListElementStyle>

    /**
     * Add an item based on a string.
     */
    add(text: string): void

    /**
     * Add an item based on a string.
     */
    addItem(text: string): void

    /**
     * Removes an item from the list. Child can be an element, index, or string.
     */
    removeItem(child: BlessedElement): BlessedElement

    /**
     * Push an item onto the list.
     */
    pushItem(child: BlessedElement): number

    /**
     * Pop an item off the list.
     */
    popItem(): BlessedElement

    /**
     * Unshift an item onto the list.
     */
    unshiftItem(child: BlessedElement): number

    /**
     * Shift an item off the list.
     */
    shiftItem(): BlessedElement

    /**
     * Inserts an item to the list. Child can be an element, index, or string.
     */
    insertItem(i: number, child: BlessedElement | string): void

    /**
     * Returns the item element. Child can be an element, index, or string.
     */
    getItem(child: BlessedElement | number | string): BlessedElement

    /**
     * Set item to content.
     */
    setItem(child: BlessedElement, content: BlessedElement | string): void

    /**
     * Remove and insert items to the list.
     */
    spliceItem(i: number, n: number, ...items: BlessedElement[]): void

    /**
     * Clears all items from the list.
     */
    clearItems(): void

    /**
     * Sets the list items to multiple strings.
     */
    setItems(items: BlessedElement[] | string[]): void

    /**
     * Returns the item index from the list. Child can be an element, index, or string.
     */
    getItemIndex(child: BlessedElement): number

    /**
     * Select an index of an item.
     */
    select(index: number): void

    /**
     * Select item based on current offset.
     */
    move(offset: number): void

    /**
     * Select item above selected.
     */
    up(amount?: number): void

    /**
     * Select item below selected.
     */
    down(amount?: number): void

    /**
     * Show/focus list and pick an item. The callback is executed with the result.
     */
    pick(callback: () => void): void

    /**
     * Find an item based on its text content.
     */
    fuzzyFind(arg: string | RegExp | (() => void)): void

    on(event: string, listener: (...args: any[]) => void): this
    /**
     * Emitted when the user presses `enter` on the current select item or clicks an item.
     *
     * If you need react when the user select the items just moving the arrows use `on('select item')`.
     */
    on(event: 'select', callback: (item: BoxElement, index: number) => void): this
    on(event: ListElementEventType, callback: (value: string) => void): this // TODO: callback
    /**
     * Emitted when the user moves the arrows to scroll the list items.
     *
     * This will executes a lots of times in small intervals of time so make sure your call backs are fast.
     *
     * If you need to do some havy processing probably is better touse `on('select')` event instead (since is triggered only when the user presses `enter`)
     */
    on(event: 'select item', callback: (item: BlessedElement, index: number) => void): this
  }

  interface FileManagerOptions extends ListOptions<ListElementStyle> {
    /**
     * Current working directory.
     */
    cwd?: string
  }

  class FileManagerElement extends ListElement implements IHasOptions<FileManagerOptions> {
    constructor(opts: FileManagerOptions)

    /**
     * Original options object.
     */
    options: FileManagerOptions

    /**
     * Current working directory.
     */
    cwd: string

    /**
     * Refresh the file list (perform a readdir on cwd and update the list items).
     */
    refresh(cwd: string, callback: () => void): void
    refresh(callback?: () => void): void

    /**
     * Pick a single file and return the path in the callback.
     */
    pick(cwd: string, callback: (err?: any, file?: string) => void): void
    pick(callback: (err?: any, file?: string) => void): void

    /**
     * Reset back to original cwd.
     */
    reset(cwd: string, callback: () => void): void
    reset(callback?: () => void): void

    on(event: string, listener: (...args: any[]) => void): this
    /** Received when an item is selected. */
    on(event: 'cd', callback: (file: string, cwd: string) => void): this
    /** Received when an item is selected. */
    on(event: 'file', callback: (file: string) => void): this
    on(event: 'error', callback: (err: any, file: string) => void): this
    on(event: 'refresh', callback: () => void): this
  }

  interface StyleListTable extends ListElementStyle {
    /**
     * Header style.
     */
    header?: any

    /**
     * Cell style.
     */
    cell?: any
  }

  interface ListTableOptions extends ListOptions<StyleListTable> {
    /**
     * Array of array of strings representing rows.
     */
    rows?: string[]
    data?: string[][]

    /**
     * Spaces to attempt to pad on the sides of each cell. 2 by default: one space on each side
     * (only useful if the width is shrunken).
     */
    pad?: number

    /**
     * Do not draw inner cells.
     */
    noCellBorders?: boolean

    // style?: StyleListTable

    // style?: Widgets.Types.TStyle
  }

  class ListTableElement extends ListElement implements IHasOptions<ListTableOptions> {
    constructor(opts: ListTableOptions)

    /**
     * Original options object.
     */
    options: ListTableOptions

    /**
     * Set rows in table. Array of arrays of strings.
     * @example:
     *
     * table.setData([
     *      [ 'Animals',  'Foods'  ],
     *      [ 'Elephant', 'Apple'  ],
     *      [ 'Bird',     'Orange' ]
     *  ]);
     */
    setRows(rows: string[][]): void

    /**
     * Set rows in table. Array of arrays of strings.
     * @example:
     *
     * table.setData([
     *      [ 'Animals',  'Foods'  ],
     *      [ 'Elephant', 'Apple'  ],
     *      [ 'Bird',     'Orange' ]
     *  ]);
     */
    setData(rows: string[][]): void
  }

  interface ListbarOptions extends BoxOptions {
    style?: ListElementStyle

    /**
     * Set buttons using an object with keys as titles of buttons, containing of objects
     * containing keys of keys and callback.
     */
    commands: (Types.ListbarCommand[]) | ({ [name: string]: Types.ListbarCommand }) | { [name: string]: () => void }
    items?: Types.ListbarCommand[]

    /**
     * Automatically bind list buttons to keys 0-9.
     */
    autoCommandKeys?: boolean
  }

  class ListbarElement extends BoxElement implements IHasOptions<ListbarOptions> {
    constructor(opts: ListbarOptions)

    /**
     * Original options object.
     */
    options: ListbarOptions

    /**
     * Set commands (see commands option above).
     */
    setItems(commands: Types.ListbarCommand[]): void

    /**
     * Append an item to the bar.
     */
    add(item: Types.ListbarCommand, callback: () => void): void

    /**
     * Append an item to the bar.
     */
    addItem(item: Types.ListbarCommand, callback: () => void): void

    /**
     * Append an item to the bar.
     */
    appendItem(item: Types.ListbarCommand, callback: () => void): void

    /**
     * Select an item on the bar.
     */
    select(offset: number): void

    /**
     * Remove item from the bar.
     */
    removeItem(child: BlessedElement): void

    /**
     * Move relatively across the bar.
     */
    move(offset: number): void

    /**
     * Move left relatively across the bar.
     */
    moveLeft(offset: number): void

    /**
     * Move right relatively across the bar.
     */
    moveRight(offset: number): void

    /**
     * Select button and execute its callback.
     */
    selectTab(index: number): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'set items' | 'remove item' | 'select tab', callback: () => void): this
  }

  interface FormOptions extends BoxOptions {
    /**
     * Allow default keys (tab, vi keys, enter).
     */
    keys?: any

    /**
     * Allow vi keys.
     */
    vi?: boolean
  }

  class FormElement<TFormData = any> extends BoxElement implements IHasOptions<FormOptions> {
    constructor(opts: FormOptions)

    /**
     * Original options object.
     */
    options: FormOptions

    /**
     * Last submitted data.
     */
    submission: TFormData

    /**
     * Focus next form element.
     */
    focusNext(): void

    /**
     * Focus previous form element.
     */
    focusPrevious(): void

    /**
     * Submit the form.
     */
    submit(): void

    /**
     * Discard the form.
     */
    cancel(): void

    /**
     * Clear the form.
     */
    reset(): void

    on(event: string, listener: (this: FormElement, ...args: any[]) => void): this
    /** Form is submitted. Receives a data object. */
    on(event: 'submit', callback: (this: FormElement, out: TFormData) => void): this
    on(event: 'cancel' | 'reset', callback: (this: FormElement) => void): this
  }

  interface InputOptions extends BoxOptions {
    /**
     * Initial value.
     */
    value?: string
  }

  abstract class InputElement extends BoxElement {
    constructor(opts: InputOptions)
  }

  /**
   * A box which allows multiline text input.
   */
  interface TextareaOptions extends InputOptions {
    /**
     * Call readInput() when the element is focused. Automatically unfocus.
     */
    inputOnFocus?: boolean
  }

  type TextareaElementEventType =
    /** Value is an error. */
    | 'error'
    /** Value is submitted (enter). */
    | 'submit'
    /** Value is discared (escape). */
    | 'cancel'
    /** Either submit or cancel. */
    | 'action'

  class TextareaElement extends InputElement implements IHasOptions<TextareaOptions> {
    constructor(opts: TextareaOptions)

    /**
     * Original options object.
     */
    options: TextareaOptions

    /**
     * The input text. read-only.
     */
    value: string

    /**
     * Is it currently capturing user input keys ? @internal
     */
    _reading: boolean

    /**
     * Listener that receives key events. Could be overrided to customize the behavior. @internal
     */
    _listener?: KeyEventListener

    /**
     * Called when reading input has finished which happens when the user blur or closes editor. @internal
     */
    _done?: (err: Error | undefined, value: string) => void

    /**
     * Submit the textarea (emits submit).
     */
    submit(): void

    /**
     * Cancel the textarea (emits cancel).
     */
    cancel(): void

    /**
     * Grab key events and start reading text from the keyboard. Takes a callback which receives
     * the final value.
     */
    readInput(callback?: (err: any, value?: string) => void): void

    /**
     * Grab key events and start reading text from the keyboard. Takes a callback which receives
     * the final value.
     */
    input(callback: (err: any, value?: string) => void): void

    /**
     * Grab key events and start reading text from the keyboard. Takes a callback which receives
     * the final value.
     */
    setInput(callback: (err: any, value?: string) => void): void

    /**
     * Open text editor in $EDITOR, read the output from the resulting file. Takes a callback which
     * receives the final value.
     */
    readEditor(callback: (err: any, value?: string) => void): void

    /**
     * Open text editor in $EDITOR, read the output from the resulting file. Takes a callback which
     * receives the final value.
     */
    editor(callback: (err: any, value?: string) => void): void

    /**
     * Open text editor in $EDITOR, read the output from the resulting file. Takes a callback which
     * receives the final value.
     */
    setEditor(callback: (err: any, value?: string) => void): void

    /**
     * The same as this.value, for now.
     */
    getValue(): string

    /**
     * Clear input.
     */
    clearValue(): void

    /**
     * Set value.
     */
    setValue(text: string): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'error', callback: (err: any) => void): this
    on(event: 'submit', callback: (value: string) => void): this
    on(event: 'action', callback: (value: string) => void): this

    on(event: 'cancel', callback: (value: string) => void): this
  }

  interface TextboxOptions extends TextareaOptions {
    /**
     * Completely hide text.
     */
    secret?: boolean

    /**
     * Replace text with asterisks (*).
     */
    censor?: boolean
  }

  class TextboxElement extends TextareaElement implements IHasOptions<TextboxOptions> {
    constructor(opts: TextboxOptions)

    /**
     * Original options object.
     */
    options: TextboxOptions

    /**
     * Completely hide text.
     */
    secret: boolean

    /**
     * Replace text with asterisks (*).
     */
    censor: boolean
  }

  interface ButtonOptions extends BoxOptions {}

  class ButtonElement extends InputElement implements IHasOptions<ButtonOptions> {
    constructor(opts: ButtonOptions)

    /**
     * Original options object.
     */
    options: ButtonOptions

    /**
     * Press button. Emits press.
     */
    press(): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'press', callback: () => void): this
  }

  interface CheckboxOptions extends BoxOptions {
    /**
     * whether the element is checked or not.
     */
    checked?: boolean

    // /**
    //  * enable mouse support.
    //  */
    // mouse?: boolean
  }

  /**
   * A checkbox which can be used in a form element.
   */
  class CheckboxElement extends InputElement implements IHasOptions<CheckboxOptions> {
    constructor(options?: CheckboxOptions)

    /**
     * Original options object.
     */
    options: CheckboxOptions

    /**
     * the text next to the checkbox (do not use setcontent, use `check.text = ''`).
     */
    text: string

    /**
     * whether the element is checked or not.
     */
    checked: boolean

    /**
     * same as `checked`.
     */
    value: boolean

    /**
     * check the element.
     */
    check(): void

    /**
     * uncheck the element.
     */
    uncheck(): void

    /**
     * toggle checked state.
     */
    toggle(): void

    on(event: string, listener: (this: CheckboxElement, ...args: any[]) => void): this
    on(event: 'check', callback: (this: CheckboxElement) => void): this
    on(event: 'uncheck', callback: (this: CheckboxElement) => void): this
  }

  interface RadioSetOptions extends BoxOptions {}

  /**
   * An element wrapping RadioButtons. RadioButtons within this element will be mutually exclusive
   * with each other.
   */
  abstract class RadioSetElement extends BoxElement {
    constructor(opts: RadioSetOptions)
  }

  interface RadioButtonOptions extends CheckboxOptions {}

  /**
   * A radio button which can be used in a form element.
   */
  abstract class RadioButtonElement extends CheckboxElement {
    constructor(opts: RadioButtonOptions)
  }

  interface PromptOptions extends BoxOptions {}

  /**
   * A prompt box containing a text input, okay, and cancel buttons (automatically hidden).
   */
  class PromptElement extends BoxElement implements IHasOptions<PromptOptions> {
    constructor(opts: PromptOptions)

    options: PromptOptions

    /**
     * Show the prompt and wait for the result of the textbox. Set text and initial value.
     */
    input(text: string, value: string, callback: (err: any, value: string) => void): void
    setInput(text: string, value: string, callback: (err: any, value: string) => void): void
    readInput(text: string, value: string, callback: (err: any, value: string) => void): void
  }

  interface QuestionOptions extends BoxOptions {}

  /**
   * A question box containing okay and cancel buttons (automatically hidden).
   */
  class QuestionElement extends BoxElement implements IHasOptions<QuestionOptions> {
    constructor(opts: QuestionOptions)

    options: QuestionOptions

    /**
     * Ask a question. callback will yield the result.
     */
    ask(question: string, callback: (err: any, value: string) => void): void
  }

  interface MessageOptions extends BoxOptions {}

  /**
   * A box containing a message to be displayed (automatically hidden).
   */
  class MessageElement extends BoxElement implements IHasOptions<MessageOptions> {
    constructor(opts: MessageOptions)

    options: MessageOptions

    /**
     * Display a message for a time (default is 3 seconds). Set time to 0 for a
     * perpetual message that is dismissed on keypress.
     */
    log(text: string, time: number, callback: (err: any) => void): void
    log(text: string, callback: (err: any) => void): void
    display(text: string, time: number, callback: (err: any) => void): void
    display(text: string, callback: (err: any) => void): void

    /**
     * Display an error in the same way.
     */
    error(text: string, time: number, callback: () => void): void
    error(text: string, callback: () => void): void
  }

  interface LoadingOptions extends BoxOptions {}

  /**
   * A box with a spinning line to denote loading (automatically hidden).
   */
  class LoadingElement extends BoxElement implements IHasOptions<LoadingOptions> {
    constructor(opts: LoadingOptions)

    options: LoadingOptions

    /**
     * Display the loading box with a message. Will lock keys until stop is called.
     */
    load(text: string): void

    /**
     * Hide loading box. Unlock keys.
     */
    stop(): void
  }

  interface ProgressBarOptions extends BoxOptions {
    /**
     * can be `horizontal` or `vertical`.
     */
    orientation: string

    /**
     * the character to fill the bar with (default is space).
     */
    pch: string

    /**
     * the amount filled (0 - 100).
     */
    filled: number

    /**
     * same as `filled`.
     */
    value: number

    /**
     * enable key support.
     */
    keys: boolean

    /**
     * enable mouse support.
     */
    mouse: boolean
  }

  /**
   * A progress bar allowing various styles. This can also be used as a form input.
   */
  class ProgressBarElement extends InputElement implements IHasOptions<ProgressBarOptions> {
    constructor(options?: ProgressBarOptions)

    options: ProgressBarOptions

    /**
     * progress the bar by a fill amount.
     */
    progress(amount: number): void

    /**
     * set progress to specific amount.
     */
    setProgress(amount: number): void

    /**
     * reset the bar.
     */
    reset(): void

    on(event: string, listener: (...args: any[]) => void): this
    on(event: 'reset' | 'complete', callback: () => void): this
  }

  interface LogOptions extends ScrollableTextOptions {
    /**
     * amount of scrollback allowed. default: Infinity.
     */
    scrollback?: number

    /**
     * scroll to bottom on input even if the user has scrolled up. default: false.
     */
    scrollOnInput?: boolean
  }

  /**
   * A log permanently scrolled to the bottom.
   */
  class Log extends ScrollableTextElement implements IHasOptions<LogOptions> {
    constructor(options?: LogOptions)

    options: LogOptions

    /**
     * amount of scrollback allowed. default: Infinity.
     */
    scrollback: number

    /**
     * scroll to bottom on input even if the user has scrolled up. default: false.
     */
    scrollOnInput: boolean

    /**
     * add a log line.
     */
    log(text: string): void

    /**
     * add a log line.
     */
    add(text: string): void
  }

  interface TableOptions extends BoxOptions {
    /**
     * array of array of strings representing rows (same as `data`).
     */
    rows?: string[][]

    /**
     * array of array of strings representing rows (same as `rows`).
     */
    data?: string[][]

    /**
     * spaces to attempt to pad on the sides of each cell. `2` by default: one space on each side (only useful if the width is shrunken).
     */
    pad?: number

    /**
     * do not draw inner cells.
     */
    noCellBorders?: boolean

    /**
     * fill cell borders with the adjacent background color.
     */
    fillCellBorders?: boolean
  }

  /**
   * A stylized table of text elements.
   */
  class TableElement extends BoxElement implements IHasOptions<TableOptions> {
    constructor(opts: TableOptions)

    options: TableOptions

    /**
     * set rows in table. array of arrays of strings.
     */
    setData(rows: string[][]): void

    /**
     * set rows in table. array of arrays of strings.
     */
    setRows(rows: string[][]): void
  }

  interface TerminalOptions extends BoxOptions {
    /**
     * handler for input data.
     */
    handler?(userInput: Buffer): void

    term?: string
    /**
     * name of shell. $SHELL by default.
     */
    shell?: string

    /**
     * args for shell.
     */
    args?: any

    /**
     * can be line, underline, and block.
     */
    cursor?: 'line' | 'underline' | 'block'

    terminal?: string

    cursorBlink?: boolean

    screenKeys?: boolean
    /**
     * Object for process env.
     */
    env?: any
  }

  class TerminalElement extends BoxElement implements IHasOptions<TerminalOptions> {
    constructor(opts: TerminalOptions)

    options: TerminalOptions

    /**
     * reference to the headless term.js terminal.
     */
    term: any

    /**
     * reference to the pty.js pseudo terminal.
     */
    pty: any

    /**
     * write data to the terminal.
     */
    write(data: string): void

    /**
     * nearly identical to `element.screenshot`, however, the specified region includes the terminal's
     * _entire_ scrollback, rather than just what is visible on the screen.
     */
    screenshot(xi?: number, xl?: number, yi?: number, yl?: number): string
  }

  interface ImageOptions extends BoxOptions {
    /**
     * path to image.
     */
    file: string

    /**
     * path to w3mimgdisplay. if a proper w3mimgdisplay path is not given, blessed will search the
     * entire disk for the binary.
     */
    type: 'ansi' | 'overlay' | 'w3m'
  }

  /**
   * Display an image in the terminal (jpeg, png, gif) using w3mimgdisplay. Requires w3m to be installed.
   * X11 required: works in xterm, urxvt, and possibly other terminals.
   */
  class ImageElement extends BoxElement implements IHasOptions<ImageOptions> {
    constructor(options?: ImageOptions)

    options: ImageOptions
  }

  interface ANSIImageOptions extends BoxOptions {
    /**
     * URL or path to PNG/GIF file. Can also be a buffer.
     */
    file: string

    /**
     * Scale cellmap down (0-1.0) from its original pixel width/height (Default: 1.0).
     */
    scale: number

    /**
     * This differs from other element's width or height in that only one
     * of them is needed: blessed will maintain the aspect ratio of the image
     * as it scales down to the proper number of cells. NOTE: PNG/GIF's are
     * always automatically shrunken to size (based on scale) if a width or
     * height is not given.
     */
    width: number | string
    height: number | string

    /**
     * Add various "density" ASCII characters over the rendering to give the
     * image more detail, similar to libcaca/libcucul (the library mplayer uses
     * to display videos in the terminal).
     */
    ascii: string

    /**
     * Whether to animate if the image is an APNG/animating GIF. If false, only
     * display the first frame or IDAT (Default: true).
     */
    animate: boolean

    /**
     * Set the speed of animation. Slower: 0.0-1.0. Faster: 1-1000. It cannot go
     * faster than 1 frame per millisecond, so 1000 is the fastest. (Default: 1.0)
     */
    speed: number

    /**
     * mem or cpu. If optimizing for memory, animation frames will be rendered to
     * bitmaps as the animation plays, using less memory. Optimizing for cpu will
     * precompile all bitmaps beforehand, which may be faster, but might also OOM
     * the process on large images. (Default: mem).
     */
    optimization: 'mem' | 'cpu'
  }

  /**
   * Convert any .png file (or .gif, see below) to an ANSI image and display it as an element.
   */
  class ANSIImageElement extends BoxElement implements IHasOptions<ANSIImageOptions> {
    constructor(options?: ANSIImageOptions)

    options: ANSIImageOptions

    /**
     * Image object from the png reader.
     */
    img: Types.TImage

    /**
     * set the image in the box to a new path.
     */
    setImage(img: string, callback: () => void): void

    /**
     * clear the current image.
     */
    clearImage(callback: () => void): void

    /**
     * Play animation if it has been paused or stopped.
     */
    play(): void

    /**
     * Pause animation.
     */
    pause(): void

    /**
     * Stop animation.
     */
    stop(): void
  }

  interface OverlayImageOptions extends BoxOptions {
    /**
     * Path to image.
     */
    file: string

    /**
     * Render the file as ANSI art instead of using w3m to overlay Internally uses the
     * ANSIImage element. See the ANSIImage element for more information/options. (Default: true).
     */
    ansi: boolean

    /**
     * Path to w3mimgdisplay. If a proper w3mimgdisplay path is not given, blessed will
     * search the entire disk for the binary.
     */
    w3m: string

    /**
     * Whether to search /usr, /bin, and /lib for w3mimgdisplay (Default: true).
     */
    search: string
  }

  /**
   * Convert any .png file (or .gif, see below) to an ANSI image and display it as an element.
   */
  class OverlayImageElement extends BoxElement implements IHasOptions<OverlayImageOptions> {
    constructor(options?: OverlayImageOptions)

    options: OverlayImageOptions

    /**
     * set the image in the box to a new path.
     */
    setImage(img: string, callback: () => void): void

    /**
     * clear the current image.
     */
    clearImage(callback: () => void): void

    /**
     * get the size of an image file in pixels.
     */
    imageSize(img: string, callback: () => void): void

    /**
     * get the size of the terminal in pixels.
     */
    termSize(callback: () => void): void

    /**
     * get the pixel to cell ratio for the terminal.
     */
    getPixelRatio(callback: () => void): void
  }

  interface VideoOptions extends BoxOptions {
    /**
     * Video to play.
     */
    file: string

    /**
     * Start time in seconds.
     */
    start: number
  }

  class VideoElement extends BoxElement implements IHasOptions<VideoOptions> {
    constructor(options?: VideoOptions)

    options: VideoOptions

    /**
     * The terminal element running mplayer or mpv.
     */
    tty: any
  }

  export type LayoutIterator = (
    el: { shrink: boolean; position: { left: number; top: number }; width: number; height: number } & BlessedElement,
    i: number
  ) => any
  interface LayoutOptions extends ElementOptions {
    /**
     * A callback which is called right before the children are iterated over to be rendered. Should return an
     * iterator callback which is called on each child element: iterator(el, i).
     */
    renderer?(this: LayoutElement, coords: PositionCoords, i: number | undefined): LayoutIterator
    /**
     * Using the default renderer, it provides two layouts: inline, and grid. inline is the default and will render
     * akin to inline-block. grid will create an automatic grid based on element dimensions. The grid cells'
     * width and height are always determined by the largest children in the layout.
     */
    layout?: 'inline' | 'inline-block' | 'grid'
  }

  class LayoutElement extends BlessedElement implements IHasOptions<LayoutOptions> {
    constructor(options?: LayoutOptions)

    options: LayoutOptions

    /**
     * A callback which is called right before the children are iterated over to be rendered. Should return an
     * iterator callback which is called on each child element: iterator(el, i).
     */
    renderer(coords: PositionCoords, i: number | undefined): void

    /**
     * Check to see if a previous child element has been rendered and is visible on screen. This is only useful
     * for checking child elements that have already been attempted to be rendered! see the example below.
     */
    isRendered(el: BlessedElement): boolean

    /**
     * Get the last rendered and visible child element based on an index. This is useful for basing the position
     * of the current child element on the position of the last child element.
     */
    getLast(i: number): BlessedElement

    /**
     * Get the last rendered and visible child element coords based on an index. This is useful for basing the position
     * of the current child element on the position of the last child element. See the example below.
     */
    getLastCoords(i: number): PositionCoords
  }

  class Program {
    /**
     * Wrap the given text in terminal formatting codes corresponding to the given attribute
     * name. The `attr` string can be of the form `red fg` or `52 bg` where `52` is a 0-255
     * integer color number.
     */
    text(text: string, attr: string): string
  }
}

// publish classes on existin gpaths so users can reference the real values for extending
export namespace widget {
  class Node extends Widgets.Node {}
  class Element<Options extends Widgets.ElementOptions = Widgets.ElementOptions> extends Widgets.BlessedElement<
    Options
  > {}
  class Box extends Widgets.BoxElement {}
  class List extends Widgets.ListElement {}
  class Screen extends Widgets.Screen {}
  class Text<Options extends Widgets.TextOptions = Widgets.TextOptions> extends Widgets.TextElement<Options> {}
  class Line extends Widgets.LineElement {}
  class BigText extends Widgets.BigTextElement {}
  class FileManager extends Widgets.FileManagerElement {}
  class ListTable extends Widgets.ListTableElement {}
  class Listbar extends Widgets.ListbarElement {}
  class Form extends Widgets.FormElement {}
  class Input extends Widgets.InputElement {}
  class Textarea extends Widgets.TextareaElement {}
  class Textbox extends Widgets.TextboxElement {}
  class Button extends Widgets.ButtonElement {}
  class Checkbox extends Widgets.CheckboxElement {}
  class RadioSet extends Widgets.RadioSetElement {}
  class RadioButton extends Widgets.RadioButtonElement {}
  class Table extends Widgets.TableElement {}
  class Prompt extends Widgets.PromptElement {}
  class Question extends Widgets.QuestionElement {}
  class Message extends Widgets.MessageElement {}
  class Loading extends Widgets.LoadingElement {}
  class Log extends Widgets.Log {}
  class ProgressBar extends Widgets.ProgressBarElement {}
  class Terminal extends Widgets.TerminalElement {}
  class Layout extends Widgets.LayoutElement {}
}

/** @inheritdoc */
export function screen(options?: Widgets.IScreenOptions): Widgets.Screen
export function box(options?: Widgets.BoxOptions): Widgets.BoxElement
export function text(options?: Widgets.TextOptions): Widgets.TextElement
export function line(options?: Widgets.LineOptions): Widgets.LineElement
export function scrollablebox(options?: Widgets.BoxOptions): Widgets.BoxElement
export function scrollabletext(options?: Widgets.BoxOptions): Widgets.BoxElement
export function bigtext(options?: Widgets.BigTextOptions): Widgets.BigTextElement
export function list(options?: Widgets.ListOptions<Widgets.ListElementStyle>): Widgets.ListElement
export function filemanager(options?: Widgets.FileManagerOptions): Widgets.FileManagerElement
export function listtable(options?: Widgets.ListTableOptions): Widgets.ListTableElement
export function listbar(options?: Widgets.ListbarOptions): Widgets.ListbarElement
export function form<TFormData>(options?: Widgets.FormOptions): Widgets.FormElement<TFormData>
export function input(options?: Widgets.InputOptions): Widgets.InputElement
export function textarea(options?: Widgets.TextareaOptions): Widgets.TextareaElement
export function textbox(options?: Widgets.TextboxOptions): Widgets.TextboxElement
export function button(options?: Widgets.ButtonOptions): Widgets.ButtonElement
export function checkbox(options?: Widgets.CheckboxOptions): Widgets.CheckboxElement
export function radioset(options?: Widgets.RadioSetOptions): Widgets.RadioSetElement
export function radiobutton(options?: Widgets.RadioButtonOptions): Widgets.RadioButtonElement
export function table(options?: Widgets.TableOptions): Widgets.TableElement
export function prompt(options?: Widgets.PromptOptions): Widgets.PromptElement
export function question(options?: Widgets.QuestionOptions): Widgets.QuestionElement
export function message(options?: Widgets.MessageOptions): Widgets.MessageElement
export function loading(options?: Widgets.LoadingOptions): Widgets.LoadingElement
export function log(options?: Widgets.LogOptions): Widgets.Log
export function progressbar(options?: Widgets.ProgressBarOptions): Widgets.ProgressBarElement
export function program(options?: Widgets.IScreenOptions): BlessedProgram
export function terminal(options?: Widgets.TerminalOptions): Widgets.TerminalElement
export function layout(options?: Widgets.LayoutOptions): Widgets.LayoutElement
export function escape(item: any): any

type ColorRgb = [number, number, number]
export const colors: {
  /**
   * Match given color in a high level form (like rgb or hex expression) with a terminal color number
   * interpolatingg to a similar color.
   */
  match(r1: Widgets.Color | ColorRgb, g1?: number, b1?: number): number
  convert(color: Widgets.Color): number
  mixColors(c1: number, c2: number, alpha: number): number
  RGBToHex(r: number, g: number, b: number): string
  RGBToHex(hex: string): ColorRgb
  blend(attr: number, attr2?: number, alpha?: number): number
  /**
 Seed all 256 colors. Assume xterm defaults.
 Ported from the xterm color generation script. */
  colors(): number[]
  /**  Map higher colors to the first 8 colors.
 This allows translation of high colors to low colors on 8-color terminals. */
  ccolors(): number[]

  colorNames: {
    black: 0
    red: 1
    green: 2
    yellow: 3
    blue: 4
    magenta: 5
    cyan: 6
    white: 7
    // light
    lightblack: 8
    lightred: 9
    lightgreen: 10
    lightyellow: 11
    lightblue: 12
    lightmagenta: 13
    lightcyan: 14
    lightwhite: 15
    // bright
    brightblack: 8
    brightred: 9
    brightgreen: 10
    brightyellow: 11
    brightblue: 12
    brightmagenta: 13
    brightcyan: 14
    brightwhite: 15
    // alternate spellings
    grey: 8
    gray: 8
    lightgrey: 7
    lightgray: 7
    brightgrey: 7
    brightgray: 7
  }
}

export const unicode: Unicode

/**
 * Unicode utilities, see [[Screen#fullUnicode]]. Wide, Surrogates, and Combining.
 */
interface Unicode {
  fromCodePoint(unicode: number): string

  charWidth(str: string, i?: number): string

  /**
   * Gets given string width.
   */
  strWidth(str: string): number

  isSurrogate(str: string, i?: number): boolean

  combiningTable: number[][]

  /**
   * Regexps
   */
  chars: {
    /**
     * All surrogate pair wide chars.
     */
    wide: RegExp

    /**
     * All wide chars including surrogate pairs.
     */
    all: RegExp

    /**
     * Regex to detect a surrogate pair.
     */
    surrogate: RegExp
    /**
     * Regex to find combining characters.
     */
    combining: RegExp
  }
}

//TODO

// Helpers
// All helpers reside on blessed.helpers or blessed.
interface Helpers {
  // merge(a, b) - Merge objects a and b into object a.
  // asort(obj) - Sort array alphabetically by name prop.
  // hsort(obj) - Sort array numerically by index prop.
  // findFile(start, target) - Find a file at start directory with name target.
  // escape(text) - Escape content's tags to be passed into el.setContent(). Example: box.setContent('escaped tag: ' + blessed.escape('{bold}{/bold}'));
  // parseTags(text) -
  /** Parse tags into SGR escape codes. */
  /**Generate text tags based on style object. */
  generateTags(style: Widgets.Types.TStyle, text: string): string
  /**Convert style attributes to binary format. */
  attrToBinary(style: Widgets.Types.TStyle, element: Widgets.BlessedElement): number
  /**
   * Strip text of tags and SGR sequences.
   */
  stripTags(text: string): string
  // cleanTacgs(text) - Strip text of tags, SGR escape code, and leading/trailing whitespace.
  // dropUniode(text) - Drop text of any >U+FFFF characters.
}

export const helpers: Helpers

/**  terminfo/cap aliases for blessed. */
