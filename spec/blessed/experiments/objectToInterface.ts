import { objectKeys } from 'misc-utils-of-mine-generic';



interface Options {
  target: {[k: string]: any}
  allKeys?: boolean
}
export function objectToInterface(options: Options) {
  const {target} = options
  const targetKeys = options.allKeys ? objectKeys(target) : Object.keys(target) 
  // const target = {...o, ...o.constructor && o.con}
  var booleans = targetKeys.filter(k => typeof target[k] === 'boolean');
  var strings = targetKeys.filter(k => typeof target[k] === 'string');
  var numbers = targetKeys.filter(k => typeof target[k] === 'number');
  var functions = targetKeys.filter(k => typeof target[k] === 'function');
  var arrays = targetKeys.filter(k => Array.isArray(target[k]));
  var objects = targetKeys.filter(k => typeof target[k] !== 'number' && typeof target[k] !== 'string' && typeof target[k] !== 'boolean' && typeof target[k] !== 'function' && !Array.isArray(target[k]));
  const s = `
interface Foo {
  ${booleans.map(k => `${k}: boolean`).join('\n  ')}
  ${strings.map(k => `${k}: string`).join('\n  ')}
  ${numbers.map(k => `${k}: number`).join('\n  ')}
  ${functions.map(k => `${k}(...args: any[]): any`).join('\n  ')}
  ${arrays.map(k => `${k}: any[]`).join('\n  ')}
  ${objects.map(k => `${k}: any`).join('\n  ')}
}
  `
  return s
}

// console.log(objectToInterface({target: require('blessed'), allKeys: true}))


var blessed = require('blessed')
const tput = blessed.tput({
  terminal: process.env.TERM,
  termcap: !!process.env.USE_TERMCAP,
  extended: true
})

const program = blessed.program({
})


console.log(objectToInterface({target: program, allKeys: false}))
