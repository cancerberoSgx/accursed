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
import { Readable, Writable } from 'stream'

/**
 * A general representation of the data object received callbacks  of program's write operation  on the output.
 *
 *  In general, each event type will respond with a data object that is mixed into this data object properties, and also is available individually in some of its properties, For example a  'device-status' request will respond with a 'statis property with only that information but also the properties mixed in the object itself'
 */
interface ProgramResponseData {
  /** The event type that was requested / write that caused this response. Example: 'window-manipulation',  'device-attributes', 'device-status',  */
  event: string
  /** example: '', 'DSR' */
  code: string
  /** Identifies the request type that caused this response. For example, if a  'window-manipulation' is written the response type could be 'textarea-size',  example: 'textarea-size',  'cursor-status', */
  type: string
  size?: { height: number; width: number }
  height?: number
  width?: number
  status?: { x?: number; y: number; page?: number }
  page?: any
  x?: number
  y?: number
  cursor?: { x: 1; y: 1; page: undefined }
  textAreaSizeCharacters?: { height: number; width: number }

  // TODO leave the object open since it has lots of combinations
  [k: string]: any
}

type ProgramResponseCallback = (this: BlessedProgram, err: Error, data: ProgramResponseData) => any

/** program.output Writable implementation should implement this interface */
interface ProgramOutput extends Writable {
  isTTY?: boolean
  column: number
  rows: number
  // on(e: 'resize', callback: () => void): this
  // /**
  //  * Each time
  //  * @internal.
  //  */
  // on(e: 'response', callback: (e: { event?: string }) => void): this
  // on(e: string, callback: (...args: any[]) => void): this
}
interface GpmEvent {
  name: 'mouse' | ''
  type: 'GPM'
  action:
    | Widgets.Types.TMouseAction
    | 'mousedown'
    | 'mouseup'
    | 'connect'
    | 'mousewheel'
    | 'data'
    | 'move'
    | 'dragbtndown'
    | 'dblclick'
    | 'btnup'
    | 'click'
    | 'error'
  button: 'left' | 'middle' | 'right'
  raw: [number, number, number, number]
  x: number
  y: number
  shift: boolean
  meta: boolean
  ctrl: boolean
}

interface GpmClient extends EventEmitter {
  on(e: 'move', c: (buttons: any, modifiers: any, x: any, y: any) => void): this
  // TODO:
  // 'mousewheel',evnt.buttons, evnt.modifiers,                evnt.x, evnt.y, evnt.wdx, evnt.wdy);
  // 'drag', evnt.buttons, evnt.modifiers, evnt.x, evnt.y);
  // 'mousewheel',               evnt.buttons, evnt.modifiers,                evnt.x, evnt.y, evnt.wdx, evnt.wdy);
  // 'btndown', evnt.buttons, evnt.modifiers, evnt.x, evnt.y);
  // 'dblclick', evnt.buttons, evnt.modifiers, evnt.x, evnt.y);
  // 'btnup', evnt.buttons, evnt.modifiers, evnt.x, evnt.y);
  // self.emit('click', evnt.buttons, evnt.modifiers, evnt.x, evnt.y);
}

export interface IBlessedProgramOptions {
  input?: Readable
  output?: Writable
  /** path to a file where to write when screen.log() or program.log are called */
  log?: string
  dump?: boolean
  /** zero-based indexes for col, row values */
  zero?: boolean
  buffer?: boolean
  terminal?: string
  term?: string
  tput?: string
  debug?: boolean
  resizeTimeout?: boolean
}

/**
 * The Program instance manages the low level interaction the the terminal. It emit the basi native events to the screens. It has associated an [[output]] writable stream attribute which ussually is stdout but could could be conigured by the user using [[IBlessedProgramOptions]]. The same for an [[input]] Readable stream from which the host terminal respond to the program requests. 
 * 
 * The communication with the host system is mostly done writing  `tput` sequences to the [[output]] stream. The program is responsible of portability and supporting the same API thgouth several terminal standards / vendors 
 * 
 * Although the BlessedProgram instances are not Nodes (unlike Screens that are) they have a somwhat similar API, emiting events with similar names and has some simlar attributes, but it's important to known that most of these events and attributes refer to the host terminal window and not with the lines inside the screen. For example, focus or blur event refers to the terminal window focus, not the internal Blessed Element
 * 
 * In general users don't have to use the program for develop their applications, however, it can be accessed from the screen and its lower level api can be used along the application.

## Example 1

Starting a program alone, and register 'q' to exist
 ```
const program = blessed.program({
})
program.setMouse({
  allMotion: true,
}, true);
program.alternateBuffer()
program.enableMouse()
program.key(['q', 'escape', 'C-c'], function () {
  program.showCursor()
  program.disableMouse()
  program.normalBuffer()
  process.exit(0)
})
 ```

## Example 2: 

Registering for resize, blur, and focus terminal window native events:

```
program.setMouse({ sendFocus: true }, true)
program.on('resize', function (data) {
  setTimeout(function () {
    program.clear();
    program.cup(0, 0);
  }, 200);
});
process.on('SIGWINCH', function (data) {
  setTimeout(function () {
    program.cup(1, 0);
  }, 200);
});
program.on('focus', function (data) {
  program.clear();
  program.cup(0, 0);
});
program.on('blur', function (data) {
  program.clear();
  program.cup(0, 0);
});
```

## Example 3: 

Drawing on mouse move

```
program.setBackground('green', 'O')
program.setForeground('red', 'i')
program.on('mouse', function (data) {
  program.cup(data.y, data.x);
  program.write(' ', 'blue bg');
  program.write('as', 'red fg');
  program.cup(0, 0);
});
  ```

## Example 4

Setting the cursor style

```
program.showCursor();
program.setCursorStyle(1);
setTimeout(() => {
  program.setCursorStyle(2);
}, 9000);
setTimeout(() => {
  program.setCursorStyle(4);
}, 3000);
setTimeout(() => {
  program.setCursorStyle(3);
}, 6000);
```
## Example 5

Minimize / Maximize the terminal window and requesting it size and position and cursor

```
program.write('MINIMIZING IN 2 seconds')
setTimeout(() => {
  program.manipulateWindow(2, (err, data)=>{
    program.log(data);
  })
}, 2000)
setTimeout(() => {
  program.manipulateWindow(1, (err, data)=>{
    program.log(data);
  })
}, 4000)
program.getCursor(function(err, data) {
  program.write(util.inspect(data));
});
program.getWindowSize(function(err:any, data:any) {
  program.log('getWindowSize', data);
});
```
*/
declare class BlessedProgram extends EventEmitter {
  /** @internal */
  static instances: BlessedProgram[]
  /** @internal */
  gpm?: GpmClient

  type: string
  options: IBlessedProgramOptions
  input: Readable
  output: Writable
  /** zero-based indexes for col, row values */
  zero: boolean
  useBuffer: boolean
  x: number
  y: number
  savedX: number
  savedY: number
  cols: number
  rows: number
  scrollTop: number
  scrollBottom: number
  isOSXTerm: boolean
  isiTerm2: boolean
  isXFCE: boolean
  isTerminator: boolean
  isLXDE: boolean
  isVTE: boolean
  isRxvt: boolean
  isXterm: boolean
  tmux: boolean
  tmuxVersion: number
  isAlt: boolean

  constructor(options?: IBlessedProgramOptions)
  /** writes arguments to [[log]] file passed in options*/
  log(...args: any[]): boolean
  debug(s: string): boolean
  setupDump(): void
  setupTput(): void
  setTerminal(terminal: string): void
  /** Queries whether the terminal has the capability `name`. */
  has(name: string): boolean
  /** 	Queries whether the terminal of the type `is`. */
  term(is: string): boolean

