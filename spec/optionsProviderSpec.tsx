import { tryTo } from 'misc-utils-of-mine-generic'
import {
  createScreen,
  filterDescendants,
  getContent,
  installExitKeys,
  installFocusHandler,
  React,
  Screen,
  debug
} from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Br, Div } from '../src/jsx-components'
import { Accordion, AccordionBlock } from '../src/jsx-components/accordion'
import { words } from '../src/util/data'
import { log } from '../src/util/logger'
import { OptionsProvider } from '../src/jsx-components/optionsProvider';

describe('accordion', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  fit('should layout content like accordion', async done => {
    try {
      screen = createScreen({ })
      installExitKeys(screen)
      const t1 = (
      <Div>
    <button content="click me0" border="line" style={{ fg: 'blue', border: {fg: 'yellow'}}}></button>

        <OptionsProvider options={{border:{type:'line', fg: 'red', top: true, left: true },
        //  draggable: true, 
          style: {fg: 'green',  bold: true, border: {type: 'line', fg: 'red'}}}}>
      <button content="click me1"></button><Br/>
      <Div>
        <text content="heeheheh"></text>
        <box draggable={true} mouse={true} content="dddd"></box>
      <button content="click me2" border="line" style={{ fg: 'blue', border: {fg: 'yellow'}}}></button>
      <Div >
      <button draggable={false} content="click me3"></button>
      </Div>
      </Div>
      </OptionsProvider></Div>
      )
      const el = React.render(t1)
     
      screen.append(el)
      screen.render()

      // await waitFor(() => getContent(el).includes('hello'))

      // done()
    } catch (error) {
      debug      ('ERROR', error)
    }
  })
})
