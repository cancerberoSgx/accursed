import {React} from '../src/jsx/createElement'
import { ProgramDocument, Program, ProgramDocumentRenderer } from '../src';
describe('jsx', () => {

  it('createElement', async done => {
    const p = <box>hello</box>
    expect(JSON.stringify(p)).toEqual(`{"type":"box","children":[{"type":"__text","props":{"textContent":"hello","children":[]},"children":[]}],"props":{}}`)
    done()
  })

  it('render', async done => {
    const p = <box width={10} height={7} bg="red" fg="black" top={4} left={12}ch="y">hello</box>
    console.log((JSON.stringify(p)));
    
    const doc = new ProgramDocument()
    React.setDocument(doc)
    const e = React.render(p)
    
   expect( e.outerHTML).toBe('<box bg="red" fg="black" ch="y" width="10" height="7" top="4" left="12">hello</box>')

   const program = new Program({
  })
  program.key(['q', 'escape', 'C-c'], function() {
    program.showCursor()
    program.disableMouse()
    program.normalBuffer()
    program.reset()
    program.destroy()
    process.exit(0)
  })
  program.reset()
 const  renderer = new ProgramDocumentRenderer({ program, debug: true })
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
    done()
  })
})
