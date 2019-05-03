// const handler = new Proxy({}, {
//   get(target, trapName, receiver) {
//       // Return the handler method named trapName
//       return function (...args) {
//           // Don’t log args[0]
//           console.log(args.slice(1));
//           // Forward the operation
//           return Reflect[trapName](...args);
//       }
//   }
// });

// const target = {};
//   const proxy = new Proxy(target, handler);
//   proxy.foo = 123;

function monster1(disposition) {
  this.disposition = disposition;
}

const handler1 = {
  construct(target, args) {
    console.log('monster1 constructor called');
    // expected output: "monster1 constructor called"

    return new target(...args);
  }
};

const proxy1 = new Proxy(monster1, handler1);

console.log(new proxy1('fierce').disposition);
// expected output: "fierce"


// // Definition of Fruit
// function Fruit() {
//   this.isFood = true;
// };
// // Definition of Banana using old-style inheritance
// function Banana() {
//   this.name = 'Banana';
// }
// Banana.prototype = Object.create(Fruit.prototype);
// // High level inspections
// const banana = new Banana();
// console.log(banana instanceof Banana); // true, Banana is a Fruit
// console.log(banana instanceof Fruit); // true, Fruit is an Object
// console.log(banana instanceof Object); // true

//   // mostly equivalent to Banana[Symbol.hasInstance](banana)
// console.log(
//   Reflect.get(Banana, 'prototype') === (  
//     Reflect.getPrototypeOf(banana) 
//   )
// ); // true
// // mostly equivalent to Fruit[Symbol.hasInstance](banana)
// console.log(
//   Reflect.get(Fruit, 'prototype') === (
//     Reflect.getPrototypeOf(
//       Reflect.getPrototypeOf(banana)
//     )
//   )
// ); // true
// // mostly equivalent to Object[Symbol.hasInstance](banana)
// console.log(
//   Reflect.get(Object, 'prototype') === (
//     Reflect.getPrototypeOf(
//       Reflect.getPrototypeOf(
//         Reflect.getPrototypeOf(banana)
//       )
//     )
//   )
// ); // true


// // Using Node's `assert` module
// const assert = require('assert');
// // Application code
// const targetObj = {
//   // targetFn signature is (number, boolean, object) => number
//   targetFn: (a, b, c) => { return 123; }
// };
// // Test code
// const proxy = new Proxy(targetObj, {
//   // This handler will run when a property is read from `targetObj`
//   get: (targetObj, prop, receiver) => {
//     const value = Reflect.get(targetObj, prop);
//     if (prop !== 'targetFn') {
//       return value;
//     }
//     return new Proxy(value, {
//       // This handler will run when targetObj.targetFn() is invoked
//       // - fn is the function being invoked
//       // - thisArg is the receiver object
//       // - args is the arguments list
//       apply: (fn, thisArg, args) => {
//         // Validate that the receiver is an object
//         assert.ok(thisArg instanceof Object);
//         // Validate function argument types
//         assert.strictEqual(args.length, 3);
//         assert.strictEqual(typeof args[0], 'number');
//         assert.strictEqual(typeof args[1], 'boolean');
//         assert.strictEqual(typeof args[2], 'object');
//         assert.ok(typeof args[2]);
//         assert.ok(args[2] instanceof Object);
//         // Validate that the results
//         const result = Reflect.apply(fn, thisArg, args);
//         assert.strictEqual(result, 123);
//         return result;
//       }
//     });
//   }
// });
// // Usage
// proxy.targetFn(1, true, {});