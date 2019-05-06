import { array } from 'misc-utils-of-mine-generic'
import { inspect } from 'util'
import { Program } from '../declarations/program'
import { isText } from '../dom/nodeUtil'
import { TextNode } from '../dom/text'
import { ProgramElement } from '../programDom/programElement'
import { StylePropsImpl } from '../programDom/styleProps'
import { StyleProps } from '../programDom/types'
import { BorderSide, BorderStyle, getBoxStyleChar } from '../util/border'
import { trimRightLines } from '../util/misc'
import { destroyProgram } from '../util/util'

type Point = string

export class ProgramDocumentRenderer {

  private debug: boolean
  private _program: Program
  public get program(): Program {
    return this._program
  }

  private debugBuffer: Point[][] = []

  private ch: string

  private defaultStyle: StylePropsImpl = new StylePropsImpl({
    bg: 'black',
    fg: 'white'
  })

  constructor(options: Options) {
    this._program = options.program
    this.debug = options.debug || false
    this.ch = options.defaultChar || ' '
    if (this.debug) {
      this.debugBuffer = array(this._program.rows).map(c => array(this._program.cols).map(c => (this.ch)))
    }
  }

  destroy() {
    destroyProgram(this.program)
  }

  renderCounter = 0
  renderElement(el: ProgramElement) {
    el.beforeRender()
    this.renderElementWithoutChildren(el)
    el.afterRenderWithoutChildren()
    let lastAbsLeft: number = el.absoluteContentLeft, lastAbsTop: number = el.absoluteContentTop
    Array.from(el.childNodes).forEach((c, i, a) => {
      if (c instanceof  TextNode) {
        // TODO: word wrap, correct char width for unicode.
        const y = lastAbsTop
        const x = lastAbsLeft
        const s =  c.textContent || ''
        this.write(y, x,s)
        // Heads up : if next child is also text, we keep writing on the same line, if not, on a new  line.
        const nextChildIsText = isText(a[i + 1])// && !s.includes('\n') && !(a[i+1].textContent||'').includes('\n')
        lastAbsLeft = x +  (nextChildIsText ? s.length : 0)
        lastAbsTop = y +  (nextChildIsText ? 0 : 1)
      } else if (c instanceof ProgramElement) {
        this.renderElement(c)
      } else {
        this.log('Element type invalid: ' + inspect(c))
      }
    })
    el.afterRender()
    el._renderCounter = this.renderCounter ++
  }

  protected   log(s: string): any {
    console.error(s)
  }

  printBuffer(linesTrimRight?: boolean) {
    const s =  this.debugBuffer.map(l => l.join('')).join('\n')
    return linesTrimRight ? trimRightLines(s) : s
  }

  renderElementWithoutChildren(el: ProgramElement) {
    this.setStyle(el.props)
    const yi = el.absoluteContentTop , xi = el.absoluteContentLeft, contentHeight = el.contentHeight, contentWidth = el.contentWidth
    for (let i = 0; i < contentHeight; i++) {
      this.write(yi + i, xi, this._program.repeat(el.props.ch || this.ch, contentWidth))
    }
    this.drawElementBorder(el)
  }

  setStyle(props: StyleProps) {
    if (props.bg) {
      this._program.bg(props.bg)
    }
    if (props.fg) {
      this._program.fg(props.fg)
    }
  }

  eraseElement(el: ProgramElement): any {
    this.setStyle(this.defaultStyle)
    const yi = el.absoluteTop , xi = el.absoluteLeft
    for (let i = 0; i < el.props.height; i++) {
      this.write(yi + i, xi, this._program.repeat(this.ch, el.props.width))
    }
  }

  protected write(y: number, x: number, s: string) {
    this._program.cursorPos(y, x)
    this._program._write(s)
    if (this.debug) {
      for (let i = 0; i < s.length; i++) {
        if (this.debugBuffer[y]) {
          this.debugBuffer[y][x + i] = s[i]
        }
      }
    }
  }

  drawElementBorder(el: ProgramElement) {
    if (!el.props.border) {
      return
    }
    const type = el.props.border.type || BorderStyle.light
    this.setStyle({ ...el.props.border, ...el.props })
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

interface Options {
  program: Program
  debug?: boolean
  defaultChar?: string
}
