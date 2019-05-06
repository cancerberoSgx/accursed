import { ProgramDocument } from '../src'
import { Component } from '../src/jsx/component'
import { Flor } from '../src/jsx/createElement'
import { isElement } from '../src/programDom/elementUtil'
import { createProgramRendererDocument } from '../src/util/util'

describe('jsx', () => {

  it('createElement', async done => {
    const p = <box>hello</box>
    expect(JSON.stringify(p)).toEqual(`{"type":"box","children":[{"type":"__text","props":{"textContent":"hello","children":[]},"children":[]}],"props":{}}`)
    done()
  })

  it('render', async done => {
    const p = <box width={10} height={7} bg="red" fg="black" top={4} left={12} ch="y">hello</box>
    const doc = new ProgramDocument()
    Flor.setDocument(doc)
    const e = Flor.render(p)
    expect(e.outerHTML).toBe('<box bg="red" fg="black" ch="y" width="10" height="7" top="4" left="12">hello</box>')
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
    const p = <box width={40} height={17} bg="red" fg="black" top={4} left={12} ch="_">
      hello world
    <box top={7} left={4} width={3} height={7} ch="2" bg="blue">K</box>
      more text
    <box top={12} left={22} width={17} height={4} ch="3" bg="green">INNER TEXT</box>
      and even more
    </box>
    const { renderer } = createProgramRendererDocument()
    renderer.renderElement(Flor.render(p))
    expect(renderer.printBuffer(true)).toContain(`



            hello world_____________________________
            more text_______________________________
            and even more___________________________
            ________________________________________
            ________________________________________
            ________________________________________
            ________________________________________
            ____K22_________________________________
            ____222_________________________________
            ____222_________________________________
            ____222_________________________________
            ____222_________________________________
            ____222_______________INNER TEXT3333333_
            ____222_______________33333333333333333_
            ______________________33333333333333333_
            ______________________33333333333333333_
            ________________________________________
`)
    renderer.destroy()
    done()
  })

  describe('components', () => {

    it('should render components', async done => {
      class C extends Component<{ name: string, colors: string[] }> {
        render() {
          return <box top={7} left={4} width={43} height={17} ch="_" bg="blue">hello {this.props.name}
            <text></text>
            Your colors:
        {this.props.colors.map((c, i) => <text width={c.length} ch="P" bg="yellow" height={1} left={1} top={i + 3}>{c}</text>)}
          </box>
        }
      }
      const { renderer } = createProgramRendererDocument()
      const e = Flor.render(<C name="seba" colors={['red', 'blue', 'green']} />)
      renderer.renderElement(e)
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
})
