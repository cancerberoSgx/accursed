// import { Readable } from "stream";
// import {Line, line,  LineOptions} from './line'
// import {cell, Cell} from './cell'
// import { colorUtil } from './color';
 

// export type Point =  [number, number]
// export class Lines extends Readable {
//   _lines: any[]
//   constructor() {
//     super();
//     this._lines = [];
//   }

//   _read() {}

//   flush() {
//     return this.push(this.toString());
//   }

//   line(o: LineOptions) {
//     this._lines = this._lines.concat([line(o)]);
//     return this; 
//   }

//   box({from, to, style, color}: Line){//{from:Point , to: Point , style: string, color?: any}) {
//     // var color, from, style, to;
//     // if (arguments.length === 1) {
//     //   ({from, to, style, color} = arguments[0]);
//     // } 
//     // else {
//       // from = arguments[0];
//       // to = arguments[1];
//       // style = arguments[2];
//       // color = arguments[3];
//     // }
//     this.line({
//       from,
//       to: [from[0], to[1]],
//       style: style,
//       color: color
//     });
//     this.line({
//       from: [from[0], to[1]],
//       to: to,
//       style: style,
//       color: color
//     });
//     this.line({
//       from: to,
//       to: [to[0], from[1]],
//       style: style,
//       color: color
//     });
//     this.line({
//       from: [to[0], from[1]],
//       to: from,
//       style: style,
//       color: color
//     });
//     return this;
//   }

//   lines() {
//     return this._lines;
//   }

//   toString() {
//     var buffers, col, cols, currentColor, down, i, j, k, l, left, len, lines, ref, ref1, ref2, ref3, right, row, rows, stringVal, up;
//     lines = this.lines();
//     cols = Math.max(Math.max.apply(null, lines.map(function(l) {
//       return l.from[0];
//     })), Math.max.apply(null, lines.map(function(l) {
//       return l.to[0];
//     })));
//     rows = Math.max(Math.max.apply(null, lines.map(function(l) {
//       return l.from[1];
//     })), Math.max.apply(null, lines.map(function(l) {
//       return l.to[1];
//     })));
//     buffers = (function() {
//       var i, ref, results;
//       results = [];
//       for (row = i = 0, ref = rows; (0 <= ref ? i <= ref : i >= ref); row = 0 <= ref ? ++i : --i) {
//         results.push((function() {
//           var j, ref1, results1;
//           results1 = [];
//           for (col = j = 0, ref1 = cols; (0 <= ref1 ? j <= ref1 : j >= ref1); col = 0 <= ref1 ? ++j : --j) {
//             results1.push(new Cell());
//           }
//           return results1;
//         })());
//       }
//       return results;
//     })();
//     for (i = 0, len = lines.length; i < len; i++) {
//       l = lines[i];
//       switch (true) {
//         case l.horizontal:
//           left = Math.min(l.from[0], l.to[0]);
//           right = Math.max(l.from[0], l.to[0]);
//           row = buffers[l.from[1]];
//           row[left].right(l.style, l.color);
//           row[right].left(l.style, l.color);
//           for (col = j = ref = left + 1, ref1 = right; (ref <= ref1 ? j < ref1 : j > ref1); col = ref <= ref1 ? ++j : --j) {
//             row[col].left(l.style, l.color);
//             row[col].right(l.style, l.color);
//           }
//           break;
//         case l.vertical:
//           up = Math.min(l.from[1], l.to[1]);
//           down = Math.max(l.from[1], l.to[1]);
//           col = l.from[0];
//           buffers[up][col].down(l.style, l.color);
//           buffers[down][col].up(l.style, l.color);
//           for (row = k = ref2 = up + 1, ref3 = down; (ref2 <= ref3 ? k < ref3 : k > ref3); row = ref2 <= ref3 ? ++k : --k) {
//             buffers[row][col].up(l.style, l.color);
//             buffers[row][col].down(l.style, l.color);
//           }
//       }
//     }
//     currentColor = {
//       foreground: 'none',
//       background: 'none'
//     };
//     stringVal = buffers.map(function(buffer) {
//       return buffer.map(function(cell) {
//         var back, char, color, fore, output;
//         ({char, color} = cell.toString());
//         output = char;
//         if (char !== ' ') {
//           ({
//             foreground: fore,
//             background: back
//           } = color);
//           if (fore && fore !== currentColor.foreground) {
//             currentColor.foreground = fore;
//             output = colorUtil.foreground(fore) + output;
//           }
//           if (back && back !== currentColor.background) {
//             currentColor.background = back;
//             output = colorUtil.background(back) + output;
//           }
//         }
//         return output;
//       }).join('');
//     }).join('\n');
//     if (currentColor.foreground !== 'none') {
//       stringVal += colorUtil.foreground('none');
//     }
//     if (currentColor.background !== 'none') {
//       stringVal += colorUtil.background('none');
//     }
//     console.log(stringVal);
    
//     return stringVal;
//   }

// };