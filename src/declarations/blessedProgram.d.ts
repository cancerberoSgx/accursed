/// <reference types="node" />

import { EventEmitter } from 'events'
import { Readable, Writable } from 'stream'
import { Widgets } from './blessed'
import { Tput } from './tput'

/**
 * A general representation of the data object received callbacks  of program's write operation  on the
 * output.
 *
 *  In general, each event type will respond with a data object that is mixed into this data object
 *  properties, and also is available individually in some of its properties, For example a  'device-status'
 *  request will respond with a 'status property with only that information but also the properties mixed in
 *  the object itself'
 */
interface ProgramResponseData {
  /**
   * The event type that was requested / write that caused this response. Example: 'window-manipulation',
   * 'device-attributes', 'device-status', etc.
   * */
  event: string

  /**
   * Example: '', 'DSR'
   */
  code: string

  /**
   * Identifies the request type that caused this response. For example, if a  'window-manipulation' is
   * written the response type could be 'textarea-size',  example: 'textarea-size',  'cursor-status',
   *
   */
  type: string

  size?: {
    height: number
    width: number
  }
  height?: number
  width?: number
  status?: {
    x?: number
    y: number
    page?: number
  }
  page?: any
  x?: number
  y?: number
  cursor?: {
    x: 1
    y: 1
    page: undefined
  }
  textAreaSizeCharacters?: {
    height: number
    width: number
  }
  // TODO leave the object open since it has lots of combinations
  [k: string]: any
}

type ProgramResponseCallback = (this: BlessedProgram, err: Error, data: ProgramResponseData) => any

/**
 * program.output Writable implementation should implement this interface
 */
interface ProgramOutput extends Writable {
  isTTY?: boolean
  column: number
  rows: number
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
}

export interface IBlessedProgramOptions {
  input?: Readable

  output?: Writable

  /**
   * path to a file where to write when screen.log() or program.log are called
   */
  log?: string

  dump?: boolean
  /**
   * zero-based indexes for col, row values
   */
  zero?: boolean
  buffer?: boolean
  terminal?: string
  term?: string
  tput?: Tput
  debug?: boolean
  resizeTimeout?: boolean
}

