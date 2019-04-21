import { Screen, debug } from 'accursed'
import { main } from './cli'
import { Options } from './types'

const args = require('yargs-parser')(process.argv.slice(2)) as Options
try {
  const tool = main(args)
} catch (error) {
  debug('ERROR', error)
}
