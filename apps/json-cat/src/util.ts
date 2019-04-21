import { JSONObject } from 'misc-utils-of-mine-typescript'

export function isJSONObject(o: any): o is JSONObject {
  return typeof o === 'object' && !Array.isArray(o)
}
