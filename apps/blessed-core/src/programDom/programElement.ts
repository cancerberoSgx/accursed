import { Node, NodeType, Element } from '../dom';
import { Program } from '../declarations/program';

export class ProgramElement extends Element{

  // constructor(readonly nodeType: NodeType,  private program: Program) {
  //   super(nodeType)
  // }
  private _x: number;
  private _y: number;
  private _width: number;
  private _height: number;

  get ax() {
    let x = this._x
    let n : Node = this
    while(n.parentNode!==n.ownerDocument) {
      // x = x + n.parentNode
    }
    return 1
  }

  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = value;
  }

  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }

  get x(): number {
    return this._x;
  }
  set x(value: number) {
    this._x = value;
  }
  get y(): number {
    return this._y;
  }
  set y(value: number) {
    this._y = value;
  }
} 