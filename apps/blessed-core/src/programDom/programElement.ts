import { Element } from '../dom'
import { ProgramDocument } from './programDocument'

export class ProgramElement extends Element {

  constructor(public readonly tagName: string, ownerDocument: ProgramDocument) {
    super(tagName, ownerDocument)
  }

  get parentNode(): ProgramElement | ProgramDocument {
    return this._parentNode as any
  }

  get absoluteLeft() {
    let x = this._left
    let n: ProgramElement | ProgramDocument  = this
    while (n.parentNode !== n.ownerDocument) {
      x = x + (n.parentNode as ProgramElement).left
      n = n.parentNode
    }
    return x
  }

  get absoluteTop() {
    let y = this._y
    let n: ProgramElement | ProgramDocument  = this
    while (n.parentNode !== n.ownerDocument) {
      y = y + (n.parentNode as ProgramElement).top
      n = n.parentNode
    }
    return y
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

  private _ch: string = ' '

  public get ch(): string {
    return this._ch
  }
  public set ch(value: string) {
    this._ch = value
  }

  getChild(index: number): ProgramElement {
    return this.children.item(index) as ProgramElement
  }
  getChildCount(): number {
    return this.children.length
  }

}

type Color= string
