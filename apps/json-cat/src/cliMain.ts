import {  Options } from './types'
import { main } from './cli';
import { Screen } from 'accursed';

let screen: Screen= null as any
const args = require('yargs-parser')(process.argv.slice(2)) as Options
try {
  const tool = main(args)
  screen = tool.screen as any
} catch (error) {
 screen &&  screen.log('ERROR', error)
}