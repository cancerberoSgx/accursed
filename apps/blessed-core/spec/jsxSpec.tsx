import { React } from '../src/jsx/createElement'
import { ProgramDocument, Program, ProgramDocumentRenderer } from '../src'
import { installExitKeys, createProgramRendererDocument } from '../src/util'
import { Component } from '../src/jsx/component'
import { words } from './data'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 99999

describe('jsx', () => {

  it('createElement', async done => {
    const p = <box>hello</box>
    expect(JSON.stringify(p)).toEqual(`{"type":"box","children":[{"type":"__text","props":{"textContent":"hello","children":[]},"children":[]}],"props":{}}`)
    done()
  })

  it('render', async done => {
    const p = <box width={10} height={7} bg="red" fg="black" top={4} left={12}ch="y">hello</box>
    const doc = new ProgramDocument()
    React.setDocument(doc)
    const e = React.render(p)
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
    <box  top={12} left={22} width={17} height={4} ch="3" bg="green">INNER TEXT</box>
    and even more
    </box>
    const { renderer } = createProgramRendererDocument()
    renderer.renderElement(React.render(p))
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
    class C extends Component<{name: string, colors: string[]}> {
      render() {
        return <box top={7} left={4} width={43} height={17} ch="_" bg="blue">hello {this.props.name}
        <text></text>
        Your colors:
        {this.props.colors.map((c, i) => <text width={c.length} ch="P" bg="yellow" height={1} left={1} top={i + 3}>{c}</text>)}
        </box>
      }
    }
    const { renderer } = createProgramRendererDocument()
    // console.log(JSON.stringify(<C name="seba" colors={['red', 'blue','green']}/>));

    const e = React.render(<C name="seba" colors={['red', 'blue','green']}/>)
    // console.log(e.outerHTML);

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
  })
})