  listen(): void
  destroy(): void

  key(key: string | string[], l: Widgets.KeyEventListener): void
  onceKey(key: string | string[], l: Widgets.KeyEventListener): void

  unKey(key: string | string[], l: Widgets.KeyEventListener): void
  removeKey(key: string | string[], l: Widgets.KeyEventListener): void

  bindMouse(): void
  enableGpm(): void
  disableGpm(): void
  bindResponse(): void

  response(name: string, text: string, callback: Function, noBypass?: boolean): boolean
  response(name: string, callback?: Function): boolean

  write(text: string): boolean
  /**
   * Writes to this.output
   * Example: `program.write('Hello world', 'blue fg')`
   */
  write(text: string, style: string): boolean
  /**
   * 	Flushes the buffer.
   */
  flush(): void
  /** 	Determines whether to include text attributes when writing. */
  print(text: string, attr?: boolean): boolean
  echo(text: string, attr?: boolean): boolean
  /** sets cursor  */
  setx(x: number): boolean
  sety(y: number): boolean
  move(x: number, y: number): boolean
  omove(x: number, y: number): void
  rsetx(x: number): boolean
  rsety(y: number): boolean
  rmove(x: number, y: number): void
  cursorCharAbsolute(x: number): number

  simpleInsert(ch: string, i?: number, attr?: boolean): boolean
  repeat(ch: string, i?: number): string
  copyToClipboard(text: string): boolean

  cursorShape(shape: 'block' | 'underline' | 'line', blink?: boolean): boolean
  cursorColor(color: string): boolean
  cursorReset(): boolean
  resetCursor(): boolean

  getTextParams(param: string, callback: Function): boolean
  /**
   * example call: 
   * 
   * ```
program.getCursor(function(err, data) {
  program.log('getCursor', data);
  program.write(util.inspect(data));
});
```
   */
  getCursorColor(callback: Function): boolean

  nul(): boolean

  bell(): boolean
  bel(): boolean

  vtab(): boolean

  form(): boolean
  ff(): boolean

  backspace(): boolean
  kbs(): boolean

  tab(): boolean
  ht(): boolean
  /** @internal  */
  _ncoords(): void
  shiftOut(): boolean
  shiftIn(): boolean

  return(): boolean
  cr(): boolean

  feed(): boolean
  newline(): boolean
  nl(): boolean

  index(): boolean
  ind(): boolean

  reverseIndex(): boolean
  reverse(): boolean
  ri(): boolean

  nextLine(): boolean
  reset(): boolean
  tabSet(): boolean

  saveCursor(key: string): boolean
  sc(key: string): boolean

  restoreCursor(key?: string, hide?: boolean): boolean
  rc(key?: string, hide?: boolean): boolean

  lsaveCursor(key?: string): void
  lrestoreCursor(key?: string, hide?: boolean): void

  lineHeight(): boolean

  charset(val?: string, level?: number): boolean

  enter_alt_charset_mode(): boolean
  as(): boolean
  smacs(): boolean

  exit_alt_charset_mode(): boolean
  ae(): boolean
  rmacs(): boolean

  setG(val: number): boolean

  setTitle(title: string): boolean

  resetColors(param?: string): boolean

  /**
   * OSC Ps ; Pt ST
   * OSC Ps ; Pt BEL
   * Change dynamic colors
   */
  dynamicColors(param?: string): boolean
  selData(a: string, b: string): boolean

  cursorUp(param?: number): boolean
  cuu(param?: number): boolean
  up(param?: number): boolean

  cursorDown(param?: number): boolean
  cud(param?: number): boolean
  down(param?: number): boolean

  cursorForward(param?: number): boolean
  cuf(param?: number): boolean
  right(param?: number): boolean
  forward(param?: number): boolean

  cursorBackward(param?: number): boolean
  cub(param?: number): boolean
  left(param?: number): boolean
  back(param?: number): boolean
  /**
   * CSI Ps ; Ps H
   * Cursor Position [ row;column ] (default = [ 1,1 ]) (CUP).
   */
  cursorPos(row?: number, col?: number): boolean
  /**
   * CSI Ps ; Ps H
   * Cursor Position [ row;column ] (default = [ 1,1 ]) (CUP).
   */
  cup(row?: number, col?: number): boolean
  /**
   * CSI Ps ; Ps H
   * Cursor Position [ row;column ] (default = [ 1,1 ]) (CUP).
   */
  pos(row?: number, col?: number): boolean

  eraseInDisplay(param?: string): boolean
  ed(param?: string): boolean

  clear(): boolean

  eraseInLine(param?: string): boolean
  el(param?: string): boolean

  /**
 CSI Pm m  Character Attributes (SGR).
     Ps = 0  -> Normal (default).
     Ps = 1  -> Bold.
     Ps = 4  -> Underlined.
     Ps = 5  -> Blink (appears as Bold).
     Ps = 7  -> Inverse.
     Ps = 8  -> Invisible, i.e., hidden (VT300).
     Ps = 2 2  -> Normal (neither bold nor faint).
     Ps = 2 4  -> Not underlined.
     Ps = 2 5  -> Steady (not blinking).
     Ps = 2 7  -> Positive (not inverse).
     Ps = 2 8  -> Visible, i.e., not hidden (VT300).
     Ps = 3 0  -> Set foreground color to Black.
     Ps = 3 1  -> Set foreground color to Red.
     Ps = 3 2  -> Set foreground color to Green.
     Ps = 3 3  -> Set foreground color to Yellow.
     Ps = 3 4  -> Set foreground color to Blue.
     Ps = 3 5  -> Set foreground color to Magenta.
     Ps = 3 6  -> Set foreground color to Cyan.
     Ps = 3 7  -> Set foreground color to White.
     Ps = 3 9  -> Set foreground color to default (original).
     Ps = 4 0  -> Set background color to Black.
     Ps = 4 1  -> Set background color to Red.
     Ps = 4 2  -> Set background color to Green.
     Ps = 4 3  -> Set background color to Yellow.
     Ps = 4 4  -> Set background color to Blue.
     Ps = 4 5  -> Set background color to Magenta.
     Ps = 4 6  -> Set background color to Cyan.
     Ps = 4 7  -> Set background color to White.
     Ps = 4 9  -> Set background color to default (original).

   If 16-color support is compiled, the following apply.  Assume
   that xterm's resources are set so that the ISO color codes are
   the first 8 of a set of 16.  Then the aixterm colors are the
   bright versions of the ISO colors:
     Ps = 9 0  -> Set foreground color to Black.
     Ps = 9 1  -> Set foreground color to Red.
     Ps = 9 2  -> Set foreground color to Green.
     Ps = 9 3  -> Set foreground color to Yellow.
     Ps = 9 4  -> Set foreground color to Blue.
     Ps = 9 5  -> Set foreground color to Magenta.
     Ps = 9 6  -> Set foreground color to Cyan.
     Ps = 9 7  -> Set foreground color to White.
     Ps = 1 0 0  -> Set background color to Black.
     Ps = 1 0 1  -> Set background color to Red.
     Ps = 1 0 2  -> Set background color to Green.
     Ps = 1 0 3  -> Set background color to Yellow.
     Ps = 1 0 4  -> Set background color to Blue.
     Ps = 1 0 5  -> Set background color to Magenta.
     Ps = 1 0 6  -> Set background color to Cyan.
     Ps = 1 0 7  -> Set background color to White.

   If xterm is compiled with the 16-color support disabled, it
   supports the following, from rxvt:
     Ps = 1 0 0  -> Set foreground and background color to
     default.

   If 88- or 256-color support is compiled, the following apply.
     Ps = 3 8  ; 5  ; Ps -> Set foreground color to the second
     Ps.
     Ps = 4 8  ; 5  ; Ps -> Set background color to the second
     Ps.
   */
  charAttributes(param: string, val?: string): boolean
  charAttributes(param: string[], val?: string): boolean

