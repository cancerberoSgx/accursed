import { tryTo } from 'misc-utils-of-mine-generic'
import {
  Br,
  Button2,
  Collapsible,
  Column,
  Columns,
  createScreen,
  Div,
  findDescendantNamed,
  getContent,
  installExitKeys,
  printElement,
  React,
  Row,
  Rows,
  Screen
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { words } from '../src/util/data'
import { debug } from '../src/util/logger'

describe('rows', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  beforeEach(() => {
    screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
    installExitKeys(screen)
  })
  // jasmine.DEFAULT_TIMEOUT_INTERVAL=9999
  it('should layout content in rows', async done => {
    try {
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

      debug(getContent(el))
      await waitFor(() => getContent(el).includes('Row1'))
      expect(getContent(el)).toContain('Row2')
      expect(getContent(el)).toContain('Row3')

      // //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  //  jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('should set height dynamically', async done => {
    try {
      const t1 = (
        <Div>
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
          <Br />
          {words(10).join(' ')}
          <Br />
        </Div>
      )
      const el = React.render(t1)
      screen.append(el)
      screen.render()

      await waitFor(() => printElement(el).includes('40-20-40'))
      expect(printElement(el)).toContain('10-70-20')
      expect(printElement(el)).toContain('10-70-20')

      // //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  //  jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('should set height dynamically together with Columns', async done => {
    try {
      const t1 = (
        <Div>
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
          <Br />
          {words(10).join(' ')}
          <Br />
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
