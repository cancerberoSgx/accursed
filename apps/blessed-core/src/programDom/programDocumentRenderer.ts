import { ProgramElement, StylePropsImpl } from './programElement'
import { Program } from '../declarations/program'
import { array } from 'misc-utils-of-mine-generic'
import { TextNode } from '../dom/text'
import { inspect } from 'util'
import { trimRightLines } from '../util'
import { ProgramTextNode } from './programTextNode'
import { getBoxStyleChar, BorderSide } from './boxes'

export class ProgramDocumentRenderer {
  private debug: boolean
  private _program: Program
  public get program(): Program {
    return this._program
  }
  private debugBuffer: string[][] = []
  private ch: string
  private defaultStyle: StylePropsImpl = new StylePropsImpl({
    bg: 'black',
    fg: 'white'
  })
  // private bg = 'blxte'

  constructor(options: Options) {
    this._program = options.program
    this.debug = options.debug || false
    this.ch = options.defaultChar || ' '
    if (this.debug) {
      this.debugBuffer = array(this._program.rows).map(c => array(this._program.cols).map(c => (this.ch)))
    }
  }

  renderElement(el: ProgramElement) {
    this.renderElementWithoutChildren(el)
    let lastAbsLeft: number = el.absoluteLeft, lastAbsTop: number = el.absoluteTop
    for (let c of  el.childNodes) {
      if (c instanceof  TextNode) {
        const y = lastAbsTop
        const x = lastAbsLeft
        const s =  c.textContent || ''
        this.write(y, x,s)
        lastAbsLeft = x
        lastAbsTop = y + 1
      } else if (c instanceof ProgramElement) {
        this.renderElement(c)
      } else {
        this.log('Element type invalid: ' + inspect(c))
      }
    }
  }

  protected   log(s: string): any {
    // console.log(s)
  }

  printBuffer(linesTrimRight?: boolean) {
    const s =  this.debugBuffer.map(l => l.join('')).join('\n')
    return linesTrimRight ? trimRightLines(s) : s
  }

  renderElementWithoutChildren(el: ProgramElement) {
    this.setStyle(el.props)
    const ay = el.absoluteTop , ax = el.absoluteLeft
    for (let i = 0; i < el.props.height; i++) {
      this.write(ay + i, ax, this._program.repeat(el.props.ch || this.ch, el.props.width))
    }
  }

  setStyle(props: StylePropsImpl) {
    if (props.bg) {
      this._program.bg(props.bg)
    }
    if (props.fg) {
      this._program.fg(props.fg)
    }
  }

  eraseElement(el: ProgramElement): any {
    this.setStyle(this.defaultStyle)
    const ay = el.absoluteTop , ax = el.absoluteLeft
    for (let i = 0; i < el.props.height; i++) {
      this.write(ay + i, ax, this._program.repeat(this.ch, el.props.width))
    }
  }

  write(y: number, x: number, s: string) {
    this._program.cursorPos(y, x)
    this._program._write(s)
    if (this.debug) {
      for (let i = 0; i < s.length; i++) {
        this.debugBuffer[y][x + i] = s[i]
      }
    }
  }

  drawElementBorder(el: ProgramElement) {
   if (!el.props.border || !el.props.border.type) {
     return
   }
   this.setStyle(el.props.border)
   const { xi, xl, yi, yl } = { xi: el.absoluteLeft , xl: el.absoluteLeft + el.props.width , yi: el.absoluteTop , yl: el.absoluteTop + el.props.height  }
   this.write(yi, xi, getBoxStyleChar(el.props.border.type, BorderSide.topLeft))
   this.write(yi, xl - 1, getBoxStyleChar(el.props.border.type, BorderSide.topRight))
   this.write(yl - 1, xi, getBoxStyleChar(el.props.border.type, BorderSide.bottomLeft))
   this.write(yl - 1, xl - 1, getBoxStyleChar(el.props.border.type, BorderSide.bottomRight))
   for (let j = yi + 1; j < yl - 1; j++) {
    this.write(j, xi, getBoxStyleChar(el.props.border.type, BorderSide.left))
    this.write(j, xl - 1, getBoxStyleChar(el.props.border.type, BorderSide.right))
  }
   for (let i = xi + 1; i < xl - 1; i++) {
    this.write(yi, i, getBoxStyleChar(el.props.border.type, BorderSide.top))
    this.write(yl - 1, i, getBoxStyleChar(el.props.border.type, BorderSide.bottom))
  }
 }

}

interface Options {
  program: Program
  debug?: boolean
  defaultChar?: string
}
