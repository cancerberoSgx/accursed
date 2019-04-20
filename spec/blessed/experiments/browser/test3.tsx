// npm run build  &&  browserify -x blessed -x term.js -x blessed-contrib dist/spec/blessed/experiments/browser/test3.js --ignore-missing -o tmp/test3.js
import {
  Accordion,
  AccordionBlock,
  Br,
  Button2,
  ButtonOptions,
  Column,
  Columns,
  installExitKeys,
  React,
  Tab,
  TabBody,
  TabLabel,
  TabPanel
} from '../../../../src'
import { createScreenForBrowser } from '../../../../src/util/browser'
import { words } from '../../../../src/util/data'

;(async () => {
  const screen = await createScreenForBrowser({ focusable: true, sendFocus: true })

  const focusable: () => ButtonOptions = () => ({
    focusable: true,
    clickable: true,
    keys: true,
    mouse: true,
    keyable: true,
    style: {
      border: {
        fg: 'blue'
      },
      hover: {
        fg: 'yellow'
      },
      focus: {
        bg: 'cyan'
      }
    }
  })
  const app = (
    <Columns>
      <Column width="30%">
        <Accordion>
          <AccordionBlock label="Contacts" labelStyle={focusable().style}>
            {words(12).join(' ')}
            <Br />
            <Button2 {...focusable()} onClick={e => {}}>
              click me
            </Button2>
            <Br />
            {words(12).join(' ')}
          </AccordionBlock>
          <AccordionBlock label="Addresses" labelStyle={focusable().style}>
            {words(12).join(' ')}
            <Br />
            <Button2 {...focusable()} onClick={e => {}}>
              click me 2
            </Button2>
            <Br />
            {words(12).join(' ')}
          </AccordionBlock>
          <AccordionBlock label="Orders" labelStyle={focusable().style}>
            {words(12).join(' ')}
            <Br />
            <Button2 {...focusable()} onClick={e => {}}>
              click me 3
            </Button2>
            <Br />
            {words(12).join(' ')}
          </AccordionBlock>
          {}
        </Accordion>
      </Column>
      <Column width="70%">
        <TabPanel>
          <Tab>
            <TabLabel {...focusable()} fg="blue">
              Cart
            </TabLabel>
            <TabBody>
              {words(66).join(' ')}
              <Br />
              <Button2 {...focusable()} onClick={e => {}}>
                click me 3
              </Button2>
              <Br />
              {words(66).join(' ')}
            </TabBody>
            {}
          </Tab>
          <Tab>
            <TabLabel {...focusable()} fg="blue">
              Favorites
            </TabLabel>
            <TabBody>
              {words(66).join(' ')}
              <Br />
              <Button2 {...focusable()} onClick={e => {}}>
                click me 3
              </Button2>
              <Br />
              {words(66).join(' ')}
            </TabBody>
            {}
          </Tab>
          <Tab>
            <TabLabel {...focusable()} fg="blue">
              Products
            </TabLabel>
            <TabBody>
              {words(66).join(' ')}
              <Br />
              <Button2 {...focusable()} onClick={e => {}}>
                click me 3
              </Button2>
              <Br />
              {words(66).join(' ')}
            </TabBody>
            {}
          </Tab>
          {}
        </TabPanel>
      </Column>
      {}
    </Columns>
  )
  const el = React.render(app)

  installExitKeys(screen)
  // screen.key('tab', k => screen.focusNext())
  // screen.key('S-tab', k => screen.focusPrevious())
  // installFocusHandler('test1', filterDescendants(el, d=>isElement(d) && d.type==="button"), screen, undefined, false, true)
  screen.append(el)
  screen.render()
  screen.focusNext()
  screen.render()
})()
