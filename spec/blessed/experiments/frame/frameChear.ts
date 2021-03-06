// // adapted from https://github.com/couchand/lines-js.git

// var char,
//   chars,
//   down,
//   left,
//   preferred,
//   right,
//   up,
//   width,
//   indexOf = [].indexOf

// chars = [
//   [[' ╷╻', '╶┌┎', '╺┍┏'], ['╵│╽', '└├┟', '┕┝┢'], ['╹╿┃', '┖┞┠', '┗┡┣']],
//   [['╴┐┒', '─┬┰', '╼┮┲'], ['┘┤┧', '┴┼╁', '┶┾╆'], ['┚┦┨', '┸╀╂', '┺╄╊']],
//   [['╸┑┓', '╾┭┱', '━┯┳'], ['┙┥┪', '┵┽╅', '┷┿╈'], ['┛┩┫', '┹╃╉', '┻╇╋']]
// ]

// chars = (function() {
//   var i, len, results
//   results = []
//   for (i = 0, len = chars.length; i < len; i++) {
//     left = chars[i]
//     results.push(
//       (function() {
//         var j, len1, results1
//         results1 = []
//         for (j = 0, len1 = left.length; j < len1; j++) {
//           up = left[j]
//           results1.push(
//             (function() {
//               var k, len2, results2
//               results2 = []
//               for (k = 0, len2 = up.length; k < len2; k++) {
//                 right = up[k]
//                 down = right.split('')
//                 results2.push(
//                   (function() {
//                     var l, len3, results3
//                     results3 = []
//                     for (l = 0, len3 = down.length; l < len3; l++) {
//                       char = down[l]
//                       results3.push({
//                         default: char
//                       })
//                     }
//                     return results3
//                   })()
//                 )
//               }
//               return results2
//             })()
//           )
//         }
//         return results1
//       })()
//     )
//   }
//   return results
// })()

// chars[0][0][1][1].rounded = '╭'

// chars[0][1][1][0].rounded = '╰'

// chars[1][1][0][0].rounded = '╯'

// chars[1][0][0][1].rounded = '╮'

// chars[0][0][1][2].double = '╓'

// chars[0][0][2][1].double = '╒'

// chars[0][0][2][2].double = '╔'

// chars[0][1][2][0].double = '╘'

// chars[0][1][2][1].double = '╞'

// chars[0][2][0][2].double = '║'

// chars[0][2][1][0].double = '╙'

// chars[0][2][1][2].double = '╟'

// chars[0][2][2][0].double = '╚'

// chars[0][2][2][2].double = '╠'

// chars[1][0][0][2].double = '╖'

// chars[1][0][1][2].double = '╥'

// chars[1][2][0][0].double = '╜'

// chars[1][2][0][2].double = '╢'

// chars[1][2][1][0].double = '╨'

// chars[1][2][1][2].double = '╫'

// chars[2][0][0][1].double = '╕'

// chars[2][0][0][2].double = '╗'

// chars[2][0][2][0].double = '═'

// chars[2][0][2][1].double = '╤'

// chars[2][0][2][2].double = '╦'

// chars[2][1][0][0].double = '╛'

// chars[2][1][0][1].double = '╡'

// chars[2][1][2][0].double = '╧'

// chars[2][1][2][1].double = '╪'

// chars[2][2][0][0].double = '╝'

// chars[2][2][0][2].double = '╣'

// chars[2][2][2][0].double = '╩'

// chars[2][2][2][2].double = '╬'

// width = function(style) {
//   switch (style) {
//     case 'normal':
//     case 'rounded':
//       return 1
//     case 'bold':
//     case 'double':
//       return 2
//     default:
//       return 0
//   }
// }

// preferred = function({ left, up, right, down }) {
//   var count, counts, i, len, max, maxes, ref, style
//   counts = {}
//   ref = [left, up, right, down]
//   for (i = 0, len = ref.length; i < len; i++) {
//     style = ref[i]
//     if (!(style !== 'none' && style !== 'normal')) {
//       continue
//     }
//     if (counts[style] == null) {
//       counts[style] = 0
//     }
//     counts[style] += 1
//   }
//   max = 0
//   maxes = false
//   for (style in counts) {
//     count = counts[style]
//     if (count === 3) {
//       return style
//     }
//     if (count > max) {
//       max = count
//       maxes = [style]
//     } else if (count === max) {
//       maxes = maxes.concat([style])
//     }
//   }
//   if (max === 2) {
//     if (maxes.length !== 2) {
//       return maxes[0]
//     } else {
//       down
//     }
//   }
//   if (indexOf.call(maxes, down) >= 0) {
//     return down
//   } else if (indexOf.call(maxes, up) >= 0) {
//     return up
//   } else if (indexOf.call(maxes, right) >= 0) {
//     return right
//   } else if (indexOf.call(maxes, left) >= 0) {
//     return left
//   }
//   return 'normal'
// }
// export type Style = 'none' | 'normal' | 'bold' | 'double' | 'rounded'

// export function frameChar({ left, up, right, down }: { left?: Style; up?: Style; right?: Style; down?: Style }) {
//   var i, len, opt, options, ref, style, styles
//   if (left == null) {
//     left = 'none'
//   }
//   if (up == null) {
//     up = 'none'
//   }
//   if (right == null) {
//     right = 'none'
//   }
//   if (down == null) {
//     down = 'none'
//   }
//   styles = {}
//   ref = [left, up, right, down]
//   for (i = 0, len = ref.length; i < len; i++) {
//     style = ref[i]
//     if (!(style !== 'none')) {
//       continue
//     }
//     if (styles[style] == null) {
//       styles[style] = 0
//     }
//     styles[style] += 1
//   }
//   options = chars[width(left)][width(up)][width(right)][width(down)]
//   opt = preferred({ left, up, right, down })
//   let result: any
//   if (opt in options) {
//     result = options[opt]
//   } else {
//     result = options.default
//   }

//   return result
// }
