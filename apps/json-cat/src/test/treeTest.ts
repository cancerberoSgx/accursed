import { createScreen } from 'accursed'
import * as contrib from 'blessed-contrib'

const screen = createScreen({ smartCSR: true })

var tree = contrib.tree({
  //@ts-ignore
  fg: 'green',
  mouse: true,
  clickable: true,
  scrollable: true,
  draggable: true,
  scrollbar: {
    ch: ' ',
    track: {
      bg: 'cyan'
    },
    style: {
      inverse: true
    }
  }
}) as any

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0)
})
tree.on('click', (data: any) => {
  console.log(data)
})
tree.on('select', function(node: any) {
  console.log('select', node.name)
  screen.render()
})

screen.append(tree)
tree.focus()
screen.render()
tree.focus()
tree.render()
screen.render()

// you can specify a name property at root level to display root
tree.setData({
  extended: true,
  children: {
    Fruit: {
      children: {
        Banana: {},
        Apple: {},
        Cherry: {},
        Exotics: {
          children: {
            Mango: {},
            Papaya: {},
            Kiwi: { name: 'Kiwi (not the bird!)', myCustomProperty: 'hairy fruit' }
          }
        },
        Pear: {}
      }
    },
    Vegetables: {
      children: {
        Peas: {},
        Lettuce: {},
        Pepper: {}
      }
    }
  }
})

// var table = contrib.table({
//   keys: true,
//   fg: 'white',
//   draggable: true,
//   mouse: true,
//   selectedFg: 'white',
//   selectedBg: 'blue',
//   interactive: true,
//   label: 'Active Processes',
//   width: '30%',
//   clickable: true,
//   height: '30%',
//   border: { type: 'line', fg: 1 },
//   columnSpacing: 10, //in chars
//   columnWidth: [16, 12, 12] /*in chars*/
// })

// //allow control the table with the keyboard
// table.focus()

// table.setData({
//   headers: ['col1', 'col2', 'col3'],
//   data: [
//     [1, 2, 3],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6],
//     [4, 5, 6]
//   ]
// })

// screen.append(table)
// table.focus()
// screen.render()
// tree.focus()
// tree.render()
// screen.render()

// var markdown = contrib.markdown()
// markdown.setMarkdown('# Hello \n blessed-contrib renders markdown using `marked-terminal`')
