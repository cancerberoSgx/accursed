import { tryTo } from 'misc-utils-of-mine-generic'
import { Br, createScreen, debug, Div, filterDescendants, findDescendantNamed, getContent, installExitKeys, installFocusHandler, printElement, React, Screen } from '../src'
import { getJSXChildrenProps } from '../src/blessed/virtualElement'
import { waitFor } from '../src/blessed/waitFor'
import { Column, Columns, Tab, TabBody, TabLabel, TabPanel } from '../src/jsx-components'
import { string, words } from '../src/util/data'
import { logText, renderDescendants } from '../src/util/debugNode'

describe('tabPanelComponent', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should render labels and body', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      const t1 = (
        <Div parent={screen}>
          <TabPanel activeTab={{ fg: 'red', underline: true }} inactiveTab={{ fg: 'blue', underline: false }}>
            <Tab active={true}>
              <TabLabel style={{ focus: { bg: 'yellow' } }}>tab 1</TabLabel>
              <TabBody>
                body1
                {words().join(' ')}
                <Br />
                <button content={string()} border="line" focusable={true} /> <Br />
                {words().join(' ')}
                <Br />
                <button content="button1" border="line" focusable={true} /> <Br />
                {words().join(' ')}
              </TabBody>
              {}
            </Tab>
            <Tab>
              <TabLabel style={{ focus: { bg: 'yellow' } }}>tab 2</TabLabel>
              <TabBody>
                body2
                {words().join(' ')}
                <Br />
                <button content={string()} border="line" /> <Br />
                {words().join(' ')}
                <Br />
                <button content="button2" border="line" /> <Br />
                {words().join(' ')}
              </TabBody>
              {}
            </Tab>

            <Tab>
              <TabLabel style={{ focus: { bg: 'yellow' } }}>tab 3</TabLabel>
              <TabBody>body3</TabBody>
              {}
            </Tab>
            {}
          </TabPanel>
        </Div>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, TabPanel.isLabel), screen, undefined, false, true)

      screen.key('tab', k => screen.focusNext())
      screen.key('S-tab', k => screen.focusPrevious())

      screen.append(el)
      screen.render()

      await waitFor(() => printElement(el).includes('tab 1'))
      expect(printElement(el)).toContain('body1')
      expect(printElement(el)).toContain('tab 2')
      expect(printElement(el)).toContain('button1')
      expect(printElement(el)).not.toContain('body2')

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  xit('should add tabs dynamically', async done => {
    let tabPanel: TabPanel
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      // installFocusHandler('test1', filterDescendants(el, TabPanel.isLabel), screen, undefined, false, true)
      const t1 = (
        <Div parent={screen}>
          <Columns>
            <Column>
              <TabPanel ref={React.createRef(c => (tabPanel = c))}>
                <Tab active={true}>
                  <TabLabel>tab 1</TabLabel>
                  <TabBody>body1</TabBody>
                  {}
                </Tab>
                <Tab>
                  <TabLabel>tab 2</TabLabel>
                  <TabBody>body2</TabBody>
                  {}
                </Tab>
                {}
              </TabPanel>
            </Column>
            {}

            <Column>
              {/* here there will be the node tree <Br />
              here there will be the node tree <Br />
              here there will be the node tree <Br />
              here there will be the node tree <Br />
              here there will be the node tree <Br /> */}
              {/* <Br />    */}

              <Div border="line" label="hell" name="debug-node-tree" />
              {/* <box border="line" label="hell" name="debug-node-tree" height="90%" width="100%">
          
          </box> */}
              {/* <Br /> */}
              {/* here there will be the node tree <Br />
              here there will be the node tree <Br />
              here there will be the node tree <Br /> */}
            </Column>
            {}
          </Columns>
          {}

          {/* <box border="line" name="debug1">hello!al skdjalks jdlkaj sdklaj sld ks</box> */}
        </Div>
      )
      const el = React.render(t1)

      screen.key('tab', k => screen.focusNext())
      screen.key('S-tab', k => screen.focusPrevious())

      // screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('tab 1'))
      // expect(getContent(el)).toContain('body1')
      // expect(getContent(el)).toContain('tab 2')
      // expect(printElement(el)).not.toContain('body2')

      // debug(JSON.stringify(getTreeNode(screen)))
      // debug('debug-node-tree', findDescendantNamed(el, 'debug-node-tree')  )
      // debug(!!parent, typeof parent, Array.isArray(parent) , parent.type, parent.name)
      renderDescendants(el.parent as any, { parent: findDescendantNamed(el, 'debug-node-tree') })

      logText(el, JSON.stringify(getJSXChildrenProps(tabPanel)))

      // screen.append(w)
      // parent.append(w)
      // parent.style.bg='red'
      // parent.style.fg='blue'
      // renderDescendants(el, {parent:screen})

      tabPanel!.insertTab({}, { content: 'new label' }, { children: React.render(<Div>Hello World</Div>) }, 0)
      screen.render()

      // await waitFor(() => printElement(el).includes('new label'))
      // expect(printElement(el)).toContain('Hello World')
      // el.
      // done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  xit('should show body when label clicked and hide the other bodies', () => { })

  xit('should show body when calling selectTab() ', () => { })

  xit('should notify tab activation with props.onChange) ', () => { })

  xit('should support keyboard', () => { })
})
