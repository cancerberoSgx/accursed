// import { prototype } from 'events';
// import { connect } from 'http2';

// type Membered = {[name in PropertyKey]: any}
// function setFinalMember<T extends Membered>(t: T, member: PropertyKey) {
//   console.log(arguments);
//   let proto = new Proxy<T>(t, {
//     set(target: T, prop: keyof T, receiver: any){
//       console.log(arguments);
//             if(prop===member){
//         throw new Error('final member you cannot override')
//       }
//       return target[prop]
//     }
//     }
//   )
// }

// function setFinal2<T extends Function>(t: T, member: PropertyKey) {
//   console.log(arguments);
//   let proto = new Proxy<T>(t, {
//     set(target: T, prop: keyof T, receiver: any){
//       console.log(arguments);
//             if(prop===member){
//         throw new Error('final member you cannot override')
//       }
//       return target[prop]
//     }
//     }
//   )
// }

// abstract class BaseClass {
//   protected element: Object
//   constructor(element: any) {
//       this.element = element;
//   }
//   public  readonly  dispose = (): void => {
//       // this.element.remove();
//   }
// }

// class MyClass extends BaseClass {
//   constructor(element: any) {
//       super(element);
//   }
//   public dispose(): void { } // Compiler error: "Property 'dispose' in type 'MyClass' is not assignable to the same property in base type 'BaseClass'"
// }

// abstract class Abstract {
//   abstract render(): void
// }
// class  Tool extends Abstract{
//   render(){}
// }
// class VeryConcrete extends  Tool {
//   render(){
//     var a = 'very ugly hacks in the deep of very specific machines. No subclassing contracts will be safe here'
//   }
// }

// class ExtendsionOK extends Tool {
// render(){
//   super.render();
// }
// }

// setFinalMember(VeryConcrete.prototype, 'render')
// setFinalMember(VeryConcrete.prototype, 'render')

// class CannotHappen extends VeryConcrete {
//   render(){
//     console.log('CannotHappen');

//   }
// }

// new CannotHappen().render()
