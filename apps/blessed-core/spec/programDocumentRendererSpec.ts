import { Document, ProgramDocument, Program, ProgramDocumentRenderer } from '../src'
import {tryTo, removeWhites} from 'misc-utils-of-mine-generic'
import { ansi, Driver, InteractionSpecHelper } from 'cli-driver'

jasmine.DEFAULT_TIMEOUT_INTERVAL=10000

describe('programDocumentRenderer', () => {
  let program: Program
  let client: Driver
  let helper: InteractionSpecHelper
  // beforeAll(async done => {
  //   client = new Driver()
  //   helper = new InteractionSpecHelper(client)
  //   await client.start({
  //     // notSilent: true
  //   })
  //   done()
  // })
  // afterAll(async done => {
  //   await helper.clear()
  //   await client.destroy().catch()
  //   helper = null as any
  //   done()
  // })
  beforeEach(()=>{
    program = new Program({
    })    
    program.key(['q', 'escape', 'C-c'], function () {
      program.showCursor()
      program.disableMouse()
      program.normalBuffer()
      program.reset()
      program.destroy()
      process.exit(0)
    })
  })
  afterEach(()=>{
    tryTo(()=>{
      program.showCursor()
      program.disableMouse()
      program.normalBuffer()
      program.reset()
      program.destroy()
    })
  })
  it('renderElementWithoutChildren', async done => {
   const d = new ProgramDocument()
   const div1  = d.createElement('Div')
   d.appendChild(div1)
   Object.assign(div1, {bg: 'red', fg: 'blue', x: 4, y: 2, height: 5, width: 6, ch: 'X'})
   const r = new ProgramDocumentRenderer({program, debug: true })
   program.reset()
   r.renderElementWithoutChildren(div1)
    program.reset()
    expect(removeWhites(r.printBuffer())).toBe(removeWhites(
      `
      XXXXXX
      XXXXXX
      XXXXXX
      XXXXXX
      XXXXXX
      ` )) 
    done()
  })

  

})