  /**
   * set the foreground color and character for the following writings to the output buffer. Example: 
  ```
program.setBackground('green', 'O')
program.setForeground('red', 'i')
program.on('mouse', function (data) {
  program.cup(data.y, data.x);
  program.write(' ', 'blue bg');
  program.write('as', 'red fg');
  program.cup(0, 0);
});
  ```
   */
  setForeground(color: string, val?: string): boolean
  /** @see setForeground  */
  fg(color: string, val?: boolean): string

  /**
   * set the background color and character for the following writings to the output buffer. Example:
  ```
program.setBackground('green', 'O')
program.setForeground('red', 'i')
program.on('mouse', function (data) {
  program.cup(data.y, data.x);
  program.write(' ', 'blue bg');
  program.write('as', 'red fg');
  program.cup(0, 0);
});
  ```
   */
  setBackground(color: string, val?: string): boolean
  /** @see setBackground  */
  bg(color: string, val?: string): boolean

  /**
```
CSI Ps n  Device Status Report (DSR).
    Ps = 5  -> Status Report.  Result (``OK'') is
  CSI 0 n
    Ps = 6  -> Report Cursor Position (CPR) [row;column].
  Result is
  CSI r ; c R
CSI ? Ps n
  Device Status Report (DSR, DEC-specific).
    Ps = 6  -> Report Cursor Position (CPR) [row;column] as CSI
    ? r ; c R (assumes page is zero).
    Ps = 1 5  -> Report Printer status as CSI ? 1 0  n  (ready).
    or CSI ? 1 1  n  (not ready).
    Ps = 2 5  -> Report UDK status as CSI ? 2 0  n  (unlocked)
    or CSI ? 2 1  n  (locked).
    Ps = 2 6  -> Report Keyboard status as
  CSI ? 2 7  ;  1  ;  0  ;  0  n  (North American).
  The last two parameters apply to VT400 & up, and denote key-
  board ready and LK01 respectively.
    Ps = 5 3  -> Report Locator status as
  CSI ? 5 3  n  Locator available, if compiled-in, or
  CSI ? 5 0  n  No Locator, if not.
```
   */
  deviceStatus(param?: string, callback?: ProgramResponseCallback, dec?: boolean, noBypass?: boolean): boolean
  /**@see deviceStatus */
  dsr(param?: string, callback?: Function, dec?: boolean, noBypass?: boolean): boolean

  /**
  Example Call:
  ```
  program.getCursor(function(err, data) {
    program.log('getCursor', data);
  });
  ```
   */
  getCursor(callback: ProgramResponseCallback): boolean
  saveReportedCursor(callback: ProgramResponseCallback): void

  restoreReportedCursor: () => boolean

  /** CSI Ps @
  Insert Ps (Blank) Character(s) (default = 1) (ICH). */
  insertChars(param?: number): boolean
  /** @see insertChars  */
  ich(param?: number): boolean

  /**
   * 
CSI Ps E
Cursor Next Line Ps Times (default = 1) (CNL).
same as CSI Ps B ?
   */
  cursorNextLine(param?: number): boolean
  /** @cursorNextLine */
  cnl(param?: number): boolean

  cursorPrecedingLine(param?: number): boolean
  cpl(param?: number): boolean

  cursorCharAbsolute(param?: number): boolean
  cha(param?: number): boolean

  insertLines(param?: number): boolean
  il(param?: number): boolean

  deleteLines(param?: number): boolean
  dl(param?: number): boolean

  deleteChars(param?: number): boolean
  dch(param?: number): boolean

  eraseChars(param?: number): boolean
  ech(param?: number): boolean

  charPosAbsolute(param?: number): boolean
  hpa(param?: number): boolean

  HPositionRelative(param?: number): boolean

  sendDeviceAttributes(param?: number, callback?: ProgramResponseCallback): boolean
  da(param?: number, callback?: Function): boolean

  linePosAbsolute(param?: number): boolean
  vpa(param?: number): boolean

  VPositionRelative(param?: number): boolean
  vpr(param?: number): boolean

  HVPosition(row?: number, col?: number): boolean
  hvp(row?: number, col?: number): boolean

  /**
  ```
 CSI Pm h  Set Mode (SM).
     Ps = 2  -> Keyboard Action Mode (AM).
     Ps = 4  -> Insert Mode (IRM).
     Ps = 1 2  -> Send/receive (SRM).
     Ps = 2 0  -> Automatic Newline (LNM).
 CSI ? Pm h
   DEC Private Mode Set (DECSET).
     Ps = 1  -> Application Cursor Keys (DECCKM).
     Ps = 2  -> Designate USASCII for character sets G0-G3
     (DECANM), and set VT100 mode.
     Ps = 3  -> 132 Column Mode (DECCOLM).
     Ps = 4  -> Smooth (Slow) Scroll (DECSCLM).
     Ps = 5  -> Reverse Video (DECSCNM).
     Ps = 6  -> Origin Mode (DECOM).
     Ps = 7  -> Wraparound Mode (DECAWM).
     Ps = 8  -> Auto-repeat Keys (DECARM).
     Ps = 9  -> Send Mouse X & Y on button press.  See the sec-
     tion Mouse Tracking.
     Ps = 1 0  -> Show toolbar (rxvt).
     Ps = 1 2  -> Start Blinking Cursor (att610).
     Ps = 1 8  -> Print form feed (DECPFF).
     Ps = 1 9  -> Set print extent to full screen (DECPEX).
     Ps = 2 5  -> Show Cursor (DECTCEM).
     Ps = 3 0  -> Show scrollbar (rxvt).
     Ps = 3 5  -> Enable font-shifting functions (rxvt).
     Ps = 3 8  -> Enter Tektronix Mode (DECTEK).
     Ps = 4 0  -> Allow 80 -> 132 Mode.
     Ps = 4 1  -> more(1) fix (see curses resource).
     Ps = 4 2  -> Enable Nation Replacement Character sets (DECN-
     RCM).
     Ps = 4 4  -> Turn On Margin Bell.
     Ps = 4 5  -> Reverse-wraparound Mode.
     Ps = 4 6  -> Start Logging.  This is normally disabled by a
     compile-time option.
     Ps = 4 7  -> Use Alternate Screen Buffer.  (This may be dis-
     abled by the titeInhibit resource).
     Ps = 6 6  -> Application keypad (DECNKM).
     Ps = 6 7  -> Backarrow key sends backspace (DECBKM).
     Ps = 1 0 0 0  -> Send Mouse X & Y on button press and
     release.  See the section Mouse Tracking.
     Ps = 1 0 0 1  -> Use Hilite Mouse Tracking.
     Ps = 1 0 0 2  -> Use Cell Motion Mouse Tracking.
     Ps = 1 0 0 3  -> Use All Motion Mouse Tracking.
     Ps = 1 0 0 4  -> Send FocusIn/FocusOut events.
     Ps = 1 0 0 5  -> Enable Extended Mouse Mode.
     Ps = 1 0 1 0  -> Scroll to bottom on tty output (rxvt).
     Ps = 1 0 1 1  -> Scroll to bottom on key press (rxvt).
     Ps = 1 0 3 4  -> Interpret "meta" key, sets eighth bit.
     (enables the eightBitInput resource).
     Ps = 1 0 3 5  -> Enable special modifiers for Alt and Num-
     Lock keys.  (This enables the numLock resource).
     Ps = 1 0 3 6  -> Send ESC   when Meta modifies a key.  (This
     enables the metaSendsEscape resource).
     Ps = 1 0 3 7  -> Send DEL from the editing-keypad Delete
     key.
     Ps = 1 0 3 9  -> Send ESC  when Alt modifies a key.  (This
     enables the altSendsEscape resource).
     Ps = 1 0 4 0  -> Keep selection even if not highlighted.
     (This enables the keepSelection resource).
     Ps = 1 0 4 1  -> Use the CLIPBOARD selection.  (This enables
     the selectToClipboard resource).
     Ps = 1 0 4 2  -> Enable Urgency window manager hint when
     Control-G is received.  (This enables the bellIsUrgent
     resource).
     Ps = 1 0 4 3  -> Enable raising of the window when Control-G
     is received.  (enables the popOnBell resource).
     Ps = 1 0 4 7  -> Use Alternate Screen Buffer.  (This may be
     disabled by the titeInhibit resource).
     Ps = 1 0 4 8  -> Save cursor as in DECSC.  (This may be dis-
     abled by the titeInhibit resource).
     Ps = 1 0 4 9  -> Save cursor as in DECSC and use Alternate
     Screen Buffer, clearing it first.  (This may be disabled by
     the titeInhibit resource).  This combines the effects of the 1
     0 4 7  and 1 0 4 8  modes.  Use this with terminfo-based
     applications rather than the 4 7  mode.
     Ps = 1 0 5 0  -> Set terminfo/termcap function-key mode.
     Ps = 1 0 5 1  -> Set Sun function-key mode.
     Ps = 1 0 5 2  -> Set HP function-key mode.
     Ps = 1 0 5 3  -> Set SCO function-key mode.
     Ps = 1 0 6 0  -> Set legacy keyboard emulation (X11R6).
     Ps = 1 0 6 1  -> Set VT220 keyboard emulation.
     Ps = 2 0 0 4  -> Set bracketed paste mode.
 Modes:
   http://vt100.net/docs/vt220-rm/chapter4.html
   ```

   Example: Show cursor: 
   ```

  return this.setMode('?25', (error, data)=>{

  });
```
   */
  setMode(args: string, callback: ProgramResponseCallback): boolean
  /** @see setMode  */
  sm(...args: string[]): boolean

