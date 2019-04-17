import { tryTo } from 'misc-utils-of-mine-generic'
import { React, Screen, installExitKeys, Button, Div, BoxOptions, Br, isElement, findChildren, filterChildren, Textarea } from '../src'
import * as blessed from 'blessed'

describe('jsxRefs', () => {
  let screen: Screen

  beforeEach(() => {
    tryTo(() => screen.destroy())
    screen = blessed.screen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
    installExitKeys(screen)
  })
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should create references to elements for markup at render time', async done => {

    const ref1 = React.createRef<Button>()
        expect(!ref1.current! || !ref1.current!.getContent().includes('changed3'))
    setTimeout(() => {
      // screen.log("setTimeout",!ref1.current)
      ref1.current!.content = "'changed3"
      ref1.current!.screen.render()
      expect(ref1.current!.getContent()).toContain('changed3')
      done()
    }, 1000)

    const app = <Div {...opts} width="100%" border="line" height="100%" parent={screen} style={{ bg: 'red' }}>
      <button {...opts} ref={ref1} top="80%" left="80%" content="button11" onClick={e => { e.currentTarget.content = "clicked!"; e.currentTarget.screen.render() }}></button>
      <Br />
      <textarea  {...  { tags: true, }} width={'38%'} height={'29%'} bottom="5%"
        inputOnFocus={true} content="some code here"></textarea>
      <Br />
      <textbox  {...{ width: '44%', height: '20%', right: "5%", clickable: true }} border="line" width={12} height={11} inputOnFocus={true} content="some code here"> </textbox>
      <Br />
      <button {...opts} content="Eval" border="line" onClick={e => {
        const ta = findChildren<Textarea>(e.currentTarget.parent as any, e => e.type === 'textarea');
        const o = filterChildren<Textarea>(e.currentTarget.parent as any, e => isElement(e) && e.name === 'output');
      }}></button>
    </Div>
    try {
      const d = React.render(app)
      screen.append(d)
      screen.key('tab', k => screen.focusNext())
      screen.key('S-tab', k => screen.focusPrevious())
      screen.render()
    } catch (error) {
      screen && screen.log(error)
    }
  })
})

const opts = () => ({
  keys: true, mouse: true, clickable: true, tags: true, focusable: true, draggable: true, input: true, inputOnFocus: true, keyable: true, vi: true, border: 'line',
  style: {
    bg: 'gray',
    fg: 'white'
  }
} as BoxOptions)



