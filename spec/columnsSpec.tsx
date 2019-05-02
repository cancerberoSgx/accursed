import { tryTo } from 'misc-utils-of-mine-generic'
import {
  createScreen,
  debug,
  Element,
  findAscendant,
  findDescendantNamed,
  getContent,
  installExitKeys,
  isElement,
  printElement,
  React,
  Screen,
  screenLogger
} from '../src'
import { installVisibleOnAncestorFocus } from '../src/blessed/visibleOnAncestorFocus'
import { waitFor } from '../src/blessed/waitFor'
import { Br, Button2, Collapsible, Column, Columns, Div, Row, Rows } from '../src/jsx-components'
import { words } from '../src/util/data'
import { focusableOpts } from '../src/util/sharedOptions'

describe('columns', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  beforeEach(() => {
    screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
    installExitKeys(screen)
    screen.key('tab', k => {
      screen.focusNext()
      screen.render()
    })
    screen.key('S-tab', k => {
      screen.focusPrevious()
      screen.render()
    })
  })

  it('should layout content in columns', async done => {
    try {
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
      // installFocusHandler('test1', filterDescendants(el, el => el.type === 'list'), screen)

      screen.append(el)
      screen.render()

      // log(getContent(el))
      await waitFor(() => getContent(el).includes('column1'))
      expect(getContent(el)).toContain('column2')
      expect(getContent(el)).toContain('column3')

      //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  //  jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('should set width dynamically together with Rows', async done => {
    try {
      const t1 = (
        <Div>
          {' '}
          <Columns>
            <Column name="column1" width="20%">
              <Button2
                onClick={e => {
                  findDescendantNamed(e.currentTarget.screen, 'column1').width = '40%'
                  findDescendantNamed(e.currentTarget.screen, 'column2').width = '20%'
                  findDescendantNamed(e.currentTarget.screen, 'column3').width = '40%'
                  e.currentTarget.screen.render()
                }}>
                40-20-40
              </Button2>
              <Rows>
                <Row bg="red" height="20%" name="row1">
                  <Button2
                    onClick={e => {
                      findDescendantNamed(e.currentTarget.screen, 'row1').height = '40%'
                      findDescendantNamed(e.currentTarget.screen, 'row2').height = '20%'
                      findDescendantNamed(e.currentTarget.screen, 'row3').height = '40%'
                      e.currentTarget.screen.render()
                    }}>
                    40-20-40
                  </Button2>
                </Row>
                <Row bg="blue" height="40%" name="row2">
                  <Button2
                    onClick={e => {
                      findDescendantNamed(e.currentTarget.screen, 'row1').height = '10%'
                      findDescendantNamed(e.currentTarget.screen, 'row2').height = '70%'
                      findDescendantNamed(e.currentTarget.screen, 'row3').height = '20%'
                      e.currentTarget.screen.render()
                    }}>
                    10-70-20
                  </Button2>
                </Row>
                <Row bg="yellow" height="40%" name="row3">
                  <Button2
                    onClick={e => {
                      findDescendantNamed(e.currentTarget.screen, 'row1').height = '20%'
                      findDescendantNamed(e.currentTarget.screen, 'row2').height = '10%'
                      findDescendantNamed(e.currentTarget.screen, 'row3').height = '70%'
                      e.currentTarget.screen.render()
                    }}>
                    20-10-70
                  </Button2>
                </Row>
                {}
              </Rows>
            </Column>

            <Column name="column2" width="50%" bg="cyan">
              <Button2
                onClick={e => {
                  findDescendantNamed(e.currentTarget.screen, 'column1').width = '10%'
                  findDescendantNamed(e.currentTarget.screen, 'column2').width = '70%'
                  findDescendantNamed(e.currentTarget.screen, 'column3').width = '20%'
                  e.currentTarget.screen.render()
                }}>
                10-70-20
              </Button2>
            </Column>
            <Column name="column3" width="30%" bg="green">
              <Button2
                onClick={e => {
                  findDescendantNamed(e.currentTarget.screen, 'column1').width = '20%'
                  findDescendantNamed(e.currentTarget.screen, 'column2').width = '10%'
                  findDescendantNamed(e.currentTarget.screen, 'column3').width = '70%'
                  e.currentTarget.screen.render()
                }}>
                20-10-70
              </Button2>
            </Column>
            {}
          </Columns>
        </Div>
      )
      const el = React.render(t1)
      screen.append(el)
      screen.render()

      await waitFor(() => printElement(el).includes('40-20-40'))
      expect(printElement(el)).toContain('10-70-20')
      expect(printElement(el)).toContain('10-70-20')
      expect(printElement(el)).toContain('20-10-70')

      // //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

})