  decset(...args: string[]): boolean
  /**
 * Uses [[setMode]] 2 5 to show the cursor:   
  NOTE: In xterm terminfo:  cnorm stops blinking cursor   cvvis starts blinking cursor 
 */
  showCursor(): boolean

  alternateBuffer(): boolean
  smcup(): boolean
  alternate(): boolean
  /**
```

CSI Pm l  Reset Mode (RM).
    Ps = 2  -> Keyboard Action Mode (AM).
    Ps = 4  -> Replace Mode (IRM).
    Ps = 1 2  -> Send/receive (SRM).
    Ps = 2 0  -> Normal Linefeed (LNM).
CSI ? Pm l
  DEC Private Mode Reset (DECRST).
    Ps = 1  -> Normal Cursor Keys (DECCKM).
    Ps = 2  -> Designate VT52 mode (DECANM).
    Ps = 3  -> 80 Column Mode (DECCOLM).
    Ps = 4  -> Jump (Fast) Scroll (DECSCLM).
    Ps = 5  -> Normal Video (DECSCNM).
    Ps = 6  -> Normal Cursor Mode (DECOM).
    Ps = 7  -> No Wraparound Mode (DECAWM).
    Ps = 8  -> No Auto-repeat Keys (DECARM).
    Ps = 9  -> Don't send Mouse X & Y on button press.
    Ps = 1 0  -> Hide toolbar (rxvt).
    Ps = 1 2  -> Stop Blinking Cursor (att610).
    Ps = 1 8  -> Don't print form feed (DECPFF).
    Ps = 1 9  -> Limit print to scrolling region (DECPEX).
    Ps = 2 5  -> Hide Cursor (DECTCEM).
    Ps = 3 0  -> Don't show scrollbar (rxvt).
    Ps = 3 5  -> Disable font-shifting functions (rxvt).
    Ps = 4 0  -> Disallow 80 -> 132 Mode.
    Ps = 4 1  -> No more(1) fix (see curses resource).
    Ps = 4 2  -> Disable Nation Replacement Character sets (DEC-
    NRCM).
    Ps = 4 4  -> Turn Off Margin Bell.
    Ps = 4 5  -> No Reverse-wraparound Mode.
    Ps = 4 6  -> Stop Logging.  (This is normally disabled by a
    compile-time option).
    Ps = 4 7  -> Use Normal Screen Buffer.
    Ps = 6 6  -> Numeric keypad (DECNKM).
    Ps = 6 7  -> Backarrow key sends delete (DECBKM).
    Ps = 1 0 0 0  -> Don't send Mouse X & Y on button press and
    release.  See the section Mouse Tracking.
    Ps = 1 0 0 1  -> Don't use Hilite Mouse Tracking.
    Ps = 1 0 0 2  -> Don't use Cell Motion Mouse Tracking.
    Ps = 1 0 0 3  -> Don't use All Motion Mouse Tracking.
    Ps = 1 0 0 4  -> Don't send FocusIn/FocusOut events.
    Ps = 1 0 0 5  -> Disable Extended Mouse Mode.
    Ps = 1 0 1 0  -> Don't scroll to bottom on tty output
    (rxvt).
    Ps = 1 0 1 1  -> Don't scroll to bottom on key press (rxvt).
    Ps = 1 0 3 4  -> Don't interpret "meta" key.  (This disables
    the eightBitInput resource).
    Ps = 1 0 3 5  -> Disable special modifiers for Alt and Num-
    Lock keys.  (This disables the numLock resource).
    Ps = 1 0 3 6  -> Don't send ESC  when Meta modifies a key.
    (This disables the metaSendsEscape resource).
    Ps = 1 0 3 7  -> Send VT220 Remove from the editing-keypad
    Delete key.
    Ps = 1 0 3 9  -> Don't send ESC  when Alt modifies a key.
    (This disables the altSendsEscape resource).
    Ps = 1 0 4 0  -> Do not keep selection when not highlighted.
    (This disables the keepSelection resource).
    Ps = 1 0 4 1  -> Use the PRIMARY selection.  (This disables
    the selectToClipboard resource).
    Ps = 1 0 4 2  -> Disable Urgency window manager hint when
    Control-G is received.  (This disables the bellIsUrgent
    resource).
    Ps = 1 0 4 3  -> Disable raising of the window when Control-
    G is received.  (This disables the popOnBell resource).
    Ps = 1 0 4 7  -> Use Normal Screen Buffer, clearing screen
    first if in the Alternate Screen.  (This may be disabled by
    the titeInhibit resource).
    Ps = 1 0 4 8  -> Restore cursor as in DECRC.  (This may be
    disabled by the titeInhibit resource).
    Ps = 1 0 4 9  -> Use Normal Screen Buffer and restore cursor
    as in DECRC.  (This may be disabled by the titeInhibit
    resource).  This combines the effects of the 1 0 4 7  and 1 0
    4 8  modes.  Use this with terminfo-based applications rather
    than the 4 7  mode.
    Ps = 1 0 5 0  -> Reset terminfo/termcap function-key mode.
    Ps = 1 0 5 1  -> Reset Sun function-key mode.
    Ps = 1 0 5 2  -> Reset HP function-key mode.
    Ps = 1 0 5 3  -> Reset SCO function-key mode.
    Ps = 1 0 6 0  -> Reset legacy keyboard emulation (X11R6).
    Ps = 1 0 6 1  -> Reset keyboard emulation to Sun/PC style.
    Ps = 2 0 0 4  -> Reset bracketed paste mode.
```
 */
  resetMode(...args: string[]): boolean
  /** @see resetMode  */
  rm(...args: string[]): boolean

