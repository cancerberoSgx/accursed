import * as blessed from 'blessed'
import { appendFileSync } from 'fs'
import { inspect } from 'util'
import { Log, Screen } from '../blessedTypes'
import { inBrowser } from './browser'
import { focusableOpts } from './sharedOptions'

export function debug(...args: any[]) {
  if (inBrowser()) {
    console.log(...args)
  } else {
    appendFileSync(
      'log2.txt',
      '\n' + args.map(a => inspect(a, { compact: true, breakLength: 200, maxArrayLength: 5 })).join(' |||||||||| ')
    )
  }
}

/**
 * Creates a log element bottom-right corner of the screen and returns an object with log() method
 */
export function screenLogger(screen: Screen) {
  if (!screenLoggerInstance) {
    screenLoggerInstance = blessed.log({
      ...focusableOpts(),
      scrollable: true,
      keyable: true,
      scrollbar: {
        inverse: true
      },
      top: '70%',
      left: '70%'
    })
    screen.prepend(screenLoggerInstance)
  }
  screenLoggerInstance.setFront()
  screen.render()
  return {
    log(...args: any[]) {
      screenLoggerInstance.log(args.map(a => inspect(a)).join(' '))
      screenLoggerInstance.setFront()
      screen.render()
    },
    instance: screenLoggerInstance
  }
}
let screenLoggerInstance: Log
