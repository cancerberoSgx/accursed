import { tryTo } from 'misc-utils-of-mine-generic'
import { Button, Component, createScreen, Div, installExitKeys, React, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'

describe('jsxRefs', () => {
  describe('should associate a element with variable at render time ', () => {
    let screen: Screen
    afterEach(() => {
      tryTo(() => screen.destroy())
    })
    
    it('should create references to elements for markup at render time', async done => {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      installExitKeys(screen)
      const ref1 = React.createRef<Button>()
      React.render(
        <Div width="100%" border="line" height="100%" style={{ bg: 'red' }} parent={screen}>
          <button
            ref={ref1}
            top="80%"
            left="80%"
            content="button11"
            onPress={e => {
              e.currentTarget.content = 'clicked!'
              e.currentTarget.screen.render()
            }}
          />
        </Div>
      )
      screen.render()
      ref1.current!.content = "'changed3"
      ref1.current!.screen.render()
      await waitFor(() => ref1.current! && ref1.current!.getContent().includes('changed3'))
      done()
    })

    it('should associate component', async done => {
      class C extends Component {
        render() {
          return <Div>hello world</Div>
        }
      }
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      installExitKeys(screen)
      let c: C
      screen.append(React.render(<C ref={React.createRef<C>(current => (c = current))}>hello world</C>))
      screen.render()
      await waitFor(() => !!c)
      expect(c instanceof C).toBe(true)
      done()
    })
  })
})
