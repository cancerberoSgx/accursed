import { React, screen } from '../../../../src'
import { frameChar, Style } from './frameChear';

function box({xi, xl, yi, yl, style='normal'}: {xi: number, xl: number, yi: number, yl: number, style?: Style}){
  const arr = []
  for (let j = yi; j <yl; j++) {
    const line = []
for (let i = xi; i <xl; i++) {
  if(j==0){
    if(i===0){
      line.push(frameChar({right: style, down: style}))
    }
    else if (i===xl-1){
      line.push(frameChar({left: style, down: style}))
    }
    else if(j===0){
      line.push(frameChar({left: style}))

    }
    else {
      line.push(' ')
    }
  }
  else if(j===yl-1){
    if(i===0){
      line.push(frameChar({right: style, up: style}))
    }
    else if (i===xl-1){
      line.push(frameChar({left: style, up: style}))
    
    }
    else if(j===yl-1){
      line.push(frameChar({left: style}))

    }
    else {
      line.push(' ')
    }
  }
  else {
        line.push(' ')
      
    }
 
}
arr.push(line)
}
return arr
}

console.log(box({xi: 0, xl: 5, yi: 0, yl: 5}))
/**

* frames inside frames. 
    * unions between light and heavy must use correct chars : ╼╽

* light and heavy styles

* styles of borders ┄

  * light vs heavy
  * dotted vs solid ┆ ┄
},
{
  "name": "BOX DRAWINGS LIGHT QUADRUPLE DASH HORIZONTAL",
  "category": "Box Drawing",
  "cp": "2508",
  "char": "'┈'"
},
{
  "name": "BOX DRAWINGS LIGHT QUADRUPLE DASH VERTICAL",
  "category": "Box Drawing",
  "cp": "250A",
  "char": "'┊'"


* unions in subboxes too: ┬'├

* different corner styles: round and rect: ╭ , ╮256E, ╯256F, ╰2570  vs: 
"2510":  "'┐'""250C":  "'┌'"},"2510":  "'┐'""2514":  "'└'""2518":  "'┘'"



libraries?

https://github.com/couchand/lines-js
https://github.com/holman/spark


},
},

{
  "name": "BOX DRAWINGS LIGHT ARC DOWN AND LEFT",
  "category": "Box Drawing",
  "cp": "256E",
  "char": "'╮'"
},

{
  "name": "BOX DRAWINGS LIGHT ARC UP AND LEFT",
  "category": "Box Drawing",
  "cp": "256F",
  "char": "'╯'"
},

{
  "name": "BOX DRAWINGS LIGHT ARC UP AND RIGHT",
  "category": "Box Drawing",
  "cp": "2570",
  "char": "'╰
'├

<Border type="line" fg="" label={position:'top-center'}>
 <box>...</box>
 </Border>
 
 <Frame>
 <Border></Border>
 <Icon></Icon>
 <Label></Label>
 <Shadow></Shadow>
 <Padding></Padding>
 <Margin></Margin>
 <Body></Body>
 </Frame>
 * 
 */

// interface FrameProps {}

// var screen2 = screen({
//   autoPadding: false,
//   fullUnicode: true
// })

// const t1 = React.render(<text parent={screen2} content=" " width={1} height={1} top={0} left={0} />)

// screen2.key('q', function() {
//   return screen2.destroy()
// })

// screen2.render()




//  // a better character map
//  var char, chars, down, left, preferred, right, up, width,
//  indexOf = [].indexOf;

// chars = [[[' ╷╻', '╶┌┎', '╺┍┏'], ['╵│╽', '└├┟', '┕┝┢'], ['╹╿┃', '┖┞┠', '┗┡┣']], [['╴┐┒', '─┬┰', '╼┮┲'], ['┘┤┧', '┴┼╁', '┶┾╆'], ['┚┦┨', '┸╀╂', '┺╄╊']], [['╸┑┓', '╾┭┱', '━┯┳'], ['┙┥┪', '┵┽╅', '┷┿╈'], ['┛┩┫', '┹╃╉', '┻╇╋']]];

// chars = (function() {
//  var i, len, results;
//  results = [];
//  for (i = 0, len = chars.length; i < len; i++) {
//    left = chars[i];
//    results.push((function() {
//      var j, len1, results1;
//      results1 = [];
//      for (j = 0, len1 = left.length; j < len1; j++) {
//        up = left[j];
//        results1.push((function() {
//          var k, len2, results2;
//          results2 = [];
//          for (k = 0, len2 = up.length; k < len2; k++) {
//            right = up[k];
//            down = right.split('');
//            results2.push((function() {
//              var l, len3, results3;
//              results3 = [];
//              for (l = 0, len3 = down.length; l < len3; l++) {
//                char = down[l];
//                results3.push({
//                  default: char
//                });
//              }
//              return results3;
//            })());
//          }
//          return results2;
//        })());
//      }
//      return results1;
//    })());
//  }
//  return results;
// })();

