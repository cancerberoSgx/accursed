// let _quoteCharMap:any
// const quoteCharMap = ()=> {
//   if(!_quoteCharMap) {
//     _quoteCharMap = {
//       [_printUnicodeCharacter('000A')]: '`'+_printUnicodeCharacter('000A')+'`',
//       [_printUnicodeCharacter('0027')]: '`'+_printUnicodeCharacter('0027')+'`',
//     }
//   }
//   return _quoteCharMap
// }
export function printUnicodeCharacter(s: string, quote = false) {
  const quoteCharMap: any = {
    '000A': `'\\n'`,
    '000D': `'\\r'`,
    '0027': `'\\''`,
    '005C': `'\\\\'`,
    '2028': `'2028-TODO'`
  }
  return quote ? quoteCharMap[s] || `'${_printUnicodeCharacter(s)}'` : _printUnicodeCharacter(s)
}
function _printUnicodeCharacter(s: string) {
  return `${s
    .split('-')
    .map(s => String.fromCodePoint(parseInt('0x' + s, 16)))
    .join('')}`
}