/**
 * The Program instance manages the low level interaction with the terminal and is used by [[Screen]] to read and write terminal, and access mouse, etc. Is responsible of reading / writing to the terminal using [[Tput]] and support mouse. 
 * 
 * It has associated an [[output]] writable stream attribute which usually is stdout but could
 * could be configured by the user using [[IBlessedProgramOptions]]. The same for an [[input]] Readable stream
 * from which the host terminal respond to the program requests.
 *
 * The communication with the host system is mostly done writing  `tput` sequences to the [[output]] stream. It extends tput to add support for mouse and other devices. 
 * 
 * The program is responsible of portability and supporting the same API through several terminal standards /
 * vendors
 *
 * In general users don't have to use the program for develop their applications, however, it can be accessed
 * from the screen and its lower level api can be used along the application.

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
export declare class BlessedProgram extends Tput implements EventEmitter {
  addListener(event: string | symbol, listener: (...args: any[]) => void): this
  once(event: string | symbol, listener: (...args: any[]) => void): this
  prependListener(event: string | symbol, listener: (...args: any[]) => void): this
  prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this
  removeListener(event: string | symbol, listener: (...args: any[]) => void): this
  off(event: string | symbol, listener: (...args: any[]) => void): this
  removeAllListeners(event?: string | symbol): this
  setMaxListeners(n: number): this
  getMaxListeners(): number
  listeners(event: string | symbol): Function[]
  rawListeners(event: string | symbol): Function[]
  emit(event: string | symbol, ...args: any[]): boolean
  eventNames(): (string | symbol)[]
  listenerCount(type: string | symbol): number

  /** @internal */
  static instances: BlessedProgram[]
  /** @internal */
  gpm?: GpmClient
  type: string
  options: IBlessedProgramOptions
  input: Readable
  output: Writable
  /**
   * Is zero-based indexes for col, row values.
   */
  zero: boolean
  useBuffer: boolean
  x: number
  y: number
  savedX: number
  savedY: number
  cols: number
  rows: number
  tput: Tput
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
  mux: boolean
  tmuxVersion: number
  isAlt: boolean
  tmux: boolean
  _tputSetup: boolean
  auto_left_margin: boolean
  auto_right_margin: boolean
  no_esc_ctlc: boolean
  ceol_standout_glitch: boolean
  eat_newline_glitch: boolean
  erase_overstrike: boolean
  generic_type: boolean
  hard_copy: boolean
  has_meta_key: boolean
  has_status_line: boolean
  insert_null_glitch: boolean
  memory_above: boolean
  memory_below: boolean
  move_insert_mode: boolean
  move_standout_mode: boolean
  over_strike: boolean
  status_line_esc_ok: boolean
  dest_tabs_magic_smso: boolean
  tilde_glitch: boolean
  transparent_underline: boolean
  xon_xoff: boolean
  needs_xon_xoff: boolean
  prtr_silent: boolean
  hard_cursor: boolean
  non_rev_rmcup: boolean
  no_pad_char: boolean
  non_dest_scroll_region: boolean
  can_change: boolean
  back_color_erase: boolean
  hue_lightness_saturation: boolean
  col_addr_glitch: boolean
  cr_cancels_micro_mode: boolean
  has_print_wheel: boolean
  row_addr_glitch: boolean
  semi_auto_right_margin: boolean
  cpi_changes_res: boolean
  lpi_changes_res: boolean
  backspaces_with_bs: boolean
  crt_no_scrolling: boolean
  no_correctly_working_cr: boolean
  gnu_has_meta_key: boolean
  linefeed_is_newline: boolean
  has_hardware_tabs: boolean
  return_does_clr_eol: boolean
  bw: boolean
  am: boolean
  xsb: boolean
  beehive_glitch: boolean
  xhp: boolean
  xenl: boolean
  eo: boolean
  gn: boolean
  hc: boolean
  km: boolean
  hs: boolean;
  in: boolean
  db: boolean
  mir: boolean
  msgr: boolean
  os: boolean
  eslok: boolean
  xt: boolean
  teleray_glitch: boolean
  hz: boolean
  ul: boolean
  xon: boolean
  nxon: boolean
  mc5i: boolean
  chts: boolean
  nrrmc: boolean
  npc: boolean
  ndscr: boolean
  ccc: boolean
  bce: boolean
  hls: boolean
  xhpa: boolean
  crxm: boolean
  daisy: boolean
  xvpa: boolean
  sam: boolean
  cpix: boolean
  lpix: boolean
  unicode: boolean
  brokenACS: boolean
  PCRomSet: boolean
  magicCookie: boolean
  setbuf: boolean
  _terminal: string
  _buf: string
  columns: number
  init_tabs: number
  lines: number
  lines_of_memory: number
  magic_cookie_glitch: number
  padding_baud_rate: number
  virtual_terminal: number
  width_status_line: number
  num_labels: number
  label_height: number
  label_width: number
  max_attributes: number
  maximum_windows: number
  max_colors: number
  max_pairs: number
  kNXT6: number
  kNXT7: number
  no_color_video: number
  buffer_capacity: number
  dot_vert_spacing: number
  dot_horz_spacing: number
  max_micro_address: number
  max_micro_jump: number
  micro_col_size: number
  micro_line_size: number
  number_of_pins: number
  output_res_char: number
  output_res_line: number
  output_res_horz_inch: number
  output_res_vert_inch: number
  print_rate: number
  wide_char_size: number
  buttons: number
  bit_image_entwining: number
  bit_image_type: number
  magic_cookie_glitch_ul: number
  carriage_return_delay: number
  new_line_delay: number
  backspace_delay: number
  horizontal_tab_delay: number
  number_of_function_keys: number

  it: number
  lm: number
  xmc: number
  pb: number
  vt: number
  wsl: number
  nlab: number
  lh: number
  lw: number
  ma: number
  wnum: number
  colors: number
  pairs: number
  ncv: number
  bufsz: number
  spinv: number
  spinh: number
  maddr: number
  mjump: number
  mcs: number
  micro_char_size: number
  mls: number
  npins: number
  orc: number
  orl: number
  orhi: number
  orvi: number
  cps: number
  widcs: number
  btns: number
  bitwin: number
  bitype: number

  constructor(options?: IBlessedProgramOptions)
  /**
   * Writes arguments to [[log]] file passed in options.
   */
  log(...args: any[]): boolean
  debug(s: string): boolean
  setupDump(): void
  setupTput(): void
  setTerminal(terminal: string): void
  /**
   * Queries whether the terminal has the capability `name`.
   */
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
  /**
   * Enable GPM mouse support.
   */
  enableGpm(): void
  /**
   * Disable GPM mouse support.
   */
  disableGpm(): void
  bindResponse(): void
  response(name: string, text: string, callback: Function, noBypass?: boolean): boolean
  response(name: string, callback?: Function): boolean
  /**
   * Writes given string to [[output]] bypassing the buffer.
   */
  write(text: string): boolean
  /**
   * Writes given string to [[output]] to the buffer.
   */
  _write(text: string): boolean
  /**
   * Returns the string with given attr enabled or disabled, for example: 
   * 
   ```
  program._write(program._attr('green fg', true) + 'GREEN' +
    program._attr('green fg', false) + ' NORMAL')

  program._write('\n\n' + program._attr(['yellow fg', 'bold', 'blue bg'], true) + 'bg, fg, bold' +
    program._attr('default fg', true) + ' No FG ' +
    program._attr('default bg', true) + ' No BG ' +
    program._attr('bold', false) + ' No bold '
  )
   ```
   */
  _attr(attrs: string | string[], enable: boolean): string

  // /**
  //  * Writes to [[output]] at current cursor location with given style.
  //  * Example: `program.write('Hello world', 'blue fg')`
  //  */
  // write(text: string, style: string): boolean
  /**
   * 	Flushes the buffer.
   */
  flush(): void
  /**
   * Writes given text to [[output]] at current cursor location and given attrs.
   */
  print(text: string, attr?: number): boolean
  /**
   * Alias for [[print]]
   */
  echo(text: string, attr?: boolean): boolean

  /**
   * Sets cursor absolute column.
   */
  setx(x: number): boolean

  /**
   * Sets cursor absolute row.
   */
  sety(y: number): boolean

  /**
   * alias for [[cursorPos]].
   */
  move(x: number, y: number): boolean

  omove(x: number, y: number): void

  /**
   * Sets cursor column relative to current cursor position.
   */
  rsetx(x: number): boolean

  /**
   * Sets cursor relative row.
   */
  rsety(y: number): boolean
  /**
   * Sets cursor relative position.
   */
  rmove(x: number, y: number): void

  cursorCharAbsolute(x: number): number

  /**
   * Inserts `ch` repeated `i` times with given optional attrs at current cursor position.
   */
  simpleInsert(ch: string, i?: number, attr?: boolean): boolean

  /**
   * returns `ch` repeated `i` times.
   */
  repeat(ch: string, i?: number): string
  /**
   * 
 Specific to iTerm2, but I think it's really cool.
 Example:
 ```
  if (!screen.copyToClipboard(text)) {
    execClipboardProgram(text);
  }
  ```
   */
  copyToClipboard(text: string): boolean
  /**
   *  Only XTerm and iTerm2
   */
  cursorShape(shape: 'block' | 'underline' | 'line', blink?: boolean): boolean

  /**
   * set's cursor color.
   */
  cursorColor(color: string): boolean

  /**
   * Reset all tput current modes.
   */
  cursorReset(): boolean

  /**
   * Resets all cursor current modes.
   */
  resetCursor(): boolean

  getTextParams(param: string, callback: Function): boolean
  /**
   * Get's the cursor color. Example call:
   *
```
program.getCursor(function(err, data) {
  program.log('getCursor', data);
  program.write(util.inspect(data));
});
```
   */
  getCursorColor(callback: Function): boolean
  nul(): boolean

  /**
   * Ring bell (beep)
   */
  bell(): boolean
  /** alias for [[bell]] */
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
  /**
   * Saves current cursor state so it can be restored with [[restoreCursor]]
   */
  saveCursor(key: string): boolean
  /** alias for [[saveCursor]] */
  sc(key: string): boolean
  /**
   * restore previously saved cursor with [[saveCursor]]
   */
  restoreCursor(key?: string, hide?: boolean): boolean
  /** alias for [[restoreCursor]] */
  rc(key?: string, hide?: boolean): boolean

  lsaveCursor(key?: string): void
  lrestoreCursor(key?: string, hide?: boolean): void
  lineHeight(): boolean

  charset(
    val?:
      | 'scld'
      | 'uk'
      | 'us'
      | 'dutch'
      | 'finnish'
      | 'french'
      | 'frenchcanadian'
      | 'german'
      | 'italian'
      | 'norwegiandanish'
      | 'spanish'
      | 'swedish'
      | 'swiss',
    level?: 0 | 1 | 2 | 3
  ): boolean

  enter_alt_charset_mode(): boolean
  as(): boolean
  smacs(): boolean
  exit_alt_charset_mode(): boolean
  ae(): boolean
  rmacs(): boolean
  setG(val: number): boolean

  /**
   * Sets terminal window title.
   */
  setTitle(title: string): boolean

  resetColors(param?: string): boolean
  /**
   * OSC Ps ; Pt ST
   * OSC Ps ; Pt BEL
   * Change dynamic colors
   */
  dynamicColors(param?: string): boolean
  selData(a: string, b: string): boolean

  /**
   * Cursor up `n` times, by default 1.
   */
  cursorUp(n?: number): boolean
  /** alias for [[cursorUp]] */
  cuu(param?: number): boolean
  /** alias for [[cursorUp]] */
  up(param?: number): boolean

  /**
   * Cursor Down `n` times, by default 1.
   */
  cursorDown(n?: number): boolean
  /** Alias for [[cursorDown]] */
  cud(n?: number): boolean
  /** Alias for [[cursorDown]] */
  down(n?: number): boolean

  cursorForward(n?: number): boolean
  cuf(n?: number): boolean
  right(n?: number): boolean
  forward(n?: number): boolean

  cursorBackward(n?: number): boolean
  cub(n?: number): boolean
  left(n?: number): boolean
  back(n?: number): boolean

  /**
   * CSI Ps ; Ps H
   * Cursor Position [ row;column ] (default = [ 1,1 ]) (CUP).
   */
  cursorPos(row?: number, col?: number): boolean
  /** Alias for [[cursorPos]] */
  cup(row?: number, col?: number): boolean
  /** Alias for [[cursorPos]] */
  pos(row?: number, col?: number): boolean

  eraseInDisplay(param?: string): boolean
  ed(param?: string): boolean
  clear(): boolean
  eraseInLine(param?: string): boolean
  el(param?: string): boolean

  /**
```
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
```
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
  /** Alias for [[setForeground]]  */
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
  /** Alias for [[setBackground]]  */
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
  /** Alias for [[deviceStatus]] */
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
  /** @see [[insertChars]]  */
  ich(param?: number): boolean
  /**
```
CSI Ps E
Cursor Next Line Ps Times (default = 1) (CNL).
same as CSI Ps B ?
```
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
```
 
   Example: Show cursor:
```
  return this.setMode('?25', (error, data)=>{
 
  });
```
   */
  setMode(args: string, callback: ProgramResponseCallback): boolean
  /** @see [[setMode]]  */
  sm(...args: string[]): boolean

  decset(...args: string[]): boolean

  /**
 * Uses [[setMode]] 2 5 to show the cursor:
  NOTE: In xterm terminfo:  cnorm stops blinking cursor   cvvis starts blinking cursor
 */
  showCursor(): boolean
  // /** alias for [[showCursor]] - legacy - @internal */
  // showCursor_old(): boolean
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
  /** @see [[resetMode]]  */
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
  /** @see [[setScrollRegion]]*/
  csr(top: number, bottom: number): boolean
  /** @see [[setScrollRegion]]*/
  decstbm(top: number, bottom: number): boolean

  /**
```
CSI s
  Save cursor (ANSI.SYS).
```
  */
  saveCursorA(): boolean
  /** @see [[saveCursorA]]*/
  scA(): boolean
  /**
```
 CSI u
   Restore cursor (ANSI.SYS).
```
 
 */
  restoreCursorA(): boolean
  /**
   * @see [[restoreCursorA]]
   * */
  rcA(): boolean
  /**
   * Cursor Forward Tabulation Ps tab stops (default = 1) (CHT).
   */
  cursorForwardTab(param?: number): boolean
  /** @see [[cursorForwardTab]]*/
  cht(param?: number): boolean
  /**CSI Ps S  Scroll up Ps lines (default = 1) (SU). */
  scrollUp(param?: number): boolean
  /** @see [[scrollUp]]*/
  su(param?: number): boolean

  /**  CSI Ps T  Scroll down Ps lines (default = 1) (SD). */
  scrollDown(param?: number): boolean
  /** @see [[scrollDown]]*/
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
    (See discussion of "Title Modes").
