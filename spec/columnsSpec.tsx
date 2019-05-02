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

  // jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('should set width dynamically together with Rows and show a control on descendant focus', async done => {
    try {
      installVisibleOnAncestorFocus({
        screen,
        ancestorPredicate: (e: Element) => e.name && e.name.startsWith('column'),
        targetPredicate: (e: Element) => e.name === 'rowColumnResize'
      })
      const t1 = (
        <Div>
          {' '}
          <Columns>
            <Column name="column1" width="20%">
              <Button2
                {...focusableOpts()}
                hidden={true}
                name="rowColumnResize"
                onClick={e => {
                  findDescendantNamed(e.currentTarget.screen, 'column1').width = '40%'
                  findDescendantNamed(e.currentTarget.screen, 'column2').width = '20%'
                  findDescendantNamed(e.currentTarget.screen, 'column3').width = '40%'
                  e.currentTarget.screen.render()
                }}>
                40-20-40
              </Button2>

              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
            </Column>

            <Column name="column2" width="50%" bg="cyan">
              <Button2
                {...focusableOpts()}
                hidden={true}
                name="rowColumnResize"
                onClick={e => {
                  findDescendantNamed(e.currentTarget.screen, 'column1').width = '10%'
                  findDescendantNamed(e.currentTarget.screen, 'column2').width = '70%'
                  findDescendantNamed(e.currentTarget.screen, 'column3').width = '20%'
                  e.currentTarget.screen.render()
                }}>
                10-70-20
              </Button2>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
            </Column>
            <Column name="column3" width="30%" bg="green">
              <Button2
                {...focusableOpts()}
                name="rowColumnResize"
                hidden={true}
                onClick={e => {
                  findDescendantNamed(e.currentTarget.screen, 'column1').width = '20%'
                  findDescendantNamed(e.currentTarget.screen, 'column2').width = '10%'
                  findDescendantNamed(e.currentTarget.screen, 'column3').width = '70%'
                  e.currentTarget.screen.render()
                }}>
                20-10-70
              </Button2>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
            </Column>
            {}
          </Columns>
        </Div>
      )
      const el = React.render(t1)
      screen.append(el)

      // const logger = installLogger(screen)
      screen.render()
      // logger.log('screen rendered')
      await waitFor(() => printElement(el).includes('focusable'))
      expect(printElement(el)).not.toContain('10-70-20')
      expect(printElement(el)).not.toContain('10-70-20')
      expect(printElement(el)).not.toContain('20-10-70')

      // // //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999
  it('should set width dynamically together with Rows and show a control on descendant focus', async done => {
    try {
      installVisibleOnAncestorFocus({
        screen,
        ancestorPredicate: e => isElement(e) && e.options && e.options._data && e.options._data.rowColumnResize,
        targetPredicate: (e: Element) => e.name === 'rowColumnResize'
      })
      const t1 = (
        <Div>
          <Columns>
            <Column name="column1" width="20%" _data={{ rowColumnResize: { width: 20 } }}>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
              <Div width={10} name="rowColumnResize" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false })}>
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true })}>
                  {'>'}
                </Button2>
              </Div>
            </Column>

            <Column name="column2" width="50%" bg="cyan" _data={{ rowColumnResize: { width: 50 } }}>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
              <Div width={10} name="rowColumnResize" bg="green" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true })}
                  bg="green">
                  {'>'}
                </Button2>
              </Div>
            </Column>
            <Column name="column3" width="30%" bg="green" _data={{ rowColumnResize: { width: 30 } }}>
              <Button2 {...focusableOpts()} onClick={e => {}}>
                >focusable
              </Button2>
              <Div width={10} name="rowColumnResize" bg="green" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true })}
                  bg="green">
                  {'>'}
                </Button2>
              </Div>
            </Column>
            {}
          </Columns>
        </Div>
      )
      const el = React.render(t1)
      screen.append(el)

      const l = screenLogger(screen).log
      l('start')
      // const logger = installLogger(screen)
      screen.render()
      // logger.log('screen rendered')
      await waitFor(() => printElement(el).includes('focusable'))
      // expect(printElement(screen)).not.toContain('start')
      // expect(printElement(el)).not.toContain('10-70-20')
      // expect(printElement(el)).not.toContain('20-10-70')

      // // //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})

interface Options {
  e: Element
  increment?: boolean
  step?: number
}
/**
 * TODO:
 *  * maximum and minimum (so containers dont get invisible)
 *  * restore button on all boxes
 *  * support width also since the algorithm should be the same.
 */
function rowColumnResizeHandler(options: Options) {
  const { e, increment = false, step = 10 } = options
  const column = findAscendant<Element>(e, a => isElement(a) && a.options._data && a.options._data.rowColumnResize)
  if (column) {
    let columns = column.parent as Element
    const otherColumns = columns.children.filter(
      a => isElement(a) && a.options._data && a.options._data.rowColumnResize && a !== column
    ) as Element[]
    if (otherColumns.length) {
      const otherStep = Math.round(step / otherColumns.length)
      column.options._data.rowColumnResize.width =
        column.options._data.rowColumnResize.width + (increment ? step : step * -1)
      column.width = `${column.options._data.rowColumnResize.width}%`
      otherColumns.forEach(c => {
        c.options._data.rowColumnResize.width =
          c.options._data.rowColumnResize.width - (increment ? otherStep : otherStep * -1)
        c.width = `${c.options._data.rowColumnResize.width}%`
      })
      e.screen.render()
    }
  }
}
