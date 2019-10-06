import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, Div, filterDescendants, getContent, installExitKeys, installFocusHandler, React, Screen, showInModal } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Button2 } from '../src/jsx-components'
import { debug } from '../src/util/logger'

describe('button2', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should render', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      const t1 = (
        <Div>
          <Button2
            border="line"
            style={{ bg: 'red', focus: { bg: 'blue' } }}
            mouse={true}
            clickable={true}
            focusable={true}
            onClick={e => {
              showInModal(e.currentTarget.screen, 'ajsjsjsjsjs')
              e.currentTarget.content = Math.random() + ''
              e.currentTarget.screen.render()
              debug('clicked ', e)
            }}>
            click me
          </Button2>
        </Div>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, el => el.type === 'button'), screen)

      // screen.key('tab', k => screen.focusNext())
      // screen.key('S-tab', k => screen.focusPrevious())

      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('click me'))
      expect(getContent(el)).toContain('click me')
      // expect(getContent(el)).toContain('tab 2')
      // expect(getContent(el)).toContain('button1')

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})
