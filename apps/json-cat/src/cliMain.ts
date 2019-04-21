import { debug } from 'accursed'
import { main } from './cli'
import { Options } from './types'

const args = require('yargs-parser')(process.argv.slice(2)) as Options
;(async () => {
  try {
    const tool = await main(args)
  } catch (error) {
    debug('ERROR', error)
  }
})()