  decrst(...args: string[]): boolean

  hideCursor(): boolean
  civis(): boolean
  vi(): boolean
  cursor_invisible(): boolean
  dectcemh(): boolean

  normalBuffer(): boolean
  rmcup(): boolean

  enableMouse(): void
  disableMouse(): void

  setMouse(
    opt?: {
      normalMouse?: boolean
      x10Mouse?: boolean
      hiliteTracking?: boolean
      vt200Mouse?: boolean
      allMotion?: boolean
      sendFocus?: boolean
      utfMode?: boolean
      sgrMouse?: boolean
      decMouse?: boolean
      urxvtMouse?: boolean
      ptermMouse?: boolean
      jsbtermMouse?: boolean
      gpmMouse?: boolean
      [s: string]: any
    },
    enable?: boolean
  ): void

  /**
 ```
 CSI Ps ; Ps r
   Set Scrolling Region [top;bottom] (default = full size of win-
   dow) (DECSTBM).
 CSI ? Pm r
 ```
   */
  setScrollRegion(top: number, bottom: number): boolean
  /** @see setScrollRegion*/
  csr(top: number, bottom: number): boolean
  /** @see setScrollRegion*/
  decstbm(top: number, bottom: number): boolean
  /** CSI s
  Save cursor (ANSI.SYS). */
  saveCursorA(): boolean
  /** @see saveCursorA*/
  scA(): boolean
  /**
 ```
 CSI u
   Restore cursor (ANSI.SYS).
 ```

 */
  restoreCursorA(): boolean
  /** @see restoreCursorA*/
  rcA(): boolean

  /**  Cursor Forward Tabulation Ps tab stops (default = 1) (CHT). */
  cursorForwardTab(param?: number): boolean
  /** @see cursorForwardTab*/
  cht(param?: number): boolean
  /**CSI Ps S  Scroll up Ps lines (default = 1) (SU). */
  scrollUp(param?: number): boolean
  /** @see scrollUp*/
  su(param?: number): boolean
  /**  CSI Ps T  Scroll down Ps lines (default = 1) (SD). */
  scrollDown(param?: number): boolean
  /** @see scrollDown*/
  sd(param?: number): boolean
  /** 
 ```
   CSI Ps ; Ps ; Ps ; Ps ; Ps T
   Initiate highlight mouse tracking.  Parameters are
   [func;startx;starty;firstrow;lastrow].  See the section Mouse
   Tracking. 
 ```
   */
  initMouseTracking(...args: string[]): boolean
  /**
   ``` 
   CSI > Ps; Ps T
    Reset one or more features of the title modes to the default
    value.  Normally, "reset" disables the feature.  It is possi-
    ble to disable the ability to reset features by compiling a
    different default for the title modes into xterm.
      Ps = 0  -> Do not set window/icon labels using hexadecimal.
      Ps = 1  -> Do not query window/icon labels using hexadeci-
      mal.
      Ps = 2  -> Do not set window/icon labels using UTF-8.
      Ps = 3  -> Do not query window/icon labels using UTF-8.
    (See discussion of "Title Modes").```
   */
  resetTitleModes(...args: string[]): boolean

  /**  CSI Ps Z  Cursor Backward Tabulation Ps tab stops (default = 1) (CBT). */
  cursorBackwardTab(param?: number): boolean

  cbt(param?: number): boolean

  repeatPrecedingCharacter(param?: number): boolean
  rep(param?: number): boolean

  tabClear(param?: number): boolean
  tbc(param?: number): boolean

  mediaCopy(...args: string[]): boolean
  mc(...args: string[]): boolean

  mc0(): boolean
  print_screen(): boolean
  ps(): boolean

  mc5(): boolean
  prtr_on(): boolean
  po(): boolean

  mc4(): boolean
  prtr_off(): boolean
  pf(): boolean

  mc5p(): boolean
  prtr_non(): boolean
  p0(): boolean

  setResources(...args: string[]): boolean

  disableModifieres(...args: string[]): boolean

  /**
   * 
 ```
  CSI > Ps p
Set resource value pointerMode.  This is used by xterm to
decide whether to hide the pointer cursor as the user types.
Valid values for the parameter:
  Ps = 0  -> never hide the pointer.
  Ps = 1  -> hide if the mouse tracking mode is not enabled.
  Ps = 2  -> always hide the pointer.  If no parameter is
  given, xterm uses the default, which is 1 . 
  
 ```
  */
  setPointerMode(...args: string[]): boolean

  softReset(): boolean
  rs2(): boolean
  decstr(): boolean

  requestAnsiMode(param?: number): boolean
  decrqm(param?: number): boolean

  requestPrivateMode(param?: number): boolean
  decrqmp(param?: number): boolean

  setConformanceLevel(...args: string[]): boolean
  decscl(...args: string[]): boolean

  loadLEDs(param?: number): boolean
  decll(param?: number): boolean

  /** 
 ```
CSI Ps SP q
Set cursor style (DECSCUSR, VT520).
 Ps = 0  -> blinking block.
 Ps = 1  -> blinking block (default).
 Ps = 2  -> steady block.
 Ps = 3  -> blinking underline.
 Ps = 4  -> steady underline.
 ```
   */
  setCursorStyle(
    cursor:
      | 0
      | 1
      | 2
      | 3
      | 4
      | 'blinkingblock'
      | 'block'
      | 'steady block'
      | 'blinking underline'
      | 'underline'
      | 'steady underline'
      | 'blinking bar'
      | 'bar'
      | 'steady bar'
  ): boolean
  /** see [[setCursorStyle]] */
  decscursr(cursor: number): boolean

  /**
 ```
   CSI Ps " q
  Select character protection attribute (DECSCA).  Valid values
  for the parameter:
    Ps = 0  -> DECSED and DECSEL can erase (default).
    Ps = 1  -> DECSED and DECSEL cannot erase.
    Ps = 2  -> DECSED and DECSEL can erase.
 ```
   */
  setCharProtectionAttr(param?: number): boolean
  /** @see [[setCharProtectionAttr]] */
  decsca(param?: number): boolean
  /**
 ```
  CSI ? Pm r
    Restore DEC Private Mode Values.  The value of Ps previously
    saved is restored.  Ps values are the same as for DECSET. 
 ```
    */
  restorePrivateValues(...args: string[]): boolean

  /**
 ```
   * CSI Pt; Pl; Pb; Pr; Ps$ r
  Change Attributes in Rectangular Area (DECCARA), VT400 and up.
    Pt; Pl; Pb; Pr denotes the rectangle.
    Ps denotes the SGR attributes to change: 0, 1, 4, 5, 7.
NOTE: xterm doesn't enable this code by default.
 ```
   */
  setAttrInRectangle(Pt: number, Pl: number, Pb: number, Pr: number, Ps$: number): boolean
  /** @see [[setAttrInRectangle]] */
  deccara(...args: string[]): boolean

  /**  Save DEC Private Mode Values.  Ps values are the same as for */
  savePrivateValues(...args: string[]): boolean

