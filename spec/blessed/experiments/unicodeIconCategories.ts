import * as blessed from 'blessed'

var screen = blessed.screen({
  smartCSR: true,
  forceUnicode: true
})

var main = blessed.box({
  parent: screen,
  left: 'center',
  top: 'center',
  width: '90%',
  height: '90%',
  border: 'line',
  draggable: true,
  tags: true,
  content: `{light-blue-fg} Some icons ${getIcons()
    .map(s => blessed.unicode.fromCodePoint(s) + ': ' + s)
    .join(', ')} {/}`,
  scrollable: true,
  alwaysScroll: true,
  keys: true,
  vi: true,
  mouse: true
})

main.focus()

screen.key('q q -C-c', function() {
  return screen.destroy()
})

screen.render()

const categories = [
  {
    name: 'geometric shapes',
    range: [0x250a, 0x25ff],
    descriptions: [
      'Black square',
      'White square',
      'White square with rounded corners',
      'White square containing small black square',
      'Square with horizontal fill',
      'Square with vertical fill',
      'Square with orthogonal crosshatch fill',
      'Square with upper left to lower right fill',
      'Square with upper right to lower left fill',
      'Square with diagonal crosshatch fill',
      'Black small square',
      'White small square',
      'Black rectangle',
      'White rectangle',
      'Black vertical rectangle',
      'White vertical rectangle',
      'Black parallelogram',
      'White parallelogram',
      'Black up-pointing triangle',
      'White up-pointing triangle',
      'Black up-pointing small triangle',
      'White up-pointing small triangle',
      'Black right-pointing triangle',
      'White right-pointing triangle',
      'Black right-pointing small triangle',
      'White right-pointing small triangle',
      'Black right-pointing pointer',
      'White right-pointing pointer',
      'Black down-pointing triangle',
      'White down-pointing triangle',
      'Black down-pointing small triangle',
      'White down-pointing small triangle',
      'Black left-pointing triangle',
      'White left-pointing triangle',
      'Black left-pointing small triangle',
      'White left-pointing small triangle',
      'Black left-pointing pointer',
      'White left-pointing pointer',
      'Black diamond',
      'White diamond',
      'White diamond containing small black diamond',
      'Fisheye',
      'Lozenge',
      'White circle',
      'Dotted circle',
      'Circle with vertical fill',
      'Bullseye',
      'Black circle',
      'Circle with left half black',
      'Circle with right half black',
      'Circle with lower half black',
      'Circle with upper half black',
      'Circle with upper right quadrant black',
      'Circle with all but upper left quadrant black',
      'Left half circle black',
      'Right half black circle',
      'Inverse bullet',
      'Inverse white circle',
      'Upper half inverse white circle',
      'Lower half inverse white circle',
      'Upper left quadrant circular arc',
      'Upper right quadrant circular arc',
      'Lower right quadrant circular arc',
      'Lower left quadrant circular arc',
      'Upper half circle',
      'Lower half circle',
      'Black lower right triangle',
      'Black lower left triangle',
      'Black upper left triangle',
      'Black upper right triangle',
      'White bullet',
      'Square with left half black',
      'Square with right half black',
      'Square with upper left diagonal half black',
      'Square with lower right diagonal half black',
      'White square with vertical bisecting line',
      'White up-pointing triangle with dot',
      'Up-pointing triangle with left half black',
      'Up-pointing triangle with right half black',
      'Large circle',
      'White square with upper left quadrant',
      'White square with lower left quadrant',
      'White square with lower right quadrant',
      'White square with upper right quadrant',
      'White circle with upper left quadrant',
      'White circle with lower left quadrant',
      'White circle with lower right quadrant',
      'White circle with upper right quadrant',
      'Upper left triangle',
      'Upper right triangle',
      'Lower-left triangle',
      'White medium square',
      'Black medium square',
      'White medium small square',
      'Black medium small square',
      'Lower right triangle'
    ]
  },
  {
    name: 'box drawing',
    range: [0x2500, 0x257f]
  }
]

function getIcons() {
  const a: number[] = []
  for (var i = 0x2500; i < 0x257f; i++) {
    a.push(i)
  }
  return a
}
