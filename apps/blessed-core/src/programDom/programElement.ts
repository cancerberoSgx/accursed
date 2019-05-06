import { Element, NamedNodeMap, Attr } from '../dom'
import { ProgramDocument } from './programDocument'
import { objectMap } from 'misc-utils-of-mine-generic';
import { BorderStyle } from './boxes';

export class ProgramElement extends Element {
  props: ElementProps;
  // originalAttributes: NamedNodeMap<Attr>;

  constructor(public readonly tagName: string, ownerDocument: ProgramDocument) {
    super(tagName, ownerDocument)
    this.props = new ElementProps()
    // this.originalAttributes = this.attributes
  }

  // get attributes() {
  //   const props = this.props.getObject()
  //   this._attributes = {...this._attributes, ...objectMap(props, name=>({name, value: props[name]+''}))}
  //   return this.originalAttributes
  // }
  
  get parentNode(): ProgramElement | ProgramDocument {
    return this._parentNode as any
  }

  get absoluteLeft() {
    let x = this.props.left
    let n: ProgramElement | ProgramDocument  = this
    while (n.parentNode !== n.ownerDocument) {
      x = x + (n.parentNode as ProgramElement).props.left
      n = n.parentNode
    }
    return x
  }

  get absoluteTop() {
    let y = this.props.top
    let n: ProgramElement | ProgramDocument  = this
    while (n.parentNode !== n.ownerDocument) {
      y = y + (n.parentNode as ProgramElement).props.top
      n = n.parentNode
    }
    return y
  }


  // getChild(index: number): ProgramElement {
  //   return this.children.item(index) as ProgramElement
  // }
  // getChildCount(): number {
  //   return this.children.length
  // }

}

interface Padding {
  top: number, left: number, right: number, bottom: number
}
// interface Border {
//   style
// }

export class StyleProps {

  constructor(p: {bg?: Color, fg?: Color, ch?: string} = {}) {
this.bg = p.bg
this.fg = p.fg
this.ch = p.ch 
  }
  getObject() {
    return {
      bg: this._bg,
      fg: this._fg,
      ch: this._ch,
    }
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


class BorderProps extends StyleProps {
  private _type: BorderStyle | undefined;
  public get type(): BorderStyle | undefined {
    return this._type;
  }
  public set type(value: BorderStyle | undefined) {
    this._type = value;
  }
}

export class ElementProps extends StyleProps {

  getObject() {
    return {
      ...super.getObject(),
      width: this._width,
      height: this._height,
      top: this._y,
      left: this._left,
      padding: this._padding,
      border: this._border
// content: this._content
    }
  }
  private _border: BorderProps|undefined;
  public get border(): BorderProps|undefined {
    return this._border;
  }
  public set border(value: BorderProps|undefined) {
    this._border = value;
  }
  // private _content: string;
  // public get content(): string {
  //   return this._content;
  // }
  // public set content(value: string) {
  //   this._content = value;
  // }

  private _padding: Padding|undefined;
  public get padding(): Padding|undefined {
    return this._padding;
  }
  public set padding(value: Padding|undefined) {
    this._padding = value;
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