// chars[0][0][1][1].rounded = '╭';

// chars[0][1][1][0].rounded = '╰';

// chars[1][1][0][0].rounded = '╯';

// chars[1][0][0][1].rounded = '╮';

// chars[0][0][1][2].double = '╓';

// chars[0][0][2][1].double = '╒';

// chars[0][0][2][2].double = '╔';

// chars[0][1][2][0].double = '╘';

// chars[0][1][2][1].double = '╞';

// chars[0][2][0][2].double = '║';

// chars[0][2][1][0].double = '╙';

// chars[0][2][1][2].double = '╟';

// chars[0][2][2][0].double = '╚';

// chars[0][2][2][2].double = '╠';

// chars[1][0][0][2].double = '╖';

// chars[1][0][1][2].double = '╥';

// chars[1][2][0][0].double = '╜';

// chars[1][2][0][2].double = '╢';

// chars[1][2][1][0].double = '╨';

// chars[1][2][1][2].double = '╫';

// chars[2][0][0][1].double = '╕';

// chars[2][0][0][2].double = '╗';

// chars[2][0][2][0].double = '═';

// chars[2][0][2][1].double = '╤';

// chars[2][0][2][2].double = '╦';

// chars[2][1][0][0].double = '╛';

// chars[2][1][0][1].double = '╡';

// chars[2][1][2][0].double = '╧';

// chars[2][1][2][1].double = '╪';

// chars[2][2][0][0].double = '╝';

// chars[2][2][0][2].double = '╣';

// chars[2][2][2][0].double = '╩';

// chars[2][2][2][2].double = '╬';

// width = function(style) {
//  switch (style) {
//    case 'normal':
//    case 'rounded':
//      return 1;
//    case 'bold':
//    case 'double':
//      return 2;
//    default:
//      return 0;
//  }
// };

// preferred = function({left, up, right, down}) {
//  var count, counts, i, len, max, maxes, ref, style;
//  counts = {};
//  ref = [left, up, right, down];
//  for (i = 0, len = ref.length; i < len; i++) {
//    style = ref[i];
//    if (!(style !== 'none' && style !== 'normal')) {
//      continue;
//    }
//    if (counts[style] == null) {
//      counts[style] = 0;
//    }
//    counts[style] += 1;
//  }
//  max = 0;
//  maxes = false;
//  for (style in counts) {
//    count = counts[style];
//    if (count === 3) {
//      return style;
//    }
//    if (count > max) {
//      max = count;
//      maxes = [style];
//    } else if (count === max) {
//      maxes = maxes.concat([style]);
//    }
//  }
//  if (max === 2) {
//    if (maxes.length !== 2) {
//      return maxes[0];
//    } else {
//      down;
//    }
//  }
//  if (indexOf.call(maxes, down) >= 0) {
//    return down;
//  } else if (indexOf.call(maxes, up) >= 0) {
//    return up;
//  } else if (indexOf.call(maxes, right) >= 0) {
//    return right;
//  } else if (indexOf.call(maxes, left) >= 0) {
//    return left;
//  }
//  return 'normal';
// };

// module.exports = function({left, up, right, down}) {
//  var i, len, opt, options, ref, style, styles;
//  if (left == null) {
//    left = 'none';
//  }
//  if (up == null) {
//    up = 'none';
//  }
//  if (right == null) {
//    right = 'none';
//  }
//  if (down == null) {
//    down = 'none';
//  }
//  styles = {};
//  ref = [left, up, right, down];
//  for (i = 0, len = ref.length; i < len; i++) {
//    style = ref[i];
//    if (!(style !== 'none')) {
//      continue;
//    }
//    if (styles[style] == null) {
//      styles[style] = 0;
//    }
//    styles[style] += 1;
//  }
//  options = chars[width(left)][width(up)][width(right)][width(down)];
//  opt = preferred({left, up, right, down});
//  if (opt in options) {
//    return options[opt];
//  } else {
//    return options.default;
//  }
// };




// /*



