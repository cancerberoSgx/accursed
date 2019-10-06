import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, filterDescendants, getContent, installExitKeys, installFocusHandler, React, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Br, Div } from '../src/jsx-components'
import { Accordion, AccordionBlock } from '../src/jsx-components/accordion'
import { words } from '../src/util/data'
import { debug } from '../src/util/logger'

describe('accordion', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should layout content like accordion', async done => {
    try {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true, focusable: true })
      installExitKeys(screen)
      const t1 = (
        <Div>
          {words(100).join(' ')}
          <Br />
          <Accordion>
            <AccordionBlock bg="red">
              AccordionBlock1
              <Br />
              {words(250).join(' ')}
            </AccordionBlock>
            <AccordionBlock bg="blue">
              AccordionBlock2
              <Br />
              {words(250).join(' ')}
            </AccordionBlock>
            <AccordionBlock bg="yellow" collapsed={false}>
              AccordionBlock3
              <Br />
              {words(210).join(' ')}
            </AccordionBlock>
            {}
          </Accordion>
          <Br />
          {words(101).join(' ')}
          <Br />
        </Div>
      )

      const el = React.render(t1)
      installFocusHandler('test1', filterDescendants(el, el => el.type === 'list'), screen)

      screen.append(el)
      screen.render()

      await waitFor(() => getContent(el).includes('AccordionBlock3'))
      // expect(getContent(el)).not.toContain('AccordionBlock2')
      // expect(getContent(el)).not.toContain('AccordionBlock1')

      //TODO: test events

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})
