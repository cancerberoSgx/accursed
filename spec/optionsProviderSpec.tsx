import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, debug, getContent, installExitKeys, React, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Br, Div } from '../src/jsx-components'
import { OptionsProvider } from '../src/jsx-components/optionsProvider'

describe('accordion', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should layout content like accordion', async done => {
    try {
      screen = createScreen({})
      installExitKeys(screen)
      const t1 = (
        <Div>
          <button content="click me0" border="line" style={{ fg: 'blue', border: { fg: 'yellow' } }} />

          <OptionsProvider
            options={{
              border: { type: 'line', fg: 'red', top: true, left: true },
              //  draggable: true,
              style: { fg: 'green', bold: true, border: { type: 'line', fg: 'red' } }
            }}>
            <button content="click me1" />
            <Br />
            <Div>
              <text content="heeheheh" />
              <box draggable={true} mouse={true} content="dddd" />
              <button content="click me2" border="line" style={{ fg: 'blue', border: { fg: 'yellow' } }} />
              <Div>
                <button draggable={false} content="click me3" />
              </Div>
            </Div>
          </OptionsProvider>
        </Div>
      )
      const el = React.render(t1)

      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('click me0'))
      expect(getContent(el)).toContain('click me1')
      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})
