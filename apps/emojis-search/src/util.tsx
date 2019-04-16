import { join } from 'path';
import { readFileSync } from 'fs';

export function charCodeHexString(s: string) {
  return s
    .split('')
    .map(s => s.charCodeAt(0).toString(16))
    .map(n => `\\u${n}`)
    .join('')
}

/** List given enum keys as array */
export function enumKeys(anEnum: any): string[] {
  const a = []
  for (let i in anEnum) {
    a.push(i)
  }
  return a
}

// export function getDescriptions(descriptions: any): string[][] {
//   const o: [any, string][] = []
//   Object.keys(descriptions).forEach(s => {
//     o.push([s, descriptions[s]])
//   })
//   return o
// }




/** Removes undefined from type */
export type NotUndefined<T> = Exclude<T, undefined>

/** Useful for filtering out undefined values without casting. */
export function notUndefined<T>(n: T): n is NotUndefined<T> {
  return n !== undefined
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

export function unique<T>(t: T, i: number, a: T[]){return a.indexOf(t)===i}
export function uniqueNotFalsy<T>(t: T, i: number, a: T[]): t is NotFalsy<T> {return a.indexOf(t)===i}

