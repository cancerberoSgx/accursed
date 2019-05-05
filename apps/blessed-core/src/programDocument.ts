import { Document } from './dom';
import { Program } from '.';

export class ProgramDocument extends Document {
  constructor(private program: Program){
    super()
  }
}