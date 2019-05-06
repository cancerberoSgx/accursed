import { isElement } from '../dom/nodeUtil'
import { ProgramElement } from './programElement'

export class Layout extends ProgramElement {

  beforeRender(): void {
    for (let c of this.childNodes) {
      if (isElement(c)) {

      }
    }
  }

}
