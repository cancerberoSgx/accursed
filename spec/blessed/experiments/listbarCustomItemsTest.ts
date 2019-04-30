// import * as blessed from 'blessed'

// var auto = false

// let screen = blessed.screen({
//   // dump: __dirname + '/logs/listbar.log',
//   autoPadding: auto
//   // warnings: true
// })

// var box = blessed.box({
//   parent: screen,
//   top: 0,
//   right: 0,
//   width: 'shrink',
//   height: 'shrink',
//   content: '...'
// })

// var bar = blessed.listbar({
//   //parent: screen,
//   bottom: 0,
//   left: 3,
//   right: 3,
//   height: auto ? 'shrink' : 3,
//   mouse: true,
//   keys: true,
//   autoCommandKeys: true,
//   border: 'line',
//   vi: true,
//   style: {
//     bg: 'green',
//     item: {
//       bg: 'red',
//       hover: {
//         bg: 'blue'
//       },
//       focus: {
//        bg: 'blue'
//       }
//     },
//     selected: {
//       bg: 'blue',
//       border: {
//         type: 'line',
//         fg: 'cyan'
//       }
//     }
//   },
//   // we will use the object synyax altough an arrya symyax is also supported.
//   commands: {
//     one: {
//       keys: ['a'],
//       callback() {
//         box.setContent('Pressed one.')
//         screen.render()
//       }
//     },
//     // just a function
//     two: function() {
//       box.setContent('Pressed two.')
//       screen.render()
//     },
//     three: {
//       keys: ['3'],
//       callback() {
//       box.setContent('Pressed three.')
//       screen.render()
//     }
//   },
//   } ,
//   items: [
//     blessed.text({content: 'hohoho', style: {bg: 'yellow'}})
//   ]
// })

// screen.append(bar)

// bar.focus()

// screen.key('q', function() {
//   return screen.destroy()
// })

// screen.render()
