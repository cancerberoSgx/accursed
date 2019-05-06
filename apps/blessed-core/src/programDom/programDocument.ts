import { Node, NodeType, Document } from '../dom';
import { Program } from '../declarations/program';
import { ProgramElement } from './programElement';

export class ProgramDocument extends Document{

  constructor() {
    super()
  }
  
  createElement(t: string) {
    return new ProgramElement(t, this)
  }
} 