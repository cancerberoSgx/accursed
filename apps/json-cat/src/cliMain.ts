import { appendFileSync, existsSync, createReadStream } from 'fs'
import {  Options } from './types'
import * as oboe from 'oboe'
import { main } from './cli';


const args = require('yargs-parser')(process.argv.slice(2)) as Options
main(args)