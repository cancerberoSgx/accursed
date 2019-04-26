import { tryTo } from 'misc-utils-of-mine-generic'
import {
  Br,
  createScreen,
  Div,
  filterDescendants,
  getContent,
  installExitKeys,
  installFocusHandler,
  React,
  Screen
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Tab, TabBody, TabLabel, TabPanel } from '../src/jsx-components'
import { string, words } from '../src/util/data'
import { log } from '../src/util/logger'

xdescribe('tabPanelComponent', () => {
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
          <TabPanel activeStyle={{ fg: 'red', underline: true }} inactiveStyle={{ fg: 'blue', underline: false }}>
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
            {}
          </TabPanel>
        </Div>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, TabPanel.isLabelButton), screen, undefined, false, true)

      // screen.key('tab', k => screen.focusNext())
      // screen.key('S-tab', k => screen.focusPrevious())

      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('tab 1'))
      expect(getContent(el)).toContain('body1')
      expect(getContent(el)).toContain('tab 2')
      expect(getContent(el)).toContain('button1')

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })

  xit('should show body when label clicked and hide the other bodies', () => {})

  xit('should show body when calling selectTab() ', () => {})

  xit('should notify tab activation with props.onChange) ', () => {})

  xit('should support keyboard', () => {})
})
