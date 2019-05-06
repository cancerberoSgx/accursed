import { ProgramElement } from './programElement'
import { Program } from '../declarations/program'
import { array } from 'misc-utils-of-mine-generic'
import { TextNode } from '../dom/text'
import { inspect } from 'util'

export class ProgramDocumentRenderer {
  private debug: boolean
  private program: Program
  private debugBuffer: string[][]
  private ch: string

  constructor(options: Options) {
    this.program = options.program
    this.debug = options.debug || false
    this.ch = options.defaultChar || ' '
    if (this.debug) {
      this.debugBuffer = array(this.program.rows).map(c => array(this.program.cols).map(c => (this.ch)))
    }
  }

  renderElement(el: ProgramElement) {
    this.renderElementWithoutChildren(el)
    for (let c of  el.childNodes) {
      // if(c instanceof TextNode){
      //   this.renderTextNode(c)
      // }
      // else
      if (c instanceof ProgramElement) {
        this.renderElementWithoutChildren(c)
      } else {
        this.log('Element type invalid: ' + inspect(c))
      }
    }
  }
  renderTextNode(c: TextNode): any {
    const parent = c.parentNode as ProgramElement
  }

  protected   log(s: string): any {
    console.log(s)
  }

  printBuffer() {
    return this.debugBuffer.map(l => l.join('')).join('\n')
  }

  renderElementWithoutChildren(el: ProgramElement) {
    if (el.bg) {
      this.program.bg(el.bg)
    }
    if (el.fg) {
      this.program.fg(el.fg)
    }
    const ay = el.absoluteTop , ax = el.absoluteLeft
    for (let i = 0; i < el.height; i++) {
      this.write(ay + i, ax, this.program.repeat(el.ch || this.ch, el.width))
    }
  }

  private write(y: number, x: number, s: string) {
    this.program.cursorPos(y, x)
    this.program._write(s)
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
