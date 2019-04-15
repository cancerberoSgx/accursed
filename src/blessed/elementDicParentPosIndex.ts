// import * as blessed from 'blessed'
// import { getEnumKey } from 'ts-simple-ast-extra';
// import { enumKeys } from 'misc-utils-of-mine-typescript';

// export type Node = blessed.Widgets.Node;
// export type Box = blessed.Widgets.BoxElement;
// export type Element = blessed.Widgets.BlessedElement;
// export type PositionCoords = blessed.Widgets.PositionCoords;
// export type Screen = blessed.Widgets.Screen;

// let dic
// // instead of referenc
// // question Element or Node ? - Node does not have position.
// // export function get(e: Element) {

//   // return dic[elToString(e)];
// // }
// // export function put(e: Element) {
//   // const r = ;
// // }

// type DicElements = Element|Screen
// interface Dic{
//   put(e: DicElements):void
//   // get(ref: Ref):DicElements|undefined
//   // getRef(e: DicElements):Ref|undefined
// }

// class DicImpl implements Dic {
//   private dic: {
//     [id: string]: Ref
//   } = {}
//   put(e: DicElements){
//     // const ref =this.getRef(e)
//     // const s = this.refToString(ref)
//     // if(this.dic[s]){
//     // // TODOwhat to do ?
//     // }
//     // this.dic[s] = ref
//   }
//   // get(ref: Ref){
//   //   throw 1
//   // }
// // }

// // protected getRef(e: Node): Ref {
// //   if(dicTypes.includes(e.type)){
// //     throw new Error('Element type not supported '+e.type)
// //   }
// //   const ref:Partial<Ref>|undefined =isElement(e) ?  {  pos: e.lpos, index: e.index, type: e.type} : isScreen(e) ? {pos: {xi: 0, xl: 0, yi: 0, yl: 0}, index: 0, type: 'screen'} : undefined
// //   // __id: this.getId(),
// //   if(!ref){
// //     throw new Error('Cannot generate a reference for Element '+e.type)
// //   }
// //   const refs = this.refToString(ref)
// //   if(this.dic[refs]){
// //     return this.dic[refs]
// //   }
// //   const parentRef = e.parent ? this.getRef(e.parent) : undefined
// //   // const parentRefS = this.refToString(parentRef)
// //     ref.parent = parentRef ?parentRef.__id : undefined
// //   // return isElement(e) ?  { ...e.lpos, index: e.index} : {position:{top}} :
// //     // , __dicId:
// // }
// // protected refToString(r: Partial<Ref>){
// //   return JSON.stringify({...r, __id: undefined})
// // }
// // protected counter = 0
// // protected getId(){
// //   return this.counter++
// // }

// }

// function isScreen(n:any): n is Screen{
//   return n && n.type ==='screen' && n.restoreFocus
// }
// function isElement(n:any): n is Element{
//   return n && n.type ==='element' && n.removeLabel && n.disableDrag && n.setContent && n.getScreenLines
// }
// type RefId = number
// // TODO: support detached / visible?
// interface Ref {
//   /** an id for this reference in a given dictionary. Used to reference parent/children */
//   __id: RefId
//   pos: PositionCoords;
//   index: number;
//   parent?: RefId|undefined;
//   children?: RefId[];
//   type: DicType
// }
// enum DicType {
//   'element'="element",
//   'box'="box",
//   'screen'="screen",
//   'textarea'="textarea"
// }

// const dicTypes = enumKeys(DicType)

// function elToString(n: Element) {
//   return;
// }
// function refToString(r: Ref) {
//   return JSON.stringify(r);
// }
// export function makeCollapsible(box: blessed.Widgets.BoxElement) {
//   const a = box as any;
// }
