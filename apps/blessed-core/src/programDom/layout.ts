import { Element, NamedNodeMap, Attr } from '../dom'
import { ProgramDocument } from './programDocument'
import { objectMap } from 'misc-utils-of-mine-generic'
import { BorderStyle, BorderSide } from './boxes'
import { ProgramElement } from './programElement'
import { isElement } from '../dom/nodeUtil'

export class Layout extends ProgramElement {

  beforeRender(): void {
    for (let c of this.childNodes) {
      if (isElement(c)) {

      }
    }
  }

}
