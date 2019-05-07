import { BorderStyle, Program, ProgramDocument, ProgramDocumentRenderer } from '../src'
import { trimRightLines } from '../src/util/misc'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
describe('programDom', () => {

  xit('x, ax', async done => {
    const d = new ProgramDocument()
    const div1 = d.createElement('Div')
    d.appendChild(div1)
    div1.props.left = 10
    const d2 = d.createElement('Div')
    d2.props.left = 5
    div1.appendChild(d2)
    div1.appendChild(d.createTextNode('hello world'))

    expect(d2.absoluteLeft).toBe(15)
    expect(d2.props.left).toBe(5)

    expect(div1.outerHTML).toBe('<Div left="10"><Div left="5"></Div>hello world</Div>')

    done()
  })

  it('js api', async done => {
    const program = new Program()
    program.key(['q', 'escape', 'C-c'], function() {
      program.showCursor()
      program.disableMouse()
      program.normalBuffer()
      program.reset()
      program.destroy()
      process.exit(0)
    })
    program.reset()
    const doc = new ProgramDocument()
    const renderer = new ProgramDocumentRenderer({ program, debug: true })

    const defaultStyle = { bg: 'blue', fg: 'white' }
    const app = doc.create({
      ...defaultStyle, width: program.cols, height: program.rows,
      children: [
        { top: 4, left: 10, width: 15, height: 3, border: { type: BorderStyle.round, fg: 'green' }, children: [' this is '] },
        { top: 4, left: 25, width: 15, height: 3, border: { type: BorderStyle.round, fg: 'green' }, children: [' low level'] },
        { top: 4, left: 40, width: 15, height: 3, border: { type: BorderStyle.round, fg: 'green' }, children: [' WIP...'] }
      ]
    })
    renderer.renderElement(app)

    expect(renderer.printBuffer(true)).toContain(trimRightLines(`


          ╭─────────────╮╭─────────────╮╭─────────────╮
          │ this is     ││ low level   ││ WIP...      │
          ╰─────────────╯╰─────────────╯╰─────────────╯
`))
    renderer.destroy()
    done()
  })

})
