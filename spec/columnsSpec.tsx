import { tryTo } from 'misc-utils-of-mine-generic'
import {
  createScreen,
  filterDescendants,
  getContent,
  installExitKeys,
  installFocusHandler,
  React,
  Screen
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Br, Collapsible, Column, Columns, Div } from '../src/jsx-components'
import { words } from '../src/util/data'
import { log } from '../src/util/logger'

describe('columns', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should layout content in columns', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      const t1 = (
        <Div>
          <Collapsible>
            <Br />
            {words(10).join(' ')}
            <Br />
            <Columns>
              <Column bg="red">
                column1
                <Br />
                {words(250).join(' ')}
              </Column>
              <Column bg="blue">
                column2
                <Br />
                {words(250).join(' ')}
              </Column>
              <Column bg="yellow">
                column3
                <Br />
                {words(210).join(' ')}
              </Column>
              {}
            </Columns>
            <Br />
            {words(10).join(' ')}
            <Br />
          </Collapsible>

          <Collapsible collapsed={true}>
            <Br />
            {words(10).join(' ')}
            <Br />
            <Columns>
              <Column bg="red" width="30%">
                column1
                <Br />
                {words(250).join(' ')}
              </Column>
              <Column bg="blue" width="70%">
                column2
                <Br />
                {words(250).join(' ')}
              </Column>
              <Column bg="yellow">
                column3
                <Br />
                {words(210).join(' ')}
              </Column>
              {}
            </Columns>
            <Br />
            {words(10).join(' ')}
            <Br />
          </Collapsible>
        </Div>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, el => el.type === 'list'), screen)

      screen.append(el)
      screen.render()

      // log(getContent(el))
      await waitFor(() => getContent(el).includes('column1'))
      expect(getContent(el)).toContain('column2')
      expect(getContent(el)).toContain('column3')

      //TODO: test the handler...

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })
})
