import { appendFileSync } from 'fs'
import { inspect } from 'util'
import { inBrowser } from './browser'

export function log(...args: any[]) {
  if (inBrowser()) {
    console.log(...args)
  } else {
    appendFileSync('log2.txt', '\n' + args.map(a => inspect(a)).join(' |||||||||| '))
  }
}
