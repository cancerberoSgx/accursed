import { tryTo } from 'misc-utils-of-mine-generic'
import {
  box,
  Br,
  button,
  createScreen,
  debug,
  Div,
  getContent,
  installExitKeys,
  React,
  Screen,
  text,
  Text,
  TreeView,
  program
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { log } from '../src/util/logger'
import { ansi } from 'cli-driver';
import { sleep } from './blessedTestUtil';

describe('treeView', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('should render', async done => {
    try {
      screen = createScreen({ 
        smartCSR: true, 
        log: 'log.txt', 
        ignoreLocked: true,
        tput: true
      })
      installExitKeys(screen)
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
      log('ERROR', error)
    }
  })



  it('should respond to keys', async done => {
    try {
      screen = createScreen({ 
      })
      installExitKeys(screen)
      const tree = new TreeView({
        rootNodes,
        parent: screen,
        width: 15,
        height: 10,
        style: { bg: 'blue', fg: 'white', focusedNode: { bg: 'green', fg: 'black' }, selectedNode: { bg: 'red' } },
        scrollable: true
      })
      tree.focus()
      screen.render()
      
      await waitFor(() => tree.getContent().includes('n1'))
      expect(tree.getContent()).toContain('n2')
      expect(tree.getContent()).not.toContain('n11')

      expect(tree.getFocusedNode().name).toBe('n1')
      screen.emit('key space', undefined, { name: 'space'})
      expect(tree.getContent()).toContain('n11')
      
      await sleep(100)
      expect(tree.getContent()).toContain('n21')
      screen.emit('key down', undefined, {       name: 'down'})
      screen.emit('key down', undefined, {       name: 'down'})
      screen.emit('key space', undefined, { name: 'space'})
      expect(tree.getContent()).not.toContain('n21')

      await sleep(100)
      expect(tree.getFocusedNode().name).not.toBe('n21111')
      screen.emit('key space', undefined, { name: 'space'})
      screen.emit('key down', undefined, {       name: 'down'})
      screen.emit('key down', undefined, {       name: 'down'})      
      screen.emit('key down', undefined, {       name: 'down'})
      screen.emit('key down', undefined, {       name: 'down'})
      expect(tree.getFocusedNode().name).toBe('n21111')

      await sleep(100)
      expect(tree.getSelectedNodes()).toEqual([])
      screen.emit('key down', undefined, {       name: 'down'})
      screen.emit('key enter', undefined, {       name: 'enter'})
      await sleep(100)
      expect(tree.getSelectedNodes().map(n=>n.name)).toEqual(['n22'])

      await sleep(100)
      screen.emit('key down', undefined, {       name: 'down'})
      screen.emit('key enter', undefined, {       name: 'enter'})
      await sleep(100)
      expect(tree.getSelectedNodes().map(n=>n.name)).toEqual(['n23'])

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })


  it('should support jsx', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)

      const treeRef = React.createRef<TreeView>()
      const textRef = React.createRef<Text>()

      React.render(
        <treeview
          parent={screen}
          ref={treeRef}
          rootNodes={rootNodes}
          width={15}
          height={10}
          // top={2} left={5}
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

      // TODO: press space to verify it expand

      // screen.program.write(' ')
      // screen.emit('key', undefined, {name: 'space'})

      // debug(getContent(tree))

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  it('should render in arbitrary position and inside a box', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
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

      // setTimeout(() => {
      //   tree.height = 5
      //   screen.render()
      // }, 2000);
      screen.render()

      debug(getContent(tree))
      await waitFor(() => getContent(tree).includes('n1'))
      expect(getContent(tree)).toContain('n2')
      expect(getContent(tree)).not.toContain('n11')

      // TODO: press space to verify it expand

      // screen.program.write(' ')
      // screen.emit('key', undefined, {name: 'space'})

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })

  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999999

  it('should support jsx2', async done => {
    try {
      screen = createScreen({
        smartCSR: true,
        log: 'log.txt',
        focusable: true,
        sendFocus: true
        //  grabKeys: true
      })
      installExitKeys(screen)

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

      // TODO: press space to verify it expand

      // screen.program.write(' ')
      // screen.emit('key', undefined, {name: 'space'})

      // debug(getContent(tree))

      done()
    } catch (error) {
      debug('ERROR', error)
    }
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
