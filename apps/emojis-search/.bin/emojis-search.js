#!/usr/bin/env node

try {
  //@ts-ignore
  WHO_AM_I =  require('child_process').execSync('whoami').toString().trim()
} catch (error) {  
   //@ts-ignore
   WHO_AM_I = 'user'
}
require('../dist/src/main')
