import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import * as fs from 'fs'
import { debug, installExitKeys } from '../../../src';

var screen = blessed.screen({
  tput: true,
  smartCSR: true,
})

const fm = blessed.filemanager({
  parent: screen,
  // cwd: '.',
  border: 'line',
  style: {
    selected: {
      bg: 'blue'
    }
  },
  height: 'half',
  width: 'half',
  top: 'center',
  left: 'center',
  label: ' {blue-fg}%path{/blue-fg} ',
  cwd: process.env.HOME,
  keys: true,
  vi: true,
  scrollbar: {
    bg: 'white',
    ch: ' '
  }
})

fm.pick('.', function (){
debug(arguments)
})

installExitKeys(screen)
screen.render()

var box = blessed.box({
  parent: screen,
  style: {
    bg: 'green'
  },
  border: 'line',
  height: 'half',
  width: 'half',
  top: 'center',
  left: 'center',
  hidden: true
});

fm.refresh();

screen.render();

screen.key('q', function() {
  screen.destroy();
});

screen.key(['s', 'p'], function() {
  fm.hide();
  screen.render();
  setTimeout(function() {
    fm.pick(function(err, file) {
      box.show();
      box.setContent(err ? err + '' : file!);
      screen.render();
      setTimeout(function() {
        box.hide();
        fm.reset(function() {
          fm.show();
          screen.render();
        });
      }, 2000);
    });
  }, 2000);
});


// tree.focus()
screen.render()


// //create layout and widgets
// var grid = new contrib.grid({ rows: 1, cols: 2, screen: screen })

// var tree = grid.set(0, 0, 1, 1, contrib.tree, {
//   style: { fg: 'red' },
//   template: { lines: true },
//   label: 'Filesystem Tree'
// })

// var table = grid.set(0, 1, 1, 1, contrib.table, {
//   keys: true,
//   fg: 'green',
//   label: 'Informations',
//   columnWidth: [24, 10, 10]
// })

// //file explorer
// var explorer = {
//   name: '/',
//   extended: true,
//   // Custom function used to recursively determine the node path
//   getPath: function(self: any) {
//     // If we don't have any parent, we are at tree root, so return the base case
//     if (!self.parent) return ''
//     // Get the parent node path and add this node name
//     return self.parent.getPath(self.parent) + '/' + self.name
//   },
//   // Child generation function
//   children: function(self: any) {
//     var result: any = {}
//     var selfPath = self.getPath(self)
//     try {
//       // List files in this directory
//       var children = fs.readdirSync(selfPath + '/')

//       // childrenContent is a property filled with self.children() result
//       // on tree generation (tree.setData() call)
//       if (!self.childrenContent) {
//         for (var child in children) {
//           child = children[child]
//           var completePath = selfPath + '/' + child
//           if (fs.lstatSync(completePath).isDirectory()) {
//             // If it's a directory we generate the child with the children generation function
//             result[child] = { name: child, getPath: self.getPath, extended: false, children: self.children }
//           } else {
//             // Otherwise children is not set (you can also set it to "{}" or "null" if you want)
//             result[child] = { name: child, getPath: self.getPath, extended: false }
//           }
//         }
//       } else {
//         result = self.childrenContent
//       }
//     } catch (e) {}
//     return result
//   }
// }

// //set tree
// tree.setData(explorer)

// // Handling select event. Every custom property that was added to node is
// // available like the "node.getPath" defined above
// tree.on('select', function(node) {
//   var path = node.getPath(node)
//   var data = []

//   // The filesystem root return an empty string as a base case
//   if (path == '') path = '/'

//   // Add data to right array
//   data.push([path])
//   data.push([''])
//   try {
//     // Add results
//     data = data.concat(
//       JSON.stringify(fs.lstatSync(path), null, 2)
//         .split('\n')
//         .map(function(e) {
//           return [e]
//         })
//     )
//     table.setData({ headers: ['Info'], data: data })
//   } catch (e) {
//     table.setData({ headers: ['Info'], data: [[e.toString()]] })
//   }

//   screen.render()
// })

// //set default table
// table.setData({ headers: ['Info'], data: [[]] })

// screen.key(['escape', 'q', 'C-c'], function(ch, key) {
//   return process.exit(0)
// })

// screen.key(['tab'], function(ch, key) {
//   if (screen.focused == tree.rows) table.focus()
//   else tree.focus()
// })


// var blessed = require('../');

// var screen = blessed.screen({
//   tput: true,
//   smartCSR: true,
//   dump: __dirname + '/logs/file.log',
//   warnings: true
// });

// var fm = filemanager({
//   parent: screen,
//   border: 'line',
//   style: {
//     selected: {
//       bg: 'blue'
//     }
//   },
//   height: 'half',
//   width: 'half',
//   top: 'center',
//   left: 'center',
//   label: ' {blue-fg}%path{/blue-fg} ',
//   cwd: process.env.HOME,
//   keys: true,
//   vi: true,
//   scrollbar: {
//     bg: 'white',
//     ch: ' '
//   }
// });

var box = blessed.box({
  parent: screen,
  style: {
    bg: 'green'
  },
  border: 'line',
  height: 'half',
  width: 'half',
  top: 'center',
  left: 'center',
  hidden: true
});

fm.refresh();

screen.render();

screen.key('q', function() {
  screen.destroy();
});

screen.key(['s', 'p'], function() {
  fm.hide();
  screen.render();
  setTimeout(function() {
    fm.pick(function(err, file) {
      box.show();
      box.setContent(err ? err + '' : file!);
      screen.render();
      setTimeout(function() {
        box.hide();
        fm.reset(function() {
          fm.show();
          screen.render();
        });
      }, 2000);
    });
  }, 2000);
});


// tree.focus()
screen.render()
