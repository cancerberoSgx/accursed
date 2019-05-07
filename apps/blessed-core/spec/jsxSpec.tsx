import { ProgramDocument } from '../src'
import { Component } from '../src/jsx/component'
import { Flor } from '../src/jsx/createElement'
import { isElement } from '../src/programDom/elementUtil'
import { createProgramRendererDocument } from '../src/util/util'
import { trimRightLines } from '../src/util/misc';
import { sleep } from 'misc-utils-of-mine-generic';

describe('jsx', () => {

  xit('createElement', async done => {
    const p = <box>hello</box>
    expect(JSON.stringify(p)).toEqual(`{"type":"box","children":[{"type":"__text","props":{"textContent":"hello","children":[]},"children":[]}],"props":{}}`)
    done()
  })

  it('render', async done => {
    const p = <box width={10} height={7} bg="red" fg="black" top={4} left={12} ch="y">hello</box>
    const doc = new ProgramDocument()
    Flor.setDocument(doc)
    const e = Flor.render(p)
    // expect(e.outerHTML).toBe('<box bg="red" fg="black" ch="y" width="10" height="7" top="4" left="12">hello</box>')
    const { renderer } = createProgramRendererDocument()
    renderer.renderElement(e)
    expect(renderer.printBuffer(true)).toContain(`


            helloyyyyy
            yyyyyyyyyy
            yyyyyyyyyy
            yyyyyyyyyy
            yyyyyyyyyy
            yyyyyyyyyy
            yyyyyyyyyy
`)

    renderer.destroy()
    done()
  })

  it('children and text', async done => {
    const p = <box width={60} height={37} bg="red" fg="black" top={4} left={12} ch="_">
      hello world
    <box top={7} left={4} width={3} height={7} ch="2" bg="blue">K</box>
      more text
    <box top={8} left={16} width={17} height={4} ch="3" bg="green">INNER TEXT</box>
      and even more
    </box>
    const { renderer } = createProgramRendererDocument()
    renderer.renderElement(Flor.render(p))
    expect(renderer.printBuffer(true)).toContain(trimRightLines(`

            hello world_________________________________________________
            ____________________________________________________________
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____K22_____________________________________________________ 
            ____more text___INNER TEXT3333333___________________________ 
            ____222_________and even more3333___________________________ 
            ____222_________33333333333333333___________________________ 
            ____222_________33333333333333333___________________________ 
            ____222_____________________________________________________ 
            ____222_____________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________ 
            ____________________________________________________________
`))
    renderer.destroy()
    done()
  })

  // describe('components', () => {

    fit('should render components', async done => {
      class C extends Component<{ name: string, colors: string[] }> {
        render() {
          return <box top={7} left={4} width={23} height={17} ch="X" bg="blue">
            <text top={1}>hello {this.props.name}</text>
            Your colors:
        {this.props.colors.map((c, i) => <text width={c.length} ch="P" bg="yellow" height={4} left={1} top={i + 4}>{c}</text>)}
          </box>
        }
      }
      const app = <C name="seba" colors={['red', 'blue', 'green']} />
      const { renderer } = createProgramRendererDocument()
      renderer.fillAll('G')
      await sleep(100)
      const e = Flor.render(app)
      await sleep(100)
      renderer.renderElement(e)
      await sleep(100)
      expect(renderer.printBuffer(true)).toContain(`



    hello seba_________________________________
    ______Your colors:_________________________
    ___________________________________________
    _red_______________________________________
    _blue______________________________________
    _green_____________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
    ___________________________________________
`)
      renderer.destroy()
      done()
    })

    it('should call  elementCreated and elementReady', async done => {
      let elementReady = false, elementCreated = false
      class C extends Component<{ name: string, colors: string[] }> {
        elementReady() {
          elementReady = true
          Array.from(this.element!.childNodes).filter(isElement).forEach((c, i) => {
            c.props.top = i + 1
          })
        }
        elementCreated() {
          elementCreated = true
        }
        render() {
          return <box><text>hello</text><text>my parent</text><text>will get me</text><text>an empty line</text></box>
        }
      }
      const { renderer } = createProgramRendererDocument()
      const e = Flor.render(<C name="seba" colors={['red', 'blue', 'green']} />)
      expect(elementReady).toBe(true)
      expect(elementCreated).toBe(true)
      renderer.renderElement(e)
      expect(renderer.printBuffer(true)).toContain(`
hello
my parent
will get me
an empty line
`)
      renderer.destroy()
      done()
    })

  })

// })
