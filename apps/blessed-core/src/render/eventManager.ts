import { ProgramElement } from '../programDom';
import { Program, MouseEvent, KeyEvent } from '../declarations/program';

/**
 * auxiliary class that bind events with ProgramElements rendered by renderer
 */
export class EventManager {

  protected els: { [id: number]: { el: ProgramElement } } = {}
  constructor(protected program: Program) {
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onMouse = this.onMouse.bind(this)
    this.program.on('keypress', this.onKeyPress)
    program.on('mouse', this.onMouse)
  }

  register(el: ProgramElement) {
    this.els[el.internalId] = this.els[el.internalId] || { el }
  }

  onKeyPress(ch: string, e: KeyEvent): any {
    
  }

  onMouse(e: MouseEvent): any {

  }
}