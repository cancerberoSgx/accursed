import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, debug, getContent, installExitKeys, React, Screen, showInModal } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Div } from '../src/jsx-components'
import { ListBar2, ListBarCommand } from '../src/jsx-components/listBar'

describe('listbar', () => {
  let screen: Screen

  beforeEach(() => {
    tryTo(() => screen.destroy())
    screen = createScreen({ smartCSR: true, sendFocus: true })
    installExitKeys(screen)
    screen.key('tab', k => screen.focusNext())
    screen.key('S-tab', k => screen.focusPrevious())
  })
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should render   commands', async done => {
    try {
      const t1 = (
        <Div>
          <ListBar2 left="center">
            <ListBarCommand
              callback={() => {
                showInModal(screen, 'play')
              }}>
              play
            </ListBarCommand>
            <ListBarCommand
              callback={() => {
                showInModal(screen, 'stop')
              }}>
              stop
            </ListBarCommand>
            <ListBarCommand
              callback={() => {
                showInModal(screen, 'eat')
              }}>
              eat
            </ListBarCommand>
            <ListBarCommand
              keys={['r']}
              callback={() => {
                showInModal(screen, 'record')
              }}>
              record
            </ListBarCommand>
            {}
          </ListBar2>
        </Div>
      )
      const el = React.render(t1)
      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('play'))
      expect(getContent(el)).toContain('record')
      done()

      //TODO: interative
    } catch (error) {
      debug('ERROR', error)
    }
  })
  xit('keys should work', () => {})
})
