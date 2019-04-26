import { tryTo } from 'misc-utils-of-mine-generic'
import {
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
import { Br, Select, SelectOption } from '../src/jsx-components'
import { words } from '../src/util/data'
import { log } from '../src/util/logger'

describe('select', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should show list of items', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      const t1 = (
        <Div>
          <Br />
          {words().join(' ')}
          <Br />
          <Select
            border="line"
            onSelect={e => {
              log(e.value, e.index)
            }}>
            <SelectOption>option1</SelectOption>
            <SelectOption value="value 2">option2</SelectOption>
            <SelectOption value="value 3">option3</SelectOption>
            <SelectOption>option4</SelectOption>
            {['hello', 'world'].map(o => (
              <SelectOption>{o}</SelectOption>
            ))}
            {}
          </Select>
          <Br />
          {words().join(' ')}
          <Br />
        </Div>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, el => el.type === 'list'), screen)

      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('option1'))
      expect(getContent(el)).toContain('option2')

      //TODO: test the handler...

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })
})
