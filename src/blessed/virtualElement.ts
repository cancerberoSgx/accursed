import { Element } from '../blessedTypes';
import { Component } from '../jsx';
import { setElementData } from './util';
/** 
 * Why do we need this if we have props? you cannot decalre structured data like <tabPanel><tab><title>... etc - - props. only allows 21 level
 * 
 * simulates to be a lessed node until the next iteration of createElement so the parent can recognize it abd extract its info, and discard it.
*/
export 
// abstract 
class VirtualComponent<P = {}, S = {}> extends Component<P, S> implements VirtualElement {
  // protected abstract getVirtualData(): P;

  render() {
    return null;
  }
  private static __isVirtualComponent = 123;
  private static VIRTUAL_DATA_OPTION = 'accursed.virtual.component';
  // constructor(p: P, s: S){
  //   super(p, s) // HEADS UP this is not yet lightqweight!
  //   //ALL THE DATA is in the props
  // }
  static isVirtualComponent(c: any): c is typeof VirtualComponent {
    return c && c.__isVirtualComponent === VirtualComponent.__isVirtualComponent;
  }
  static iVirtualElement(c: any): c is VirtualElement {
    return VirtualComponent.isVirtualComponent(c);
  }
  static createVirtualElement(c: any) {
    return c as VirtualElement;
  }
  loadVirtualData(e: Element) {
    setElementData(e, VirtualComponent.VIRTUAL_DATA_OPTION, this.props);
  }
  static createVirtualComponent<T>(p: T) { // TODO. this is not lightweight... 
    return new VirtualComponent(p, {}) 
  }
}
/** suggested format for virtual data ojbect provided by EACH child in the parent's setElementData array */
interface VirtualDataBase {
}
export type ParentVirtualData<T extends Partial<VirtualDataBase>> = T[];
// export functoin loadVirtualEement()
//  *TODO: probably we want to assign Node prototype to this one so calls does not fail - example: user add a clikhandler and createELnet try to add listener e.on(click... will fail)  .. 
// if that the case we make this interface extends Node  and we will force VirtualComponent to extend Node for good
// Object.assign(VirtualComponent.prototype, blessed.widget.Node.prototype, VirtualComponent.prototype)
interface VirtualElement // extends Node 
{
  /** loads the data on this virtual element (object simulating to be a bkessing node temporarily on  given (real) parent e. E knowns that is fake and wont append it .. dont need to worry */
  loadVirtualData(e: Element): void;
}
