import { Element, NamedNodeMap, Attr } from '../dom'
import { ProgramDocument } from './programDocument'
import { objectMap } from 'misc-utils-of-mine-generic'
import { BorderStyle, BorderSide } from './boxes'

export class ProgramElement extends Element {
  props: ElementPropsImpl

  constructor(public readonly tagName: string, ownerDocument: ProgramDocument) {
    super(tagName, ownerDocument)
    this.props = new ElementPropsImpl()
  }

  get parentNode(): ProgramElement | ProgramDocument {
    return this._parentNode as any
  }

  get absoluteLeft() {
    let x = this.props.left
    let n: ProgramElement | ProgramDocument  = this
    while (n.parentNode !== n.ownerDocument) {
      x = x + (n.parentNode as ProgramElement).props.left + ((n.parentNode as ProgramElement).props.padding && (n.parentNode as ProgramElement).props.padding!.left || 0) + ((n.parentNode as ProgramElement).props.border ? 1 : 0)
      n = n.parentNode
    }
    return x
  }

  get absoluteTop() {
    let y = this.props.top
    let n: ProgramElement | ProgramDocument  = this
    while (n.parentNode !== n.ownerDocument) {
      y = y + (n.parentNode as ProgramElement).props.top + ((n.parentNode as ProgramElement).props.padding && (n.parentNode as ProgramElement).props.padding!.top || 0) + ((n.parentNode as ProgramElement).props.border ? 1 : 0)
      n = n.parentNode
    }
    return y
  }

}

interface Padding {
  top: number,
  left: number,
  right: number,
  bottom: number
}

abstract class AbstractPropsImpl implements AbstractProps {
  abstract getObject(): {[a: string]: any}
  extend <P extends AbstractProps= AbstractProps>(p: P): void {
    Object.assign(this, p)
  }

}

export interface AbstractProps {
  // getObject(): {[a:string]:any}
  // extend <P extends AbstractProps=AbstractProps>(p : P):void
  }
export interface StyleProps extends AbstractProps {
  bg?: Color
  fg?: Color
  ch?: string
  bold?: boolean
  underline?: boolean
  standout?: boolean
  blink?: boolean
}
export class StylePropsImpl extends AbstractPropsImpl implements StyleProps {
  constructor(p: {bg?: Color, fg?: Color, ch?: string} = {}) {
    super()
    this.bg = p.bg
    this.fg = p.fg
    this.ch = p.ch
  }
  getObject() {
    return {
      bg: this._bg,
      fg: this._fg,
      ch: this._ch,
      bold: this._bold
    }
  }

  private _bold: boolean | undefined
  public get bold(): boolean | undefined {
    return this._bold
  }
  public set bold(value: boolean | undefined) {
    this._bold = value
  }
  private _bg: Color | undefined

  public get bg(): Color | undefined {
    return this._bg
  }

  public set bg(value: Color | undefined) {
    this._bg = value
  }

  private _fg: Color | undefined

  public get fg(): Color | undefined {
    return this._fg
  }

  public set fg(value: Color | undefined) {
    this._fg = value
  }

  private _ch: string  | undefined

  public get ch(): string | undefined {
    return this._ch
  }
  public set ch(value: string | undefined) {
    this._ch = value
  }
}
type Color= string

export interface BorderProps extends StyleProps {
  type?: BorderStyle
}
class BorderPropsImpl extends StylePropsImpl implements BorderProps {
  private _type: BorderStyle | undefined
  public get type(): BorderStyle | undefined {
    return this._type
  }
  public set type(value: BorderStyle | undefined) {
    this._type = value
  }
}
export interface ElementProps extends StyleProps {
  width?: number
  height?: number
  top?: number
  left?: number
  padding?: Padding
  border?: BorderProps
}
export class ElementPropsImpl extends StylePropsImpl implements ElementProps {

  getObject() {
    return {
      ...super.getObject(),
      width: this._width,
      height: this._height,
      top: this._y,
      left: this._left,
      padding: this._padding,
      border: this._border
    }
  }
  private _border: BorderPropsImpl | undefined
  public get border(): BorderPropsImpl | undefined {
    return this._border
  }
  public set border(value: BorderPropsImpl | undefined) {
    this._border = value
  }

  private _padding: Padding | undefined
  public get padding(): Padding | undefined {
    return this._padding
  }
  public set padding(value: Padding | undefined) {
    this._padding = value
  }

  private _width: number = 0

  public get width(): number {
    return this._width
  }

  public set width(value: number) {
    this._width = value
  }

  private _height: number = 0

  public get height(): number {
    return this._height
  }

  public set height(value: number) {
    this._height = value
  }

  private _left: number = 0

  get left(): number {
    return this._left
  }

  set left(value: number) {
    this._left = value
  }

  private _y: number = 0

  get top(): number {
    return this._y
  }

  set top(value: number) {
    this._y = value
  }

  private _bottom: number = 0
  public get bottom(): number {
    return this._bottom
  }
  public set bottom(value: number) {
    this._bottom = value
  }

  private _right: number = 0
  public get right(): number {
    return this._right
  }
  public set right(value: number) {
    this._right = value
  }

}
