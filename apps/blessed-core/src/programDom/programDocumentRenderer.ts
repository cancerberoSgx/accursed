import { ProgramElement } from './programElement'
import { Program } from '../declarations/program'
import { array } from 'misc-utils-of-mine-generic'
import { TextNode } from '../dom/text'
import { inspect } from 'util'
import { trimRightLines } from '../util';

export class ProgramDocumentRenderer {
  // renderString(y: number, x: number, s: string) {
    
  // }
  private debug: boolean
  private _program: Program;
  public get program(): Program {
    return this._program;
  }
  private debugBuffer: string[][] = []
  private ch: string
  private bg = 'black'
  private fg = 'white'


  constructor(options: Options) {
    this._program = options.program
    this.debug = options.debug || false
    this.ch = options.defaultChar || ' '
    if (this.debug) {
      this.debugBuffer = array(this._program.rows).map(c => array(this._program.cols).map(c => (this.ch)))
    }
  }
  // renderText(0,0, counter+' fps')
  renderElement(el: ProgramElement) {
    this.renderElementWithoutChildren(el)
    for (let c of  el.childNodes) {
      if (c instanceof ProgramElement) {
        this.renderElement(c)
      } else {
        this.log('Element type invalid: ' + inspect(c))
      }
    }
    // this.program.flush()
  }
  // renderTextNode(c: TextNode): any {
  //   const parent = c.parentNode as ProgramElement
  // }

  protected   log(s: string): any {
    console.log(s)
  }

  printBuffer(linesTrimRight?: boolean) {
    const s =  this.debugBuffer.map(l => l.join('')).join('\n')
    return linesTrimRight ? trimRightLines(s) : s
  }

  renderElementWithoutChildren(el: ProgramElement) {
    if (el.bg) {
      this._program.bg(el.bg)
    }
    if (el.fg) {
      this._program.fg(el.fg)
    }
    const ay = el.absoluteTop , ax = el.absoluteLeft
    for (let i = 0; i < el.height; i++) {
      this.write(ay + i, ax, this._program.repeat(el.ch || this.ch, el.width))
    }
  }

  eraseElement(el: ProgramElement): any {
      this._program.bg(this.bg)
      this._program.fg(this.fg)
      // this.program._attr(['default bg', 'default fg'], true) 
// this.program.resetColors()
    const ay = el.absoluteTop , ax = el.absoluteLeft
    for (let i = 0; i < el.height; i++) {
      this.write(ay + i, ax, this._program.repeat(this.ch, el.width))
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
}

interface Options {
  program: Program
  debug?: boolean
  defaultChar?: string
}
