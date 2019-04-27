import { tryTo } from 'misc-utils-of-mine-generic'
import { Box, createScreen, debug, getContent, installExitKeys, React, Screen } from '../src'
import { setMaximized } from '../src/blessed/maximize'
import { waitFor } from '../src/blessed/waitFor'
import { Br, Column, Columns, Div, Row, Rows } from '../src/jsx-components'
import { words } from '../src/util/data'

describe('maximize', () => {
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

  it('should maximize', async done => {
    let target: Box
    try {
      const t1 = (
        <Div>
          <Columns>
            <Column width="60%">
              Lot of space here...
              <Br />
              <button
                clickable={true}
                style={{ bg: 'gray', fg: 'magenta', hover: { bg: 'green' }, focus: { bg: 'blue' } }}
                focusable={true}
                keyable={true}
                content="maximize the little box with no space"
                onClick={e => {
                  debug('onPress')
                  setMaximized(target, true)
                  screen.render()
                }}
              />
            </Column>
            <Column width="40%">
              <Rows>
                <Row bg="red" height="30%">
                  Row1
                  <Br />
                  Aute magna dolore laborum nulla laborum fugiat. Magna qui ea laboris cillum officia elit magna anim.
                  Nostrud fugiat incididunt officia ex irure quis ut exercitation commodo. Ullamco proident amet magna
                  incididunt. Anim laboris ad id ea ea quis tempor culpa aliqua veniam laborum.
                </Row>
                <Row bg="blue">
                  Row2
                  <Br />
                  <Div
                    scrollable={true}
                    noOverflow={true}
                    style={{ bg: 'red', fg: 'black', bold: true }}
                    ref={React.createRef<Box>(c => (target = c))}>
                    Qui velit ipsum adipisicing et adipisicing nulla. Fugiat sit irure pariatur laborum. Est do aute sit
                    duis irure sunt.
                    <Br /> <button content="click" />
                    <Br />
                    Exercitation velit dolore ad deserunt consequat voluptate irure nisi officia duis sint in minim. Ad
                    est id magna ipsum nisi ea sunt amet irure magna. Ea laboris anim voluptate sunt amet labore culpa.
                    Ex consectetur Lorem veniam mollit. Excepteur ad consequat magna pariatur proident.
                    <Br />
                    {words(200).join(' ')}
                    Culpa laboris voluptate nisi ea id pariatur qui reprehenderit Lorem cupidatat aliquip. Sint
                    adipisicing officia consectetur ut commodo aliqua sit id dolore deserunt non. Aute laboris nostrud
                    do adipisicing ullamco nulla nulla consequat eu ullamco incididunt consectetur officia. Exercitation
                    sint ea consectetur nulla aute commodo adipisicing commodo aliqua adipisicing deserunt occaecat
                    commodo ipsum.
                    <Br />
                    <button content="click" />
                    <Br />
                    Exercitation velit dolore ad deserunt consequat voluptate irure nisi officia duis sint in minim. Ad
                    est id magna ipsum nisi ea sunt amet irure magna. Ea laboris anim voluptate sunt amet labore culpa.
                    Ex consectetur Lorem veniam mollit. Excepteur ad consequat magna pariatur proident.
                    <Br />
                    {words(200).join(' ')}
                    <Br />
                  </Div>
                </Row>
                <Row bg="yellow" height="70%">
                  Row3
                  <Br />
                  Dolore et deserunt ullamco ea ea eiusmod ex sit enim. Exercitation eiusmod ea id deserunt sint eiusmod
                  pariatur. Exercitation ad amet cillum aliqua deserunt ullamco reprehenderit fugiat mollit. Et elit
                  dolor ut amet laborum velit non laboris. Nisi labore et reprehenderit fugiat do reprehenderit. Qui
                  sint officia reprehenderit pariatur aute minim nostrud ad pariatur eu in ex cillum eiusmod. Est
                  voluptate laborum eiusmod fugiat in cupidatat amet deserunt.
                </Row>
                {}
              </Rows>
            </Column>
            {}
          </Columns>
        </Div>
      )
      const el = React.render(t1)
      screen.append(el)
      screen.render()

      await waitFor(() => target)
      expect(getContent(el)).toContain('maximize the little box with no space')
      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})
