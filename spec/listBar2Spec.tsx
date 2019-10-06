import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, debug, getContent, installExitKeys, React, Screen, showInModal } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Button2, Div } from '../src/jsx-components'
import { ListBar2, ListBarCommand } from '../src/jsx-components/listBar'
import { ref } from '../src/jsx/createElement'

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
      let listBar: ListBar2
      const t1 = (
        <Div>
          <Button2
            onClick={e => {
              listBar.addCommand({
                text: 'newCommad',
                callback() { }
              })
            }}>
            add item
          </Button2>
          <ListBar2 ref={ref(c => (listBar = c))}>
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

      //TODO: interactive
    } catch (error) {
      debug('ERROR', error)
    }
  })
  xit('keys should work', () => { })
})
