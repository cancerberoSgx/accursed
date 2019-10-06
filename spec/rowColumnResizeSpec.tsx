import { tryTo } from 'misc-utils-of-mine-generic'
import { Button2, Column, Columns, createScreen, debug, Div, Element, findDescendantNamed, installExitKeys, installVisibleOnAncestorFocus, isElement, printElement, React, Row, Rows, Screen, screenLogger } from '../src'
import { rowColumnResizeHandler } from '../src/blessed/rowColumnResize'
import { waitFor } from '../src/blessed/waitFor'
import { focusableOpts } from '../src/util/sharedOptions'
import { rowColumnResize } from './rowColumnResize'

describe('rowColumnResize', () => {
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

  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999
  it('should set columns width dynamically together with Rows and show a control on descendant focus', async done => {
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
              <Button2 {...focusableOpts()} onClick={e => { }}>
                >focusable
              </Button2>
              <Div width={10} name="rowColumnResize" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}>
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}>
                  {'>'}
                </Button2>
              </Div>
            </Column>

            <Column name="column2" width="50%" bg="cyan" _data={{ rowColumnResize: { width: 50 } }}>
              <Button2 {...focusableOpts()} onClick={e => { }}>
                >focusable
              </Button2>
              <Div width={10} name="rowColumnResize" bg="cyan" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
                  bg="green">
                  {'>'}
                </Button2>
              </Div>
            </Column>
            <Column name="column3" width="30%" bg="green" _data={{ rowColumnResize: { width: 30 } }}>
              <Button2 {...focusableOpts()} onClick={e => { }}>
                >focusable
              </Button2>
              <Div width={10} name="rowColumnResize" bg="green" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: true })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: true })}
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

  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999
  it('should show a control on descendant focus that sets rows height dynamically ', async done => {
    try {
      installVisibleOnAncestorFocus({
        screen,
        ancestorPredicate: e => isElement(e) && e.options && e.options._data && e.options._data.rowColumnResize,
        targetPredicate: (e: Element) => e.name === 'rowColumnResize'
      })
      const t1 = (
        <Div>
          <Rows>
            <Row name="column1" height="20%" _data={{ rowColumnResize: { height: 20 } }}>
              <Button2 {...focusableOpts()} onClick={e => { }}>
                >focusable
              </Button2>
              <Div height={10} name="rowColumnResize" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: false })}>
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: false })}>
                  {'>'}
                </Button2>
              </Div>
            </Row>

            <Row name="column2" height="50%" bg="cyan" _data={{ rowColumnResize: { height: 50 } }}>
              <Button2 {...focusableOpts()} onClick={e => { }}>
                >focusable
              </Button2>
              <Div height={10} name="rowColumnResize" bg="cyan" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: false })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: false })}
                  bg="green">
                  {'>'}
                </Button2>
              </Div>
            </Row>
            <Row name="column3" height="30%" bg="green" _data={{ rowColumnResize: { height: 30 } }}>
              <Button2 {...focusableOpts()} onClick={e => { }}>
                >focusable
              </Button2>
              <Div height={10} name="rowColumnResize" bg="green" hidden={true}>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: false, width: false })}
                  bg="green">
                  {'<'}
                </Button2>
                <Button2
                  {...focusableOpts()}
                  border={undefined}
                  onClick={e => rowColumnResizeHandler({ e: e.currentTarget, increment: true, width: false })}
                  bg="green">
                  {'>'}
                </Button2>
              </Div>
            </Row>
            {}
          </Rows>
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
      //
      // expect(printElement(screen)).not.toContain('start')
      // expect(printElement(el)).not.toContain('10-70-20')
      // expect(printElement(el)).not.toContain('20-10-70')

      // // //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  // jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999
  it('should resize multiple rows and columns int he same container. Also if all uses the same names, installVisibleOnAncestorFocus can be called only once', async done => {
    try {
      const t1 = rowColumnResize(screen)
      const el = React.render(t1)
      screen.append(el)

      const l = screenLogger(screen).log
      l('start')
      // const logger = installLogger(screen)
      screen.render()
      // logger.log('screen rendered')
      await waitFor(() => printElement(el).includes('focusable'))
      //
      // expect(printElement(screen)).not.toContain('start')
      // expect(printElement(el)).not.toContain('10-70-20')
      // expect(printElement(el)).not.toContain('20-10-70')

      // // //TODO: test the handler...

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  // jasmine.DEFAULT_TIMEOUT_INTERVAL=99999
  it('an initial experiment', async done => {
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

              <Button2 {...focusableOpts()} onClick={e => { }}>
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
              <Button2 {...focusableOpts()} onClick={e => { }}>
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
              <Button2 {...focusableOpts()} onClick={e => { }}>
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
})
