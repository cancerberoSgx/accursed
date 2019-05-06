import { Node, NodeType, Element } from '../dom';
import { Program } from '../declarations/program';
import { ProgramDocument } from './programDocument';

export class ProgramElement extends Element {
  

  constructor(public readonly tagName: string, ownerDocument: ProgramDocument) {
    super(tagName, ownerDocument)
  }


  get parentNode():  ProgramElement|ProgramDocument {
    return this._parentNode as any
  }

  get ax() {
    let x = this._x
    let n : ProgramElement|ProgramDocument  = this
    while(n.parentNode!==n.ownerDocument) {
      x = x + (n.parentNode as ProgramElement).x
      n = n.parentNode
    }
    return x
  }

  get ay() {
    let y = this._y
    let n : ProgramElement|ProgramDocument  = this
    while(n.parentNode!==n.ownerDocument) {
      y = y + (n.parentNode as ProgramElement).y
      n = n.parentNode
    }
    return y
  }

  private _width: number=0;

  public get width(): number {
    return this._width;
  }

  public set width(value: number) {
    this._width = value;
  }

  private _height: number=0;

  public get height(): number {
    return this._height;
  }

  public set height(value: number) {
    this._height = value;
  }

  private _x: number=0;

  get x(): number {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  private _y: number=0;

  get y(): number {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  private _bg: Color|undefined;

  public get bg(): Color {
    return this._bg;
  }

  public set bg(value: Color) {
    this._bg = value;
  }

  private _fg: Color|undefined;

  public get fg(): Color {
    return this._fg;
  }

  public set fg(value: Color) {
    this._fg = value;
  }

  private _ch: string;
  public get ch(): string {
    return this._ch;
  }
  public set ch(value: string) {
    this._ch = value;
  }


} 

type Color= string |string