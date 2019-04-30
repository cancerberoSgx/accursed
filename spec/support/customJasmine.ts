import { appendFileSync } from 'fs';
import { inspect, format } from 'util';
import { rm } from 'shelljs';

rm('-rm', 'test_output.txt')

var Jasmine = require('jasmine');

//@ts-ignore
var j = new Jasmine();

j.loadConfigFile('spec/support/jasmine.json');

j.configureDefaultReporter({
  print: function (...args) {
    appendFileSync('test_output.txt', 'print: ' + args.map(a => inspect(a)).join(', '))
    process.stdout.write(format.apply(this, arguments));
  },
});

j.onComplete(function (passed) {
  console.log('RESULT FILE WAS WRITTEN TO test_output.txt');

  if (passed) {
    console.log('YIUUUYPIIII All specs have passed');
    process.exit(0)
  }
  else {
    console.log('AUHHHU, At least one spec has failed');
    process.exit(1)
  }
});

j.execute();

