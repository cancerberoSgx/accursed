import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, Div, getContent, installExitKeys, React, Screen, Br } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Tab, TabBody, TabLabel, TabPanel } from '../src/jsx-components'
import { log } from '../src/util/logger'
import { words, string } from '../src/util/data';

describe('tabPanelComponent', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should render labels and body', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      installExitKeys(screen)
      const t1 = (
        <Div parent={screen}>
          <TabPanel activeStyle={{fg: 'red', underline: true}} inactiveStyle={{fg: 'blue', underline: false}}>
            <Tab active={true}>
              <TabLabel>tab 1</TabLabel>
              <TabBody>body1
                {words().join(' ')}
                <Br/><button content={string()} border="line"></button> <Br/>
                {words().join(' ')}
                <Br/><button content="button1" border="line"></button> <Br/>
                {words().join(' ')}
              </TabBody>
              {}
            </Tab>
            <Tab>
              <TabLabel>tab 2</TabLabel>
              <TabBody>body2
                {words().join(' ')}
                <Br/><button content={string()} border="line"></button> <Br/>
                {words().join(' ')}
                <Br/><button content="button2" border="line"></button> <Br/>
                {words().join(' ')}
              </TabBody>
              {}
            </Tab>
            {}
          </TabPanel>
        </Div>
      )

      const el = React.render(t1)
      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('tab 1'))
      expect(getContent(el)).toContain('body1')
      expect(getContent(el)).toContain('tab 2')
      expect(getContent(el)).toContain('button1')
      // expect(getContent(el)).toContain('button2')
      // expect(getContent(el)).not.toContain('body2')

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })
})