```
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
```
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
  ```
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
```
```
    Example call:
```
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
  /**```CSI > Ps; Ps t
  Set one or more features of the title modes.  Each parameter
  enables a single feature.
    Ps = 0  -> Set window/icon labels using hexadecimal.
    Ps = 1  -> Query window/icon labels using hexadecimal.
    Ps = 2  -> Set window/icon labels using UTF-8.
    Ps = 3  -> Query window/icon labels using UTF-8.  (See dis-
    cussion of "Title Modes")
XXX VTE bizarelly echos this:
```
*/
  setTitleModeFeature(...args: string[]): boolean
  setWarningBellVolume(param?: number): boolean
  decswbv(param?: number): boolean
  setMarginBellVolume(param?: number): boolean
  /**
   *```
   CSI Pt; Pl; Pb; Pr; Pp; Pt; Pl; Pp$ v
     Copy Rectangular Area (DECCRA, VT400 and up).
       Pt; Pl; Pb; Pr denotes the rectangle.
       Pp denotes the source page.
       Pt; Pl denotes the target location.
       Pp denotes the target page.
   NOTE: xterm doesn't enable this code by default.
```
   */
  copyRectangle(...args: string[]): boolean
  /**  @see [[copyRectangle]]  */
  deccra(...args: string[]): boolean
  /**
   * ```
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
```
   */
  enableFilterRectangle(...args: string[]): boolean
  /**  @see [[enableFilterRectangle]]  */
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
  /**  @see [[requestParameters]]  */
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
  /**  @see [[selectChangeExtent]]  */
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
  /**  @see [[fillRectangle]]  */
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
   * it contains all tput operations bind to [[input]] so automatically call [[_write]]  using the return value. Example:
   * `this.put.pad()` is the equivalent to `this._write(this.tput.pad())`.
   */
  put: { [s: string]: (...args: any[]) => any }
  cursorHidden: boolean
  mouseEnabled: boolean
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
  ``button'' parameter is a bitmask indicating which buttons are
       pressed:
       Pb = 0  <- no buttons down.
       Pb & 1  <- right button down.
       Pb & 2  <- middle button down.
       Pb & 4  <- left button down.
       Pb & 8  <- M4 button down.
  ``row'' and``column'' parameters are the coordinates of the
       locator position in the xterm window, encoded as ASCII deci-
       mal.
     The``page'' parameter is not used by xterm, and will be omit-
     ted.
