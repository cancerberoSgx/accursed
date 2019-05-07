import { LayoutOptions } from '../util'
import { BorderStyle } from '../util/border'
import { StylePropsImpl } from './styleProps'
import { BorderProps, ElementProps, Padding } from './types'


export class ElementPropsImpl extends StylePropsImpl implements Partial<ElementProps> {
  constructor() {
    super()
  }
  // getObject() {
  //   return {
  //     ...super.getObject(),
  //     width: this._width,
  //     height: this._height,
  //     top: this._top,
  //     left: this._left,
  //     padding: this._padding,
  //     border: this._border
  //   }
  // }
  private _border: BorderProps | undefined
  public get border(): BorderProps | undefined {
    return this._border as BorderProps | undefined 
  }
  public set border(value: BorderProps | undefined) {
    this._border = value ? (new BorderPropsImpl(value) as BorderProps ) : undefined
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
  private _top: number = 0
  get top(): number {
    return this._top
  }
  set top(value: number) {
    this._top = value
  }
  private _layout: LayoutOptions | undefined
  public get layout(): LayoutOptions | undefined {
    return this._layout
  }
  public set layout(value: LayoutOptions | undefined) {
    this._layout = value
  }
  childrenReady: () => boolean = () => { return false }
  afterRenderWithoutChildren = () => { }
  afterRender = () => { }
  beforeRender = () => { return false }
}

class BorderPropsImpl extends StylePropsImpl implements BorderProps {
  private _type: BorderStyle | undefined
  constructor(p: BorderProps) {
    super(p)
    this.type = p.type
  }
  public get type(): BorderStyle | undefined {
    return this._type
  }
  public set type(value: BorderStyle | undefined) {
    this._type = value
  }
}
