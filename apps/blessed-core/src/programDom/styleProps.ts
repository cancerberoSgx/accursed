import { AbstractPropsImpl, StyleProps } from "./types";

export class StylePropsImpl extends AbstractPropsImpl implements StyleProps {
  constructor(p?: StyleProps) {
    super();
    if (p) {
      this.bg = p.bg;
      this.fg = p.fg;
      this.ch = p.ch;
    }
  }
  getObject() {
    return {
      bg: this._bg,
      fg: this._fg,
      ch: this._ch,
      bold: this._bold,
      underline: this._underline,
      standout: this._standout,
      invisible: this._invisible,
      blink: this._blink
    };
  }
  private _bold: boolean | undefined;
  public get bold(): boolean | undefined {
    return this._bold;
  }
  public set bold(value: boolean | undefined) {
    this._bold = value;
  }
  private _bg: Color | undefined;
  public get bg(): Color | undefined {
    return this._bg;
  }
  public set bg(value: Color | undefined) {
    this._bg = value;
  }
  private _fg: Color | undefined;
  public get fg(): Color | undefined {
    return this._fg;
  }
  public set fg(value: Color | undefined) {
    this._fg = value;
  }
  private _ch: string | undefined;
  public get ch(): string | undefined {
    return this._ch;
  }
  public set ch(value: string | undefined) {
    this._ch = value;
  }
  private _underline: boolean | undefined;
  public get underline(): boolean | undefined {
    return this._underline;
  }
  public set underline(value: boolean | undefined) {
    this._underline = value;
  }
  private _blink: boolean | undefined;
  public get blink(): boolean | undefined {
    return this._blink;
  }
  public set blink(value: boolean | undefined) {
    this._blink = value;
  }
  private _standout: boolean | undefined;
  public get standout(): boolean | undefined {
    return this._standout;
  }
  public set standout(value: boolean | undefined) {
    this._standout = value;
  }
  private _invisible: boolean | undefined;
  public get invisible(): boolean | undefined {
    return this._invisible;
  }
  public set invisible(value: boolean | undefined) {
    this._invisible = value;
  }
}
export type Color = string;
