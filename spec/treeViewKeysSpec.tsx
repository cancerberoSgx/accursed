import { array, tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, installExitKeys, Node, printElement, Screen, TreeView } from '../src'
import { waitFor } from '../src/blessed/waitFor'

class KeyHelper {
  constructor(protected node: Node) {}
  down() {
    this.node.emit('key down', undefined, { name: 'down' })
  }
  up() {
    this.node.emit('key up', undefined, { name: 'up' })
  }
  space() {
    this.node.emit('key space', undefined, { name: 'space' })
  }
  enter() {
    this.node.emit('key enter', undefined, { name: 'enter' })
  }
}

describe('treeView', () => {
  let screen: Screen
  let tree: TreeView
  let key: KeyHelper

  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  beforeEach(async () => {
    screen = createScreen({})
    installExitKeys(screen)
    tree = new TreeView({
      rootNodes,
      parent: screen,
      width: 35,
      height: 8,
      style: { bg: 'blue', fg: 'white', focusedNode: { bg: 'green', fg: 'black' }, selectedNode: { bg: 'red' } },
      scrollable: true
    })
    key = new KeyHelper(tree)
    tree.focus()
    screen.render()
    await waitFor(() => !!printElement(tree).trim())
  })

  // jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('should render given expanded nodes', async done => {
    expect(printElement(tree)).toContain('n1')
    expect(printElement(tree)).not.toContain('n11')
    expect(printElement(tree)).toContain('n2')
    const n2Descendants = ['n21', 'n211', 'n2111', 'n21111']
    n2Descendants.forEach(name => expect(printElement(tree)).toContain(name))
    done()
  })

  it('should focus the first node by default', async done => {
    expect(tree.getFocusedNode().name).toBe('n1')
    done()
  })

  it('should change focused node when pressing UP or DOWN', async done => {
    expect(tree.getFocusedNode().name).toBe('n1')
    key.down()
    expect(tree.getFocusedNode().name).toBe('n2')
    key.down()
    expect(tree.getFocusedNode().name).toBe('n21') // can step down
    key.up()
    expect(tree.getFocusedNode().name).toBe('n2')
    key.up()
    expect(tree.getFocusedNode().name).toBe('n1')
    key.up()
    expect(tree.getFocusedNode().name).toBe('n1') // can't go further up
    key.down()
    key.down()
    key.down()
    expect(tree.getFocusedNode().name).toBe('n211')
    key.down()
    expect(tree.getFocusedNode().name).toBe('n2111')
    key.down()
    expect(tree.getFocusedNode().name).toBe('n21111')
    key.up()
    expect(tree.getFocusedNode().name).toBe('n2111')
    key.down()
    key.down()
    expect(tree.getFocusedNode().name).toBe('n22') // can step up
    key.down()
    expect(tree.getFocusedNode().name).toBe('n23')
    key.down()
    expect(tree.getFocusedNode().name).toBe('n3')
    done()
  })

  it('should expand/collapse nodes when pressing SPACE', async done => {
    expect(printElement(tree)).not.toContain('n11')
    key.space()
    expect(printElement(tree)).toContain('n11')
    key.space()
    expect(printElement(tree)).not.toContain('n11')
    key.down()
    expect(tree.getFocusedNode().name).toBe('n2')
    const n2Descendants = ['n21', 'n211', 'n2111', 'n21111', 'n22', 'n23']
    n2Descendants.forEach(name => expect(printElement(tree)).toContain(name))
    key.space()
    n2Descendants.forEach(name => expect(printElement(tree)).not.toContain(name))
    key.space()
    n2Descendants.forEach(name => expect(printElement(tree)).toContain(name))
    done()
  })

  it('should select/deselect nodes when pressing ENTER by default only one node', async done => {
    expect(tree.getSelectedNodes().map(n => n.name)).toEqual([])
    key.space()
    key.down()
    key.enter()
    expect(tree.getSelectedNodes().map(n => n.name)).toEqual(['n11'])
    key.enter()
    expect(tree.getSelectedNodes().map(n => n.name)).toEqual([])
    key.down()
    key.enter()
    expect(tree.getSelectedNodes().map(n => n.name)).toEqual(['n2'])
    key.down()
    key.enter()
    expect(tree.getSelectedNodes().map(n => n.name)).toEqual(['n21'])
    done()
  })

  it('should scroll down when focusing lower nodes', async done => {
    expect(printElement(tree)).toContain('n1')
    expect(printElement(tree)).not.toContain('n3') // outside frame
    expect(printElement(tree)).not.toContain('n4')
    array(9).forEach(() => key.down())
    expect(printElement(tree)).toContain('n3')
    expect(printElement(tree)).not.toContain('n4') // outside frame
    expect(printElement(tree)).not.toContain('n1') // outside frame
    done()
  })
})

const rootNodes = [
  { name: 'n1', children: [{ expanded: true, name: 'n11', children: [] }] },
  {
    expanded: true,
    name: 'n2',
    children: [
      {
        expanded: true,
        name: 'n21',
        children: [
          {
            expanded: true,
            name: 'n211',
            children: [{ expanded: true, name: 'n2111', children: [{ expanded: true, name: 'n21111', children: [] }] }]
          }
        ]
      },
      { expanded: true, name: 'n22', children: [] },
      { expanded: true, name: 'n23', children: [] }
    ]
  },
  {
    expanded: false,
    name: 'n3',
    children: [
      {
        expanded: true,
        name: 'n31',
        children: [
          {
            expanded: true,
            name: 'n311',
            children: [{ expanded: true, name: 'n3111', children: [{ expanded: true, name: 'n31111', children: [] }] }]
          }
        ]
      },
      { expanded: true, name: 'n32', children: [] },
      { expanded: true, name: 'n33', children: [] }
    ]
  },
  {
    expanded: false,
    name: 'n4',
    children: [
      {
        expanded: true,
        name: 'n41',
        children: [
          {
            expanded: true,
            name: 'n411',
            children: [{ expanded: true, name: 'n4111', children: [{ expanded: true, name: 'n41111', children: [] }] }]
          }
        ]
      },
      { expanded: true, name: 'n42', children: [] },
      { expanded: true, name: 'n43', children: [] }
    ]
  }
]
