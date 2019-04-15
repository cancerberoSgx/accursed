import { objectKeys } from 'misc-utils-of-mine-generic'

export function notUndefined<T>(a: T): a is Exclude<T, undefined> {
  return typeof a !== 'undefined'
}
/**
 * Returns a nested property of given object and given path. For example path could be 'foo.bar' and it will return `object['foo']['bar']`
 */
export function getObjectProperty<T>(
  object: any,
  path: string,
  defaultValue: T | undefined = undefined
): T | undefined {
  if (!path) {
    return object
  } else if (object) {
    var tokens = path.split('.'),
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
export function setObjectProperty<T>(object: any, path: string, value: T) {
  if (!path) {
    return
  } else if (!object) {
    return
  }
  var tokens = path.split('.'),
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
// type o = {a: number, b: boolean}
// type o1 = RemoveProperties<o, 'a'>
