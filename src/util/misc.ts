import { objectKeys } from 'misc-utils-of-mine-generic'

// export function notUndefined<T>(a: T): a is Exclude<T, undefined> {
//   return typeof a !== 'undefined'
// }

/**
 * Returns a nested property of given object and given path. For example path could be 'foo.bar' and it will return `object['foo']['bar']`
 */
export function getObjectProperty<T>(
  object: any,
  path: string | string[],
  defaultValue: T | undefined = undefined
): T | undefined {
  if (!path) {
    return object
  } else if (object) {
    var tokens = typeof path === 'string' ? path.split('.') : path,
      prev = object,
      n = 0
    while (typeof prev !== 'undefined' && n < tokens.length) {
      prev = prev[tokens[n++]]
    }
    if (typeof prev !== 'undefined') {
      return prev
    }
  }
  return defaultValue
}

/**
 * sets a nested property on given path. For example path could be 'foo.bar' and it will set `object.foo.bar = value`
 */
export function setObjectProperty<T>(object: any, path: string | string[], value: T) {
  if (!path) {
    return
  } else if (!object) {
    return
  }
  var tokens = typeof path === 'string' ? path.split('.') : path,
    prev = object
  for (var i = 0; i < tokens.length - 1; ++i) {
    var currentToken = tokens[i]
    if (typeof prev[currentToken] === 'undefined') {
      prev[currentToken] = {}
    }
    prev = prev[currentToken]
  }
  if (tokens.length) {
    prev[tokens[tokens.length - 1]] = value
  }
}

// export function getObjectPropertyPaths(object: any, options: {ignoreArrayElements?: boolean} = {ignoreArrayElements: true}) {
//   function visit(object: any, p: (number|string)[]) {
//     const objectIsArray = Array.isArray(object)
//     if(options.ignoreArrayElements && objectIsArray){
//       return 
//     }
//     for(var i in object) {
//       p.push(objectIsArray ? parseInt(i) : i+'')
//       var v = object[i]
//       if(isObject(v)||isArray(v[i])){
//         visit(v[i], p)
//       }
//     }
//   }
//   const p = []
//   visit(object, p)
//   return p
// }

// var toStr = Object.prototype.toString;

//   export function getTypeScript(type: any){
//   return toStr.call(type);
// }
//   export function isObject(obj: any){
//     return typeof obj === 'object' && getTypeScript(obj) === "[object Object]";
//   }

//  export  var isArray = Array.isArray || function(obj: any){
//     return toStr.call(obj) === '[object Array]';
//   }

//   export function isBoolean(obj: any){
//     return typeof obj === 'boolean' || getTypeScript(obj) === '[object Boolean]';
//   }




/**
 * strips ANSI codes from a string. From https://github.com/xpl/ansicolor/blob/master/ansicolor.js
 * @param {string} s a string containing ANSI escape codes.
 * @return {string} clean string.
 */
export function strip(s: string) {
  return s.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g, '') // hope V8 caches the regexp
}

/** List given enum keys as array. Differently to [[enumKeys]], is should be used only on enums that doesn't have assigned values or other wise on those which values are identical to the keys or not strings. If not, they will be returned also! */
export function enumNoValueKeys(anEnum: any): string[] {
  return Object.keys(anEnum)
    .map(i => anEnum[i as any])
    .filter((s, i, a) => typeof s === 'string' && a.indexOf(s) === i)
}

/**
 * build an object using keys in [[a]] and values returning from [[fn]] as long as they are not undefined
 */
export function arrayToObject<T = any>(a: string[], fn: (a: string) => T | undefined) {
  const o: { [s: string]: T } = {}
  a.forEach(k => {
    const v = fn(k)
    if (typeof v !== 'undefined') {
      o[k] = v
    }
  })
  return o
}

/**
 * return the Enum type from given string enum key obtained with key [[enumNoValueKeys]]
 */
export function enumValueFromString<T>(key: string, anEnum: any): T | undefined {
  return anEnum[key]
}

export function objectMapValues<O extends { [k in keyof O]: O[keyof O] } = any, T = any>(
  o: O,
  p: (k: keyof O, v: O[keyof O]) => T
): { [k in keyof O]: T } {
  var r: { [k in keyof O]: T } = {} as any
  objectKeys(o).forEach(k => {
    r[k] = p(k, o[k])
  })
  return r
}
export const objectMap = objectMapValues

export function objectFilter<O extends { [k in keyof O]: O[keyof O] } = any>(
  o: O,
  p: (k: keyof O, v: O[keyof O]) => boolean
): Partial<O> {
  var r: Partial<O> = {}
  objectKeys(o)
    .filter((k, v) => p(k, o[k]))
    .forEach(k => {
      r[k] = o[k]
    })
  return r
}

export type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>

export function throttle<F extends (...args: any[]) => any>(
  func: F,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
) {
  let context: any, args: any, result: any
  let timeout: any = null
  let previous = 0
  options || (options = {})
  let later = function() {
    previous = options.leading === false ? 0 : Date.now()
    timeout = null
    result = func.apply(context, args)
    context = args = null
  }
  return function(this: any) {
    let now = Date.now()
    if (!previous && options.leading === false) previous = now
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0) {
      clearTimeout(timeout)
      timeout = null
      previous = now
      result = func.apply(context, args)
      context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
    return result
  }
}

/** use it to remove duplicates in .filter expressions like `array.filter(notSame)` */
export function notSame<T>(t: T, i: number, a: T[]) {
  return a.indexOf(t) === i
}
/** use it remove duplicates and falsy values in filter() expressions like `array.filter(notSameNotFalsy)` */
export function notSameNotFalsy<T>(t: T, i: number, a: T[]): t is NotFalsy<T> {
  return a.indexOf(t) === i
}
type falsy = undefined | null | false | '' | 0

/**
 * Without arguments it returns the union of all falsy values. With arguments it returns given type excluding falsy arguments.  Example `Falsy<number|boolean|null> ` will be `false|null`
 */
export type Falsy<T = never> = T extends never ? (never extends T ? falsy : Extract<T, falsy>) : Extract<T, falsy>
// let c: Falsy<number|boolean|null>

/** Removes undefined from type.  Example `Falsy<number|boolean>` will be `number|true` */
export type NotFalsy<T> = Exclude<T, falsy>
// let c: NotFalsy<number|boolean>

/** Useful for filtering out falsy values without casting. */
export function notFalsy<T>(n: T): n is NotFalsy<T> {
  return !!n
}
