import { appendFileSync } from 'fs'
import { rm } from 'shelljs'
import { format, inspect } from 'util'

rm('-rf', 'test_output.txt')

let Jasmine = require('jasmine')

// @ts-ignore
let j = new Jasmine()

j.loadConfigFile('spec/support/jasmine.json')

j.configureDefaultReporter({
  print: function(...args) {
    appendFileSync(
      'test_output.txt',
      'print: ' +
        args
          .map(a => {
            if (a instanceof Error) {
              return `${a}\n${a.stack.split('\n').join('\n')}`
            } else {
              return inspect(a)
            }
          })
          .join(', ')
    )
    process.stdout.write(format.apply(this, arguments))
  }
})

j.onComplete(function(passed) {
  console.log('RESULT FILE WAS WRITTEN TO test_output.txt')
  if (passed) {
    console.log('All specs have passed')
    process.exit(0)
  } else {
    console.log('At least one spec has failed')
    process.exit(1)
  }
})

j.execute()
