import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, Div, getContent, installExitKeys, React, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Tab, TabBody, TabLabel, TabPanel } from '../src/jsx-components/tabPanel'
import { log } from '../src/util/logger'

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
          <TabPanel>
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
        </Div>
      )

      const el = React.render(t1)
      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('tab 1'))
      expect(getContent(el)).toContain('body1')
      expect(getContent(el)).toContain('tab 2')
      // expect(getContent(el)).not.toContain('body2')

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })
})
