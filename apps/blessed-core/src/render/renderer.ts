import { array } from 'misc-utils-of-mine-generic'
import { inspect } from 'util'
import { Program, ProgramOptions } from '../declarations/program'
import { Node } from '../dom'
import { isText } from '../dom/nodeUtil'
import { TextNode } from '../dom/text'
import { ProgramElement } from '../programDom/programElement'
import { AttrsImpl, PAttrs } from '../programDom/styleProps'
import { Attrs } from '../programDom/types'
import { BorderSide, BorderStyle, getBoxStyleChar } from '../util/border'
import { trimRightLines } from '../util/misc'
import { createProgram, destroyProgram } from '../util/util'

const defaultAttrs: Attrs = {
  bg: 'black',
  // bg: '#1e1e1e',
  fg: 'white',
  bold: false,
  invisible: false,
  underline: false,
  standout: false,
  ch: ' ',
  blink: false

}
export class ProgramDocumentRenderer {

  private useBuffer: boolean
  private _program: Program

  public get program(): Program {
    return this._program
  }

  private buffer: PAttrs[][] = []

  private ch: string

  private defaultStyle: PAttrs
  private currentAttrs: PAttrs

  constructor(options: RendererOptions) {
    this._program = options.program || createProgram(options.programOptions)
    this.useBuffer = !options.noBuffer || true
    this.ch = options.defaultChar || ' '
    this.defaultStyle = new AttrsImpl(defaultAttrs)
    this.currentAttrs = {
      ch:  ' ',
      ...this.defaultStyle
    }
    this.bypassingBuffer(() => this.fillAll())
    this.resetBuffer()
  }

  destroy() {
    this.fillAll()
    this.resetStyle()
    this.resetBuffer()
    destroyProgram(this.program)
  }

  fillAll(ch= ' ') {
    this.fillRectangle(0, 0, this.program.rows, this.program.cols, ch)
  }

  bypassingBuffer(f: () => void) {
    const current = this.useBuffer
    this.useBuffer = false
    f()
    this.useBuffer = current
  }
  resetBuffer() {
    if (this.useBuffer) {
      this.buffer .length = 0
      delete    this.buffer
      this.buffer = array(this._program.rows).map(c => array(this._program.cols).map(c => ({ ...this.currentAttrs })))
    }

  }

  resetStyle() {
    this.setStyle(this.defaultStyle)
  }

  // private lastRenderedNode: Node|undefined;
  private lastAbsLeft: number = 0
  private lastAbsTop: number = 0
  private renderCounter = 0
  renderElement(el: ProgramElement) {
    el.beforeRender()
    this.renderElementWithoutChildren(el)
    el.afterRenderWithoutChildren()
    this.lastAbsLeft = el.absoluteContentLeft,
    this.lastAbsTop = el.absoluteContentTop
    // this.lastRenderedNode = undefined
    Array.from(el.childNodes).forEach((c, i, a) => {
      if (c instanceof  TextNode) {
        // TODO: word wrap, correct char width for unicode.
        this.renderText(c, a[i + 1])
        // this.lastRenderedNode = c
      } else if (c instanceof ProgramElement) {
        this.renderElement(c)
      } else {
        this.log('Element type invalid: ' + inspect(c))
      }
    })
    el.afterRender()
    el._renderCounter = this.renderCounter ++
    return el
  }

  private renderText(c: TextNode, nextNode: Node) {
    // const y = lastAbsTop;
    // const x = lastAbsLeft;
    const s = c.textContent || ''
    this.write(this.lastAbsTop,this.lastAbsLeft, s)
    // Heads up : if next child is also text, we keep writing on the same line, if not, on a new  line.
    const nextChildIsText = isText(nextNode)
    this.lastAbsLeft = this.lastAbsLeft + (nextChildIsText ? s.length : 0)
    this.lastAbsTop = this.lastAbsTop + (nextChildIsText ? 0 : 1)
    // return { lastAbsTop, lastAbsLeft };
  }

  protected   log(s: string): any {
    console.error(s)
  }

  /**
   * The [[buffer]] should contain the same content as what's displayed currently in the screen. Useful for tests.
   */
  printBuffer(linesTrimRight?: boolean) {
    // debug(JSON.stringify(this.buffer.slice(1,2), null, 2))
    const s =  this.buffer.map(l => l.map(l => l.ch).join('')).join('\n')
    const r =  linesTrimRight ? trimRightLines(s) : s
    return r
  }

  renderElementWithoutChildren(el: ProgramElement) {
    this.setStyle(el.props)
    const yi = el.absoluteContentTop , xi = el.absoluteContentLeft, contentHeight = el.contentHeight, contentWidth = el.contentWidth
    for (let i = 0; i < contentHeight; i++) {
      this.write(yi + i, xi, this._program.repeat(el.props.ch || this.ch, contentWidth))
    }
    this.drawElementBorder(el)
  }

  setStyle(props: PAttrs) {
    if (props.bg) {
      this._program.bg(props.bg)
      if (this.useBuffer) {
        this.currentAttrs.bg = props.bg
      }
    }
    if (props.fg) {
      this._program.fg(props.fg)
      if (this.useBuffer) {
        this.currentAttrs.fg = props.fg
      }
    }
  }

  eraseElement(el: ProgramElement): any {
    this.setStyle(this.defaultStyle)
    const yi = el.absoluteTop , xi = el.absoluteLeft
    this.fillRectangle(yi, xi, el.props.height, el.props.width)
  }

  fillRectangle(top: number, left: number, height: number, width: number, ch= this.ch) {
    for (let i = 0; i < height; i++) {
      this.write(top + i, left, this._program.repeat(ch, width))
    }
  }

  /**
   * All writes to program must be from here
   */
  protected write(y: number, x: number, s: string) {
    this._program.cursorPos(y, x)
    this._program._write(s)
    if (this.useBuffer) {
      for (let i = 0; i < s.length; i++) {
        if (this.buffer[y]) {
          this.buffer[y][x + i] = { ch: s[i], bg: this.currentAttrs.bg || '', fg: this.currentAttrs.fg || '' }
        }
      }
    }
  }

  drawElementBorder(el: ProgramElement) {
    const border = el.props.getBorder()
    if (!border) {
      return
    }
    const type = border.type || BorderStyle.light
    this.setStyle({ ...border, ...el.props })
    const { xi, xl, yi, yl } = { xi: el.absoluteLeft , xl: el.absoluteLeft + el.props.width , yi: el.absoluteTop , yl: el.absoluteTop + el.props.height  }
    this.write(yi, xi, getBoxStyleChar(type, BorderSide.topLeft))
    this.write(yi, xl - 1, getBoxStyleChar(type, BorderSide.topRight))
    this.write(yl - 1, xi, getBoxStyleChar(type, BorderSide.bottomLeft))
    this.write(yl - 1, xl - 1, getBoxStyleChar(type, BorderSide.bottomRight))
    for (let j = yi + 1; j < yl - 1; j++) {
      this.write(j, xi, getBoxStyleChar(type, BorderSide.left))
      this.write(j, xl - 1, getBoxStyleChar(type, BorderSide.right))
    }
    for (let i = xi + 1; i < xl - 1; i++) {
      this.write(yi, i, getBoxStyleChar(type, BorderSide.top))
      this.write(yl - 1, i, getBoxStyleChar(type, BorderSide.bottom))
    }
  }

}

export interface RendererOptions {
  program?: Program
  /**
   * Program options for if I have to create it
   */
  programOptions?: ProgramOptions
  noBuffer?: boolean
  defaultChar?: string
}
