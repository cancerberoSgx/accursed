import { appendFileSync } from 'fs'
import { inspect } from 'util'

export function log(...args: any[]) {
  // if(existsSync('log2.txt')){
  //   writeFileSync('log2.txt', 'hello')
  // }
  appendFileSync(
    'log2.txt',
    '\n' +
      args
        .map(a => inspect(a))
        // .map(a => a.replace(/\n+/g, ' ').substring(0, Math.min(600, a.length)))
        .join(' |||||||||| ')
  )
}