```
  
   */
  requestLocatorPosition(param?: string, callback?: ProgramResponseCallback): boolean
  /** @see [[requestLocatorPosition]] */
  reqmp(param?: string, callback?: ProgramResponseCallback): boolean
  /** @see [[requestLocatorPosition]] */
  req_mouse_pos(param?: string, callback?: ProgramResponseCallback): boolean
  /** @see [[requestLocatorPosition]] */
  decrqlp(param?: string, callback?: ProgramResponseCallback): boolean
  /**
```
 CSI P m SP }
 Insert P s Column(s) (default = 1) (DECIC), VT420 and up.
 NOTE: xterm doesn't enable this code by default.
```
*/
  insertColumns(...args: string[]): boolean
  /** @see [[insertColumns]] */
  decic(...args: string[]): boolean
  /**
```
 CSI P m SP ~
 Delete P s Column(s) (default = 1) (DECDC), VT420 and up
 NOTE: xterm doesn't enable this code by default.
```
   */
  deleteColumns(...args: string[]): boolean
  /**
   * @see [[deleteColumns]]
   */
  decdc(...args: string[]): boolean
  out(param: string, ...args: any[]): boolean
  sigtstp(callback?: ProgramResponseCallback): boolean
  pause(callback?: ProgramResponseCallback): Function
  resume: () => void
  /**
   * Triggered when native events in the host terminal window .
   **/
  on(e: 'mouse', c: (e: GpmEvent) => void): this
  //  on(e: 'response', c: (e: any) => void): this
  /**
   * Triggered when the terminal window is resized.
   * */
  on(e: 'resize', c: (e: { winch: boolean; cols: number; rows: number }) => void): this
  /**
   * Triggered when the terminal window gains focus n the host window manager. For exmmple when the user
   * switchst form another application to the terminal with ctrl-tab.  Notice that these are native events,
   * ocurring outside the terminal application.
   */
  on(e: 'focus', c: (e: any) => void): this
  /**
   * Triggered when the terminal window loose focus host window manager. For exmmple when the user switchs
   * from the shell to another form another application . Notice that these are native events, ocurring
   * outside the terminal application.
   */
  on(e: 'blur', c: (e: any) => void): this

  /**
   * Triggered on any key press. If you need to listen only for particular keys, use `'key'`. For example:
   *
   * ```program.on('key tab', (ch, key)=>{})```
   */
  on(e: 'keypress', c: Widgets.KeyEventListener): this
  /**
   * Received when blessed notices something untoward (output is not a tty, terminfo not found, etc).
   */
  on(event: 'warning', callback: (text: string) => void): this
  on(e: string, c: (e: any) => void): this
}
