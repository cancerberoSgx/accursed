import { Node, NodeType, Document } from '../dom';
import { Program } from '../declarations/program';

export class ProgramDocument extends Document{

  constructor(private program: Program) {
    super()
  }
  
} 