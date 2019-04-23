
declare module 'json-ptr' {
export interface I{}
}
const ptr  =require('json-ptr')
var data = {
  legumes: [{
    name: 'pinto beans',
    unit: 'lbs',
    instock: 4
  }, {
    name: 'lima beans',
    unit: 'lbs',
    instock: 21
  }, {
    name: 'black eyed peas',
    unit: 'lbs',
    instock: 13
  }, {
    name: 'plit peas',
    unit: 'lbs',
    instock: 8
  }]
}
console.log(ptr.list(data));

// import * as jp from 'json-ptr'

