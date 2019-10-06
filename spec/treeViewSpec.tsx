import { tryTo } from 'misc-utils-of-mine-generic'
import { box, Br, button, createScreen, debug, Div, getContent, installExitKeys, printElement, React, Screen, text, Text, TreeView } from '../src'
import { waitFor } from '../src/blessed/waitFor'

describe('treeView', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  beforeEach(async () => {
    screen = createScreen({})
    installExitKeys(screen)
    screen.render()
  })

  it('should render', async done => {
    try {
      const tree = new TreeView({
        rootNodes,
        parent: screen,
        width: 15,
        height: 10,
        style: { bg: 'blue', fg: 'white', focusedNode: { bg: 'green', fg: 'black' }, selectedNode: { bg: 'red' } },
        scrollable: true
      })
      const t = text({ parent: screen, left: 19, top: 0, content: 'text' })
      const b = button({ parent: screen, left: 20, top: 8, content: 'click' })

      b.on('click', () => {
        tree.setNodes([
          {
            name: 'n41',
            children: [{ name: 'n411', children: [{ name: 'n4111', children: [{ name: 'n41111', children: [] }] }] }]
          },
          { name: 'n42', children: [] },
          { name: 'n43', children: [] }
        ])
        screen.render()
      })

      tree.on('nodeSelect', n => {
        t.content = `nodeSelect: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-------------`
        screen.render()
      })
      tree.on('nodeFocus', n => {
        t.content = `nodeFocus: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-------`
        screen.render()
      })
      tree.on('nodeExpand', n => {
        t.content = `nodeExpand: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-----------------`
        screen.render()
      })

      tree.focus()
      screen.render()
      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  it('should support jsx', async done => {
    try {
      const treeRef = React.createRef<TreeView>()
      const textRef = React.createRef<Text>()
      React.render(
        <treeview
          parent={screen}
          ref={treeRef}
          rootNodes={rootNodes}
          width={15}
          height={10}
          style={{ bg: 'black', fg: 'white', focusedNode: { bg: 'green', fg: 'black' }, selectedNode: { bg: 'red' } }}
          scrollable={true}
          onNodeSelect={node => {
            textRef.current!.content = `nodeSelect: ${node && !Array.isArray(node) && node.name}, focusedNode: ${
              treeRef.current!.getFocusedNode().name
              }-------------`
            screen.render()
          }}
        />
      )

      React.render(
        <button
          {...{ parent: screen, left: 20, top: 8, content: 'click' }}
          onClick={e => {
            treeRef.current!.setNodes([
              {
                name: 'n41',
                children: [
                  { name: 'n411', children: [{ name: 'n4111', children: [{ name: 'n41111', children: [] }] }] }
                ]
              },
              { name: 'n42', children: [] },
              { name: 'n43', children: [] }
            ])
            screen.render()
          }}
        />
      )
      React.render(<text ref={textRef} {...{ parent: screen, left: 19, top: 0, content: 'text' }} />)
      screen.render()
      await waitFor(() => getContent(treeRef.current!).includes('n1'))
      expect(getContent(treeRef.current!)).toContain('n2')
      expect(getContent(treeRef.current!)).not.toContain('n11')

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  it('should render in arbitrary position and inside a box', async done => {
    // jasmine.DEFAULT_TIMEOUT_INTERVAL=99999

    try {
      const b = box({
        parent: screen,
        top: 13,
        left: 15
      })
      const tree = new TreeView({
        rootNodes,
        parent: b,
        width: 15,
        height: 10,
        style: { bg: 'blue', fg: 'white', focusedNode: { bg: 'green', fg: 'black' }, selectedNode: { bg: 'red' } },
        scrollable: true
      })
      const t = text({ parent: screen, left: 19, top: 0, content: 'text' })
      tree.on('nodeSelect', n => {
        t.content = `nodeSelect: ${n && n.name}, focusedNode: ${tree.getFocusedNode().name}-------------`
        screen.render()
      })
      tree.on('nodeFocus', n => {
        t.content = `nodeFocus: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-------`
        screen.render()
      })
      tree.on('nodeExpand', n => {
        t.content = `nodeExpand: ${n.name}, focusedNode: ${tree.getFocusedNode().name}-----------------`
        screen.render()
      })
      screen.render()
      debug(getContent(tree))
      await waitFor(() => getContent(tree).includes('n1'))
      expect(getContent(tree)).toContain('n2')
      expect(getContent(tree)).not.toContain('n11')

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  it('should support jsx2', async done => {
    try {
      const treeRef = React.createRef<TreeView>()
      const textRef = React.createRef<Text>()
      React.render(
        <Div parent={screen}>
          asdasd
          <Br />
          hello qoellskdjf
          <treeview
            ref={treeRef}
            rootNodes={rootNodes}
            width={15}
            keyable={true}
            label="jsjs"
            focusable={true}
            height={10}
            style={{
              bg: 'blue',
              fg: 'white',
              focusedNode: { bg: 'green', fg: 'black' },
              selectedNode: { bg: 'red' },
              focus: { fg: 'magenta' }
            }}
            onNodeSelect={node => {
              textRef.current!.content = `nodeSelect: ${node && !Array.isArray(node) && node.name}, focusedNode: ${
                treeRef.current!.getFocusedNode().name
                }-------------`
              screen.render()
            }}
          />
          <textbox
            value="fff"
            {...{
              width: 14,
              focusable: true,
              clickable: true,
              keys: true,
              mouse: true,
              keyable: true,
              border: 'line'
            }}
            label="filter"
            style={{ focus: { fg: 'magenta', bg: 'cyan' } }}
            onChange={e => {
              treeRef.current!.toggleNodeHide(n => n.name.toLowerCase().includes(e.value.toLowerCase()))
              screen.render()
            }}
          />
          <button
            content="click"
            focusable={true}
            keyable={true}
            border="line"
            label="jsjs"
            focused={true}
            style={{ focus: { fg: 'magenta', bg: 'cyan' } }}
          />
          <button
            content="click"
            keyable={true}
            focusable={true}
            border="line"
            style={{ focus: { fg: 'magenta', bg: 'cyan' } }}
            onClick={e => {
              debug('clic')

              treeRef.current!.setNodes([
                {
                  name: 'n41',
                  children: [
                    { name: 'n411', children: [{ name: 'n4111', children: [{ name: 'n41111', children: [] }] }] }
                  ]
                },
                { name: 'n42', children: [] },
                { name: 'n43', children: [] }
              ])
              screen.render()
            }}
          />
          <text
            ref={textRef}
            {...{
              content: 'text'
            }}
          />
        </Div>
      )
      screen.render()

      screen.key('tab', k => {
        screen.focusNext()
        screen.render()
      })
      screen.key('S-tab', k => {
        screen.focusPrevious()
        screen.render()
      })

      await waitFor(() => getContent(treeRef.current!).includes('n1'))
      expect(getContent(treeRef.current!)).toContain('n2')
      // expect(getContent(treeRef.current!)).not.toContain('n11')

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  // jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('should render per node collapsed/expanded prefix options', async done => {
    try {
      const b = box({
        parent: screen,
        top: 13,
        left: 15
      })
      const folderOptions = {
        expandedPrefix: '+',
        collapsedPrefix: '-',
        expanded: true
      }
      const txtOptions = {
        expandedPrefix: 'T',
        collapsedPrefix: 'T',
        children: [] as any
      }
      const jsOptions = {
        expandedPrefix: 'J',
        collapsedPrefix: 'J',
        children: [] as any
      }
      const tree = new TreeView({
        rootNodes: [
          {
            name: 'folder1',
            ...folderOptions,
            children: [
              { name: 'file1.txt', ...txtOptions },
              { name: 'file2.js', ...jsOptions },
              ,
              {
                name: 'folder11',
                ...folderOptions,
                children: [{ name: 'file11.txt', ...txtOptions }, { name: 'file12.js', ...jsOptions }]
              }
            ]
          }
        ],
        parent: b,
        width: 15,
        height: 10,
        style: { bg: 'blue', fg: 'white', focusedNode: { bg: 'green', fg: 'black' }, selectedNode: { bg: 'red' } },
        scrollable: true
      })
      screen.render()
      await waitFor(() => printElement(tree).includes('+ folder1'))
      expect(printElement(tree)).toContain('T file1.txt')
      expect(printElement(tree)).toContain('J file2.js')

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})

const rootNodes = [
  { name: 'n1', children: [{ expanded: true, name: 'n11', children: [] as any }] },
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
            children: [{ expanded: true, name: 'n2111', children: [{ expanded: true, name: 'n21111', children: [] as any }] }]
          }
        ]
      },
      { expanded: true, name: 'n22', children: [] },
      { expanded: true, name: 'n23', children: [] }
    ]
  },
  {
    expanded: true,
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
    expanded: true,
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
