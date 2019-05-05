
var blessed = require('blessed')
const fs = require('fs')
const tput = blessed.tput({
  terminal: process.env.TERM,
  termcap: !!process.env.USE_TERMCAP,
  extended: true
})

console.log(`Normal text
${tput.enter_underline_mode()}Underline text${tput.exit_underline_mode()}
Back to normal`);

debugger

// save all terminal available operations (methods of the tput object) to js file

fs.writeFileSync('currentTermCapabilities.js', `
export const terminalCapabilitiesNames = ${JSON.stringify(Object.keys(tput), null, 2)};
`.trim())

console.log('tput capabilities written to file currentTermCapabilities.json');



  // if (tput[cmd]) {
  //   process.stdout.write(tput[cmd].apply(tput, argv));
  // }
  
  // console.log(Object.keys(tput));
  // console.log(Object.keys(tput));
  
  // console.log(Object.keys(tput));

  // node  -e "console.log(require('fs').readyFileSync('node_modules/blessed/bin/tput.js')="