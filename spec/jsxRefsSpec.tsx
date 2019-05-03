import { tryTo } from 'misc-utils-of-mine-generic'
import { Button, Component, createScreen, Div, installExitKeys, isElement, React, ref, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { isComponent } from '../src/jsx/component'
import { resolveRef } from '../src/jsx/createElement'

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
      expect(isComponent(c)).toBe(true)
      expect(isElement(c)).toBe(false)

      done()
    })

    it('should associate component 2', async done => {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      installExitKeys(screen)
      class C extends Component {
        d: C
        render() {
          return (
            <D ref={ref(c => (this.d = c))}>
              <Div>hello world</Div>
            </D>
          )
        }
      }
      let d: D
      class D extends Component {
        render() {
          return (
            <Div
              ref={ref(c => {
                d = c
                resolveRef(this.props, this)
              })}>
              hello world
            </Div>
          )
        }
      }
      let c: C
      let div: any
      screen.append(
        React.render(
          <Div ref={ref(c => (div = c))}>
            <C>
              <C ref={React.createRef<C>(current => (c = current))}>hello world</C>
            </C>
          </Div>
        )
      )
      screen.render()

      await waitFor(() => !!c)

      expect(isElement(div)).toBe(true) // because <Div> is a function not a component

      expect(c instanceof C).toBe(true)
      expect(isComponent(c)).toBe(true)
      expect(isElement(c)).toBe(false)

      expect(c.d instanceof D).toBe(true)
      expect(isComponent(c.d)).toBe(true)
      expect(isElement(c.d)).toBe(false)

      // expect(d.d instanceof C).toBe(true)
      // expect(isComponent(d.d)).toBe(true)
      // expect(isElement(d.d)).toBe(false)
      done()
    })
  })
})
