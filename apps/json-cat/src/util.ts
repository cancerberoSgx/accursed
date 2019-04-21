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