  /**
   * 
 ```
    CSI Ps ; Ps ; Ps t
   Window manipulation (from dtterm, as well as extensions).
   These controls may be disabled using the allowWindowOps
   resource.  Valid values for the first (and any additional
   parameters) are:
      ```
     Ps = 1  -> De-iconify window.
     Ps = 2  -> Iconify window.
     Ps = 3  ;  x ;  y -> Move window to [x, y].
     Ps = 4  ;  height ;  width -> Resize the xterm window to
     height and width in pixels.
     Ps = 5  -> Raise the xterm window to the front of the stack-
     ing order.
     Ps = 6  -> Lower the xterm window to the bottom of the
     stacking order.
     Ps = 7  -> Refresh the xterm window.
     Ps = 8  ;  height ;  width -> Resize the text area to
     [height;width] in characters.
     Ps = 9  ;  0  -> Restore maximized window.
     Ps = 9  ;  1  -> Maximize window (i.e., resize to screen
     size).
     Ps = 1 0  ;  0  -> Undo full-screen mode.
     Ps = 1 0  ;  1  -> Change to full-screen.
     Ps = 1 1  -> Report xterm window state.  If the xterm window
     is open (non-iconified), it returns CSI 1 t .  If the xterm
     window is iconified, it returns CSI 2 t .
     Ps = 1 3  -> Report xterm window position.  Result is CSI 3
     ; x ; y t
     Ps = 1 4  -> Report xterm window in pixels.  Result is CSI
     4  ;  height ;  width t
     Ps = 1 8  -> Report the size of the text area in characters.
     Result is CSI  8  ;  height ;  width t
     Ps = 1 9  -> Report the size of the screen in characters.
     Result is CSI  9  ;  height ;  width t
     Ps = 2 0  -> Report xterm window's icon label.  Result is
     OSC  L  label ST
     Ps = 2 1  -> Report xterm window's title.  Result is OSC  l
     label ST
     Ps = 2 2  ;  0  -> Save xterm icon and window title on
     stack.
     Ps = 2 2  ;  1  -> Save xterm icon title on stack.
     Ps = 2 2  ;  2  -> Save xterm window title on stack.
     Ps = 2 3  ;  0  -> Restore xterm icon and window title from
     stack.
     Ps = 2 3  ;  1  -> Restore xterm icon title from stack.
     Ps = 2 3  ;  2  -> Restore xterm window title from stack.
     Ps >= 2 4  -> Resize to Ps lines (DECSLPP).
     Ps >= 2 4  -> Resize to Ps lines (DECSLPP).
   ```
   ```
    Example call: 
   ```
program.manipulateWindow(18, function(err:any, data:any) {
  program.log('manipulateWindow', data);
});

```

   */
  manipulateWindow(data1: number, data2: number | undefined, c: ProgramResponseCallback): boolean

  manipulateWindow(data1: number, c: ProgramResponseCallback): boolean

  getWindowSize(callback?: ProgramResponseCallback): boolean

  reverseAttrInRectangle(...args: string[]): boolean
  decrara(...args: string[]): boolean

  /** ```CSI > Ps; Ps t
  Set one or more features of the title modes.  Each parameter
  enables a single feature.
    Ps = 0  -> Set window/icon labels using hexadecimal.
    Ps = 1  -> Query window/icon labels using hexadecimal.
    Ps = 2  -> Set window/icon labels using UTF-8.
    Ps = 3  -> Query window/icon labels using UTF-8.  (See dis-
    cussion of "Title Modes")
XXX VTE bizarelly echos this: ```
*/
  setTitleModeFeature(...args: string[]): boolean

  setWarningBellVolume(param?: number): boolean
  decswbv(param?: number): boolean

  setMarginBellVolume(param?: number): boolean
  /**
   * ```
   CSI Pt; Pl; Pb; Pr; Pp; Pt; Pl; Pp$ v
     Copy Rectangular Area (DECCRA, VT400 and up).
       Pt; Pl; Pb; Pr denotes the rectangle.
       Pp denotes the source page.
       Pt; Pl denotes the target location.
       Pp denotes the target page.
   NOTE: xterm doesn't enable this code by default.
   ```
   */
  copyRectangle(...args: string[]): boolean
  /**  @see copyRectangle  */
  deccra(...args: string[]): boolean

  /** 
   *    ```
 CSI Pt ; Pl ; Pb ; Pr ' w
   Enable Filter Rectangle (DECEFR), VT420 and up.
   Parameters are [top;left;bottom;right].
   Defines the coordinates of a filter rectangle and activates
   it.  Anytime the locator is detected outside of the filter
   rectangle, an outside rectangle event is generated and the
   rectangle is disabled.  Filter rectangles are always treated
   as "one-shot" events.  Any parameters that are omitted default
   to the current locator position.  If all parameters are omit-
   ted, any locator motion will be reported.  DECELR always can-
   cels any prevous rectangle definition.
   ```
   */
  enableFilterRectangle(...args: string[]): boolean
  /**  @see enableFilterRectangle  */
  decefr(...args: string[]): boolean

  /**
```
CSI Ps x  Request Terminal Parameters (DECREQTPARM).
  if Ps is a "0" (default) or "1", and xterm is emulating VT100,
  the control sequence elicits a response of the same form whose
  parameters describe the terminal:
    Ps -> the given Ps incremented by 2.
    Pn = 1  <- no parity.
    Pn = 1  <- eight bits.
    Pn = 1  <- 2  8  transmit 38.4k baud.
    Pn = 1  <- 2  8  receive 38.4k baud.
    Pn = 1  <- clock multiplier.
    Pn = 0  <- STP flags.
```
   */
  requestParameters(param?: number): boolean
  /**  @see requestParameters  */
  decreqtparm(param: number): boolean
  /**
```
   
    CSI Ps x  Select Attribute Change Extent (DECSACE).
      Ps = 0  -> from start to end position, wrapped.
      Ps = 1  -> from start to end position, wrapped.
      Ps = 2  -> rectangle (exact).
```
   */
  selectChangeExtent(param?: number): boolean
  /**  @see selectChangeExtent  */
  decsace(param?: number): boolean

  /**
```
    CSI Pc; Pt; Pl; Pb; Pr$ x
  Fill Rectangular Area (DECFRA), VT420 and up.
    Pc is the character to use.
    Pt; Pl; Pb; Pr denotes the rectangle.
NOTE: xterm doesn't enable this code by default.
```
   */
  fillRectangle(Pc: string, Pt: number, pl: number, pb: number, pr: number): boolean
  /**  @see fillRectangle  */

  decfra(...args: string[]): boolean
  /**
```

CSI Ps ; Pu ' z
  Enable Locator Reporting (DECELR).
  Valid values for the first parameter:
    Ps = 0  -> Locator disabled (default).
    Ps = 1  -> Locator enabled.
    Ps = 2  -> Locator enabled for one report, then disabled.
  The second parameter specifies the coordinate unit for locator
  reports.
  Valid values for the second parameter:
    Pu = 0  <- or omitted -> default to character cells.
    Pu = 1  <- device physical pixels.
    Pu = 2  <- character cells.
```

 */
  enableLocatorReporting(...args: string[]): boolean
  decelr(...args: string[]): boolean

  eraseRectangle(...args: string[]): boolean
  decera(...args: string[]): boolean

  setLocatorEvents(...args: string[]): boolean
  decsle(...args: string[]): boolean

