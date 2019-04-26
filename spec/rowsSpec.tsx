import { tryTo } from 'misc-utils-of-mine-generic'
import {
  createScreen,
  filterDescendants,
  getContent,
  installExitKeys,
  installFocusHandler,
  React,
  Screen,
  Br, Collapsible, Row, Rows, Div
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { words } from '../src/util/data'
import { log } from '../src/util/logger'

describe('rows', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  // jasmine.DEFAULT_TIMEOUT_INTERVAL=9999
  it('should layout content in rows', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      const t1 = (
        <Div>
          <Collapsible>
            <Br />
            {words(10).join(' ')}
            <Br />
            <Rows>
              <Row bg="red">
                Row1
                <Br />
                {words(250).join(' ')}
              </Row>
              <Row bg="blue">
                Row2
                <Br />
                {words(250).join(' ')}
              </Row>
              <Row bg="yellow">
                Row3
                <Br />
                {words(210).join(' ')}
              </Row>
              {}
            </Rows>
            <Br />
            {words(10).join(' ')}
            <Br />
          </Collapsible>

          <Collapsible collapsed={true}>
            <Br />
            {words(10).join(' ')}
            <Br />
            <Rows>
              <Row bg="red" height="20%">
                Row1
                <Br />
                {words(250).join(' ')}
              </Row>
              <Row bg="blue" height="50%">
                Row2
                <Br />
                {words(250).join(' ')}
              </Row>
              <Row bg="yellow" height="30%">
                Row3
                <Br />
                {words(210).join(' ')}
              </Row>
              {}
            </Rows>
            <Br />
            {words(10).join(' ')}
            <Br />
          </Collapsible>
        </Div>
      )

      const el = React.render(t1)
      // installFocusHandler('test1', filterDescendants(el, el => el.type === 'list'), screen)

      screen.append(el)
      screen.render()

      log(getContent(el))
      await waitFor(() => getContent(el).includes('Row1'))
      expect(getContent(el)).toContain('Row2')
      expect(getContent(el)).toContain('Row3')

      // //TODO: test the handler...

      done()
    } catch (error) {
      log('ERROR', error)
    }
  })
})
