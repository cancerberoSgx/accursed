import { JSONObject } from 'misc-utils-of-mine-typescript'

export function isJSONObject(o: any): o is JSONObject {
  return typeof o === 'object' && !Array.isArray(o)
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
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
