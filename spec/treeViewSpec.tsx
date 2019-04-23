import { tryTo } from 'misc-utils-of-mine-generic'
import {
  createScreen,
  Div,
  filterDescendants,
  getContent,
  installExitKeys,
  installFocusHandler,
  React,
  Screen,
  showInModal,
  TreeView,
  text,
  button,
  debug
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { log } from '../src/util/logger'

describe('treeView', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should render', async done => {
    try {
    //  const screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      // installExitKeys(screen)
const screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
installExitKeys(screen)
const rootNodes = [
  { name: 'n1', children: [{ expanded: true, name: 'n11', children: [] }] },
  { expanded: true, name: 'n2', children: [   {
    expanded: true, name: 'n21', children: [{
      expanded: true, name: 'n211', children: [
        { expanded: true, name: 'n2111', children: [{ expanded: true, name: 'n21111', children: [] }] },
      ]
    }]
  },
  { expanded: true, name: 'n22', children: [] },
  { expanded: true, name: 'n23', children: [] },
] },
  {
    expanded: true, name: 'n3', children: [
      {
        expanded: true, name: 'n31', children: [{
          expanded: true, name: 'n311', children: [
            { expanded: true, name: 'n3111', children: [{ expanded: true, name: 'n31111', children: [] }] },
          ]
        }]
      },
      { expanded: true, name: 'n32', children: [] },
      { expanded: true, name: 'n33', children: [] },
    ]
  },{
    expanded: true, name: 'n4', children: [
      {
        expanded: true, name: 'n41', children: [{
          expanded: true, name: 'n411', children: [
            { expanded: true, name: 'n4111', children: [{ expanded: true, name: 'n41111', children: [] }] },
          ]
        }]
      },
      { expanded: true, name: 'n42', children: [] },
      { expanded: true, name: 'n43', children: [] },
    ]
  }

]
const tree = new TreeView({ rootNodes, parent: screen, width: 15, height: 10, 
 style: { bg: 'black', fg: 'white', focus: { bg: 'green', fg: 'black' }, selected: {bg: 'red'} }, scrollable: true })
const t = text({ parent: screen, left: 19, top: 0, content: 'text' })
const b = button({parent: screen, left: 20, top: 8, content: 'click'})

b.on('click', ()=>{
  tree.setNodes([{   name: 'n41', children: [{     name: 'n411', children: [        {name: 'n4111', children: [{name: 'n41111', children: [] }] },     ]    }]
  },  {name: 'n42', children: [] },  {name: 'n43', children: [] },]
  )
  screen.render()
})

tree.on('nodeSelect', n => { t.content = `nodeSelect: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-------------`; screen.render() })
tree.on('nodeFocus', n => { t.content = `nodeFocus: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-------`; screen.render() })
tree.on('nodeExpand', n => { t.content = `nodeExpand: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-----------------`; screen.render() })

      screen.render()

      await waitFor(() => getContent(tree).includes('n1'))
      expect(getContent(tree)).toContain('n2')
      expect(getContent(tree)).not.toContain('n11')

      // TODO: press space to verify it expand

      // screen.program.write(' ')
      // screen.emit('key', undefined, {name: 'space'})

      // debug(getContent(tree))

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })
})