  selectiveEraseRectangle(...args: string[]): boolean
  decsera(...args: string[]): boolean
  /**
```
  CSI Ps ' |
     Request Locator Position (DECRQLP).
     Valid values for the parameter are:
       Ps = 0 , 1 or omitted -> transmit a single DECLRP locator
       report.
  
     If Locator Reporting has been enabled by a DECELR, xterm will
     respond with a DECLRP Locator Report.  This report is also
     generated on button up and down events if they have been
     enabled with a DECSLE, or when the locator is detected outside
     of a filter rectangle, if filter rectangles have been enabled
     with a DECEFR.
  
       -> CSI Pe ; Pb ; Pr ; Pc ; Pp &  w
  
     Parameters are [event;button;row;column;page].
     Valid values for the event:
       Pe = 0  -> locator unavailable - no other parameters sent.
       Pe = 1  -> request - xterm received a DECRQLP.
       Pe = 2  -> left button down.
       Pe = 3  -> left button up.
       Pe = 4  -> middle button down.
       Pe = 5  -> middle button up.
       Pe = 6  -> right button down.
       Pe = 7  -> right button up.
       Pe = 8  -> M4 button down.
       Pe = 9  -> M4 button up.
       Pe = 1 0  -> locator outside filter rectangle.
     ``button'' parameter is a bitmask indicating which buttons are
       pressed:
       Pb = 0  <- no buttons down.
       Pb & 1  <- right button down.
       Pb & 2  <- middle button down.
       Pb & 4  <- left button down.
       Pb & 8  <- M4 button down.
     ``row'' and ``column'' parameters are the coordinates of the
       locator position in the xterm window, encoded as ASCII deci-
       mal.
     The ``page'' parameter is not used by xterm, and will be omit-
     ted.
```
  
   */
  requestLocatorPosition(param?: string, callback?: ProgramResponseCallback): boolean
  /** @see requestLocatorPosition */
  reqmp(param?: string, callback?: ProgramResponseCallback): boolean
  /** @see requestLocatorPosition */
  req_mouse_pos(param?: string, callback?: ProgramResponseCallback): boolean
  /** @see requestLocatorPosition */
  decrqlp(param?: string, callback?: ProgramResponseCallback): boolean

  /** 
```
 CSI P m SP }
 Insert P s Column(s) (default = 1) (DECIC), VT420 and up.
 NOTE: xterm doesn't enable this code by default. 
```
*/
  insertColumns(...args: string[]): boolean
  /** @see insertColumns */
  decic(...args: string[]): boolean

  /**
```
 CSI P m SP ~
 Delete P s Column(s) (default = 1) (DECDC), VT420 and up
 NOTE: xterm doesn't enable this code by default.
```
   */
  deleteColumns(...args: string[]): boolean
  /** @see deleteColumns */
  decdc(...args: string[]): boolean

  out(param: string, ...args: any[]): boolean

  sigtstp(callback?: ProgramResponseCallback): boolean

  pause(callback?: ProgramResponseCallback): Function

  resume: () => void

  /** triggered when native events in the host terminal window */
  on(e: 'mouse', c: (e: GpmEvent) => void): this
  //  on(e: 'response', c: (e: any) => void): this
  /** triggered when the terminal window is resized. */
  on(e: 'resize', c: (e: { winch: boolean; cols: number; rows: number }) => void): this
  /** triggered when the terminal window gains focus n the host window manager. For exmmple when the user switchst form another application to the terminal with ctrl-tab.  Notice that these are native events, ocurring outside the terminal application.*/
  on(e: 'focus', c: (e: any) => void): this
  /** triggered when the terminal window loose focus host window manager. For exmmple when the user switchs from the shell to another form another application . Notice that these are native events, ocurring outside the terminal application. */
  on(e: 'blur', c: (e: any) => void): this

  on(e: 'keypress', c: Widgets.KeyEventListener): this

  /** Received when blessed notices something untoward (output is not a tty, terminfo not found, etc). */
  on(event: 'warning', callback: (text: string) => void): this
  on(e: string, c: (e: any) => void): this
}

export namespace Widgets {
  export namespace Types {
    type TTopLeft = string | number | 'center'

    type TPosition = string | number

    type TMouseAction = 'mousedown' | 'mouseup' | 'mousemove' | 'wheelup' | 'wheeldown'

    interface TBorder extends TStyle {
      /** Type of border (line or bg). bg by default. */
      type?: BorderType

      /** Character to use if bg type, default is space.   */
      ch?: string

      top?: boolean
      left?: boolean
      right?: boolean
      bottom?: boolean
    }

    type BorderType = string //'line' | 'bg'

    // interface TBorder {
    //   /**
    //    * Type of border (line or bg). bg by default.
    //    */
    //   type?: BorderType

    //   /**
    //    * Character to use if bg type, default is space.
    //    */
    //   ch?: string

    //   /**
    //    * Border foreground and background, must be numbers (-1 for default).
    //    */
    //   bg?: number
    //   fg?: number

    //   /**
    //    * Border attributes.
    //    */
    //   bold?: boolean
    //   underline?: boolean

    //   top?: boolean
    //   left?: boolean
    //   right?: boolean
    //   bottom?: boolean
    // }

    export interface TStyle {
      /** artificial type for user custom data (it doesn't exists just a type) */
      custom?: { [name: string]: any }

      // leave it open for custom style properties
      // [name: string]: any
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
      label?: string
      track?: TStyle
      scrollbar?: TStyle & { style: TStyle } | true
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
     * An object for any miscellanous user data.
     */
    data: { [index: string]: any }

    /**
     * An object for any miscellanous user data.
     */
    _: { [index: string]: any }

    /**
     * An object for any miscellanous user data.
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
     * Visit each node's descendants, with [[iter]] function,  parents first. If `s` is provided it will call [[iter]] on self first.
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

    /** Received when node gains a new parent. If the node was detached from the sreen, newParent will be undefined. */
    on(event: 'reparent', listener: (this: this, newParent?: Node) => void): void
    /** emitted by a parent node when adding a new chhild node. */
    on(event: 'adopt', listener: (this: this, newChildren: Node) => void): void
    on(event: 'attach', listener: (this: this, newParent: Node) => void): void
    /** Emitted by a node that is being detached frmo the screen or ancester. */
    on(event: 'detach', listener: (this: this, newParent: Node) => void): void
    /** Triggered by a parent node when removing a child node */
    on(event: 'remove', listener: (this: this, removedChild: Node) => void): void
    on(event: string, listener: (...args: any[]) => void): this
    // on(event: NodeEventType, callback: (arg: Node) => void): this
  }

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

  type NodeGenericEventType =
    /** Received on screen resize. */
    | 'resize'
    /** Received before render. */
    | 'prerender'
    /** Received on render. */
    | 'render'
    /** Received when the screen is destroyed (only useful when using multiple screens). */
    | 'destroy'
    /** Received when the element is moved. */
    | 'move'
    /** Received when element is shown. */
    | 'show'
    /** Received when element becomes hidden. */
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
    removeKey(name: string, listener: KeyEventListener): void

    on(event: string, listener: (...args: any[]) => void): this
    /** Received on mouse events. */
    on(event: NodeMouseEventType, callback: (arg: Events.IMouseEventArg) => void): this

    /** Received on key events. */
    on(event: 'keypress', callback: KeyEventListener): this
    on(event: NodeScreenEventType, callback: (arg: Screen) => void): this
    /** Received when blessed notices something untoward (output is not a tty, terminfo not found, etc). */
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
    tput?: Tput

    /**
     * Top of the focus history stack.
     */
    focused?: BlessedElement

    /**
     * Width of the screen (same as program.cols).
     */
    width?: Types.TPosition

    /**
     * Height of the screen (same as program.rows).
     */
    height?: Types.TPosition

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
    width: Types.TPosition

    /**
     * Height of the screen (same as program.rows).
     */
    height: Types.TPosition

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
     * Set or get terminal name. Set calls screen.setTerminal() internally.
     */
    terminal: string

    /**
     * Set or get window title.
     */
    title: string

    /** Internal Screen buffer of current lines. Exposed for debug purpuses. @internal */
    lines: string[]

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

    /**
     * Draw the screen based on the contents of the screen buffer.
     */
    draw(start: number, end: number): void

