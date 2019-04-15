import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'

const screen = blessed.screen()
var grid = new contrib.grid({ rows: 12, cols: 12, screen: screen })

var map = grid.set(0, 0, 4, 4, contrib.map, { label: 'World Map' })
var box = grid.set(4, 4, 4, 4, blessed.box, { content: 'My Box' })

screen.render()
