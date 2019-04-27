/**
 * strips ANSI codes from a string. From https://github.com/xpl/ansicolor/blob/master/ansicolor.js
 * @param {string} s a string containing ANSI escape codes.
 * @return {string} clean string.
 */
export function strip(s: string) {
  return s.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g, '') // hope V8 caches the regexp
}

/**
 * return the Enum type from given string enum key obtained with key [[enumNoValueKeys]]
 */
export function enumValueFromString<T>(key: string, anEnum: any): T | undefined {
  return anEnum[key]
}

export type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>

type falsy = undefined | null | false | '' | 0

/**
 * Without arguments it returns the union of all falsy values. With arguments it returns given type excluding falsy arguments.  Example `Falsy<number|boolean|null> ` will be `false|null`
 */
export type Falsy<T = never> = T extends never ? (never extends T ? falsy : Extract<T, falsy>) : Extract<T, falsy>

/** Removes undefined from type.  Example `Falsy<number|boolean>` will be `number|true` */
export type NotFalsy<T> = Exclude<T, falsy>

export function rgb2Hex(s: string) {
  // prettier-ignore
  //@ts-ignore
  return s.match(/[0-9]+/g)!.reduce((a, b: any) => a + (b | 256).toString(16).slice(1), '#').toString(16)
}