// {
//   "name": "BOX DRAWINGS LIGHT DOWN AND LEFT",
//   "category": "Box Drawing",
//   "cp": "2510",
//   "char": "'┐'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT DOWN AND RIGHT",
//   "category": "Box Drawing",
//   "cp": "250C",
//   "char": "'┌'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT DOWN AND LEFT",
//   "category": "Box Drawing",
//   "cp": "2510",
//   "char": "'┐'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT UP AND RIGHT",
//   "category": "Box Drawing",
//   "cp": "2514",
//   "char": "'└'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT UP AND LEFT",
//   "category": "Box Drawing",
//   "cp": "2518",
//   "char": "'┘'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "2500",
//   "char": "'─'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT VERTICAL",
//   "category": "Box Drawing",
//   "cp": "2502",
//   "char": "'│'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT TRIPLE DASH HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "2504",
//   "char": "'┄'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT TRIPLE DASH VERTICAL",
//   "category": "Box Drawing",
//   "cp": "2506",
//   "char": "'┆'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT QUADRUPLE DASH HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "2508",
//   "char": "'┈'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT QUADRUPLE DASH VERTICAL",
//   "category": "Box Drawing",
//   "cp": "250A",
//   "char": "'┊'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT VERTICAL AND RIGHT",
//   "category": "Box Drawing",
//   "cp": "251C",
//   "char": "'├'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT VERTICAL AND LEFT",
//   "category": "Box Drawing",
//   "cp": "2524",
//   "char": "'┤'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT DOWN AND HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "252C",
//   "char": "'┬'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT UP AND HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "2534",
//   "char": "'┴'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT VERTICAL AND HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "253C",
//   "char": "'┼'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT DOUBLE DASH HORIZONTAL",
//   "category": "Box Drawing",
//   "cp": "254C",
//   "char": "'╌'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT DOUBLE DASH VERTICAL",
//   "category": "Box Drawing",
//   "cp": "254E",
//   "char": "'╎'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT ARC DOWN AND RIGHT",
//   "category": "Box Drawing",
//   "cp": "256D",
//   "char": "'╭'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT ARC DOWN AND LEFT",
//   "category": "Box Drawing",
//   "cp": "256E",
//   "char": "'╮'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT ARC UP AND LEFT",
//   "category": "Box Drawing",
//   "cp": "256F",
//   "char": "'╯'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT ARC UP AND RIGHT",
//   "category": "Box Drawing",
//   "cp": "2570",
//   "char": "'╰'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT DIAGONAL UPPER RIGHT TO LOWER LEFT",
//   "category": "Box Drawing",
//   "cp": "2571",
//   "char": "'╱'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT DIAGONAL UPPER LEFT TO LOWER RIGHT",
//   "category": "Box Drawing",
//   "cp": "2572",
//   "char": "'╲'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT DIAGONAL CROSS",
//   "category": "Box Drawing",
//   "cp": "2573",
//   "char": "'╳'"
// },

// {
//   "name": "BOX DRAWINGS LIGHT LEFT",
//   "category": "Box Drawing",
//   "cp": "2574",
//   "char": "'╴'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT UP",
//   "category": "Box Drawing",
//   "cp": "2575",
//   "char": "'╵'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT RIGHT",
//   "category": "Box Drawing",
//   "cp": "2576",
//   "char": "'╶'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT DOWN",
//   "category": "Box Drawing",
//   "cp": "2577",
//   "char": "'╷'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT LEFT AND HEAVY RIGHT",
//   "category": "Box Drawing",
//   "cp": "257C",
//   "char": "'╼'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT UP AND HEAVY DOWN",
//   "category": "Box Drawing",
//   "cp": "257D",
//   "char": "'╽'"
// },
// {
//   "name": "BOX DRAWINGS LIGHT UP AND RIGHT",
//   "category": "Box Drawing",
//   "cp": "2514",
//   "char": "'└'"
// },




// {
//   "name": "QUADRANT UPPER LEFT AND LOWER LEFT AND LOWER RIGHT",
//   "category": "Block Elements",
//   "cp": "2599",
//   "char": "'▙'"
// },
// {
//   "name": "QUADRANT UPPER LEFT AND LOWER RIGHT",
//   "category": "Block Elements",
//   "cp": "259A",
//   "char": "'▚'"
// },
// {
//   "name": "QUADRANT UPPER LEFT AND UPPER RIGHT AND LOWER LEFT",
//   "category": "Block Elements",
//   "cp": "259B",
//   "char": "'▛'"
// },
// {
//   "name": "QUADRANT UPPER LEFT AND UPPER RIGHT AND LOWER RIGHT",
//   "category": "Block Elements",
//   "cp": "259C",
//   "char": "'▜'"
// },
// {
//   "name": "QUADRANT UPPER RIGHT AND LOWER LEFT AND LOWER RIGHT",
//   "category": "Block Elements",
//   "cp": "259F",
//   "char": "'▟'"
// },

// */