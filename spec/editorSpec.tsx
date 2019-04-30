import { tryTo } from 'misc-utils-of-mine-generic'
import {
  Br,
  createScreen,
  Div,
  React,
  Screen,
  debug, Tab, TabBody, TabLabel, TabPanel, Columns, Column, Rows, Row, printElement
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { } from '../src/jsx-components'
import { sleep } from './blessedTestUtil';

describe('editor', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  beforeEach(() => {
    tryTo(() => screen.destroy())
    screen = createScreen({})
    screen.key('C-q', k => {
      screen.destroy()
      process.exit(1)
    })
    screen.key('C-right', k => {
      screen.focusNext()
      screen.render()
    })
  })

  describe('jsx', () => {
    fit('dont need to pass parent', async done => {
      const el = React.render(<box >
        <editor text="function f(a){return a + 11}" language="js" />
      </box>
      )
      screen.render()
      await sleep(100)
      expect(printElement(screen)).not.toContain('function f(a)')
      await sleep(100)
      screen.append(el)
      screen.render()
      await waitFor(() => printElement(screen).includes('function f(a)'))
      expect(printElement(el)).toContain('a + 11')
      done()
    })
  })

})
