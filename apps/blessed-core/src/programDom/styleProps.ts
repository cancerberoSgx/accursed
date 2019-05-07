import { nonEnumerableMember } from '../util/misc'
import { Attrs, StyleProps } from './types'

export class AttrsImpl implements Partial<Attrs> {
  constructor(p?: Partial<StyleProps>) {
    // super()

    // this._bold = undefined as any
    // this._bg = undefined as any
    // this._fg = undefined as any
    // this._underline = undefined as any
    // this._ch = undefined as any
    // this._blink = undefined as any
    // this._invisible = undefined as any
    // this._standout = undefined as any

    if (p) {
      for (let k of AttrsImpl.attr_props) {
        // @ts-ignore
        this['_' + k] = p[k]
      }
      // nextTick(()=>this._non_iterable())
      // this._bold = p.bold
      // this._bg = p.bg
      // this._fg = p.fg
      // this._underline = p.underline
      // this._ch = p.ch
      // this._blink = p.blink
      // this._invisible = p.invisible
    }
    this._non_iterable()
  }

  // enumerableProperty()
  private static attr_props = ['bg', 'fg', 'bold', 'underline', 'standout', 'ch', 'blink', 'invisible']

  private _non_iterable() {
    for (let p of AttrsImpl.attr_props) {
      nonEnumerableMember(this, '_' + p)
    }
  }

    // nonEnumerableMember(this, '_bg')
    // nonEnumerableMember(this, '_fg')
    // nonEnumerableMember(this, '_bold')
    // nonEnumerableMember(this, '_underline')
    // nonEnumerableMember(this, '_standout')
    // nonEnumerableMember(this, '_ch')
    // nonEnumerableMember(this, '_blink')
    // nonEnumerableMember(this, '_invisible')

  // getObject() {
  //   return {
  //     bg: this._bg,
  //     fg: this._fg,
  //     ch: this._ch,
  //     bold: this._bold,
  //     underline: this._underline,
  //     standout: this._standout,
  //     invisible: this._invisible,
  //     blink: this._blink
  //   }
  // }
  private _bold: boolean | undefined
  public get bold(): boolean  | undefined {
    return !!this._bold
  }
  public set bold(value: boolean | undefined) {
    this._bold = !!value
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
  private _ch: string | undefined
  public get ch(): string | undefined {
    return this._ch
  }
  public set ch(value: string | undefined) {
    this._ch = value
  }
  private _underline: boolean | undefined
  public get underline(): boolean | undefined {
    return this._underline
  }
  public set underline(value: boolean | undefined) {
    this._underline = value
  }
  private _blink: boolean | undefined
  public get blink(): boolean | undefined {
    return this._blink
  }
  public set blink(value: boolean | undefined) {
    this._blink = value
  }
  private _standout: boolean | undefined
  public get standout(): boolean | undefined {
    return this._standout
  }
  public set standout(value: boolean | undefined) {
    this._standout = value
  }
  private _invisible: boolean | undefined
  public get invisible(): boolean | undefined {
    return this._invisible
  }
  public set invisible(value: boolean | undefined) {
    this._invisible = value
  }
}
export class StylePropsImpl extends AttrsImpl implements Partial<StyleProps> {
}
export type Color = string

export type PAttrs = Partial<Attrs>

// AttrsImpl.prototype.propertyIsEnumerable = function (this: any, p:string){return typeof this[p]!=='function' && !p.startsWith('_')}
