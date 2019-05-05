//@ts-nocheck

const Tput = require('../../src/blessed/tput') 

const tput = Tput({
  terminal: process.env.TERM,
  termcap: !!process.env.USE_TERMCAP,
  extended: true
})

console.log(`Normal text
${tput.enter_underline_mode()}Underline text${tput.exit_underline_mode()}
Back to normal`);