    /**
     * Resets the focus, buffers, clear the sreen, alloc new memory, reset the keypad keys, stop listening to the mouse, etc. But won't emit destroy or other events nor unregister any listener. (I guess is like a reset)
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
    clearRegion(x1: number, x2: number, y1: number, y2: number): void

    /**
     * Fill any region with a character of a certain attribute.
     */
    fillRegion(attr: string, ch: string, x1: number, x2: number, y1: number, y2: number): void

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
    keyable?: boolean

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
    label?: string

    /**
     * A floating text label for the element which appears on mouseover.
     */
    hoverText?: string

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
  }

  interface Coords {
    xl: number
    xi: number
    yl: number
    yi: number
    base: number
    _contentEnd: { x: number; y: number }
    notop: Types.TTopLeft
    noleft: Types.TTopLeft
    noright: Types.TPosition
    nobot: Types.TPosition
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
    width: number

    /**
     * Calculated height.
     */
    height: number

    /**
     * Calculated relative top offset.
     */
    top: number

    /**
     * Calculated relative left offset.
     */
    left: number

    /**
     * Calculated relative right offset.
     */
    right: number

    /**
     * Calculated relative bottom offset.
     */
    bottom: number

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

    itop: Types.TTopLeft
    ileft: Types.TTopLeft
    iheight: Types.TPosition
    iwidth: Types.TPosition

    /**
     * Calculated relative top offset.
     */
    rtop: Types.TTopLeft

    /**
     * Calculated relative left offset.
     */
    rleft: Types.TTopLeft

    /**
     * Calculated relative right offset.
     */
    rright: Types.TPosition

    /**
     * Calculated relative bottom offset.
     */
    rbottom: Types.TPosition

    /**
     * Get's the child element implementing the current label of this node.
     * @internal
     */
    _label?: BlessedElement | undefined

    /**
     * Write content and children to the screen buffer.
     */
    render(): Coords

    /**
     * Hide element and triggers [[hide]] event
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
     * @internal parses given content string with no tags before rendering. Removes / transform characters that break the output . For example, double-width chars will eat the next char after render in this case it creates a blank character after it so it doesn't eat the real next char.
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
     * Set the z-index of the element (changes rendering order).
     */
    setIndex(z: number): void

    /**
     * Put the element in front of its siblings.
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
    enableDrag(): void

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
    screenshot(): void

    /** Convert `{red-fg}foo{/red-fg}` to `\x1b[31mfoo\x1b[39m` . @internal. Could  be overriden by element subclasses. */
    protected _parseTags(s: string): string
    /** @internal  . Could  be overriden by element subclasses. */
    protected _parseAttr(ines: string[]): string[]
    /** @internal . Could  be overriden by element subclasses. */
    protected _align(line: string, width: number, align: string): void
    /** @internal . Could  be overriden by element subclasses. */
    protected _wrapContent(content: string, width: number): void
    /** calculates the value for `style` (could be substyle like style.bar) to paint in the screen according to the rest of the properties and optionally bg and fg. */
    protected sattr(style: Widgets.Types.TStyle, fg?: string, bg?: string): any // TODO: I don't fully understand what this does but is ery used in widget implementations to obtain the charvalues for painting in the screen... this is why I think it whould ebavailablr for implementors
    /** Cleans the rectangle of this element on the screen. Useful for subclasses before rendering. @internal */
    protected clearPos(): void

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
     * Style of the scrollbar track if present (takes regular style options).
     */
    scrollbar?: { style?: Widgets.Types.TStyle; track?: Widgets.Types.TStyle; ch?: string } | boolean
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
    insertItem(i: number, child: BlessedElement): void

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
    setItems(items: BlessedElement[]): void

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
    up(amount: number): void

    /**
     * Select item below selected.
     */
    down(amount: number): void

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
    on(event: ListElementEventType, callback: () => void): this // TODO: callback
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
    pick(cwd: string, callback: () => void): void
    pick(callback: () => void): void

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

// todo verify : LOG: [ 'classes',  'node',  'Node',  'screen',  'Screen',  'element',  'Element',  'box',  'Box',  'text',  'Text',  'line',  'Line',  'scrollablebox',  'ScrollableBox',  'scrollabletext',  'ScrollableText',  'bigtext',  'BigText',  'list',  'List',  'form',  'Form',  'input',  'Input',  'textarea',  'Textarea',  'textbox',  'Textbox',  'button',  'Button',  'progressbar',  'ProgressBar',  'filemanager',  'FileManager',  'checkbox',  'Checkbox',  'radioset',  'RadioSet',  'radiobutton',  'RadioButton',  'prompt',  'Prompt',  'question',  'Question',  'message',  'Message',  'loading',  'Loading',  'listbar',  'Listbar',  'log',  'Log',  'table',  'Table',  'listtable',  'ListTable',  'terminal',  'Terminal',  'image',  'Image',  'ansiimage',  'ANSIImage',  'overlayimage',  'OverlayImage',  'video',  'Video',  'layout',  'Layout',  'aliases',  'ListBar',  'PNG',  'png' ]

// publish classes on existin gpaths so users can reference the real values for extending
export namespace widget {
  class Node extends Widgets.Node {}
  class Element<Options extends Widgets.ElementOptions = Widgets.ElementOptions> extends Widgets.BlessedElement<
    Options
  > {}
  class Box extends Widgets.BoxElement {}
  class List extends Widgets.ListElement {}
  class Screen extends Widgets.Screen {}
  // class BoxElement extends Widgets.BoxElement { }
  class Text<Options extends Widgets.TextOptions = Widgets.TextOptions> extends Widgets.TextElement<Options> {}
  class Line extends Widgets.LineElement {}
  class BigText extends Widgets.BigTextElement {}
  // class List extends Widgets.ListElement { }
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
  // class Terminal extends Widgets.TerminalElement { }
}

// TODO: verify that all these are real classes :   'Node',  'Screen',  'Element',  'Box',  'Text',  'Line',  'ScrollableBox',  'ScrollableText',  'BigText',  'List',  'Form',  'Input',  'Textarea',  'Textbox',  'Button',  'ProgressBar',  'FileManager',  'Checkbox',  'RadioSet',  'RadioButton',  'Prompt',  'Question',  'Message',  'Loading',  'Listbar',  'Log',  'Table',  'ListTable',  'Terminal',  'Image',  'ANSIImage',  'OverlayImage',  'Video',  'Layout'

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
  match(r1: Widgets.Color | ColorRgb, g1?: number, b1?: number): number
  convert(color: Widgets.Color): number
  mixColors(c1: number, c2: number, alpha: number): number
  RGBToHex(r: number, g: number, b: number): string
  RGBToHex(hex: string): ColorRgb
  blend(attr: number, attr2?: number, alpha?: number): number
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

// merge(a, b) - Merge objects a and b into object a.
// asort(obj) - Sort array alphabetically by name prop.
// hsort(obj) - Sort array numerically by index prop.
// findFile(start, target) - Find a file at start directory with name target.
// escape(text) - Escape content's tags to be passed into el.setContent(). Example: box.setContent('escaped tag: ' + blessed.escape('{bold}{/bold}'));
// parseTags(text) - Parse tags into SGR escape codes.
// generateTags(style, text) - Generate text tags based on style object.
// attrToBinary(style, element) - Convert style attributes to binary format.
// stripTags(text) - Strip text of tags and SGR sequences.
// cleanTags(text) - Strip text of tags, SGR escape code, and leading/trailing whitespace.
// dropUnicode(text) - Drop text of any >U+FFFF characters.

/**  terminfo/cap aliases for blessed. */
