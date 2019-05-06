import { Document, ProgramDocument, Program, ProgramDocumentRenderer, ProgramElement } from '../src'
import { tryTo, removeWhites } from 'misc-utils-of-mine-generic'
import { ansi, Driver, InteractionSpecHelper } from 'cli-driver'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

describe('programDocumentRenderer', () => {
  let program: Program
  let doc: ProgramDocument
  beforeEach(() => {
    program = new Program({
    })
    program.key(['q', 'escape', 'C-c'], function() {
      program.showCursor()
      program.disableMouse()
      program.normalBuffer()
      program.reset()
      program.destroy()
      process.exit(0)
    })
    doc = new ProgramDocument()
  })
  afterEach(() => {
    tryTo(() => {
      program.showCursor()
      program.disableMouse()
      program.normalBuffer()
      program.reset()
      program.destroy()
    })
  })

  it('renderElementWithoutChildren', async done => {
    const div1  = doc.createElement('Div')
    doc.appendChild(div1)
    Object.assign(div1, { bg: 'red', fg: 'blue', left: 4, top: 2, height: 5, width: 6, ch: 'X' })
    const r = new ProgramDocumentRenderer({ program, debug: true })
    program.reset()
    r.renderElementWithoutChildren(div1)
    program.reset()
    const expected = `

    XXXXXX
    XXXXXX
    XXXXXX
    XXXXXX
    XXXXXX
    `
    expect(trimRightLines(r.printBuffer())).toContain(trimRightLines(expected))
    done()
  })

  it('renderElement ', async done => {
    const div1  = doc.createElement('Div')
    doc.appendChild(div1)
    Object.assign(div1, { bg: 'red', fg: 'blue', left: 3, top: 2, height: 9, width: 12, ch: 'X' })
    const d2 = doc.createElement('Span')
    Object.assign(d2, { bg: 'green', fg: 'yellow', left: 4, top: 2, height: 3, width: 4, ch: 'O' })
    div1.appendChild(d2)
    const r = new ProgramDocumentRenderer({ program, debug: true })
    program.reset()
    r.renderElement(div1)
    program.reset()
    expect(trimRightLines(r.printBuffer())).toContain(trimRightLines(
       `

   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXOOOOXXXX
   XXXXOOOOXXXX
   XXXXOOOOXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
       `))
    done()
  })

  it('textnode ', async done => {
    const div1 = createElement(doc, 'Div', doc.body,{ bg: 'red', fg: 'blue', left: 3, top: 2, height: 9, width: 12, ch: 'X' })
    const d2 = createElement(doc, 'Span', div1, { bg: 'green', fg: 'yellow', left: 4, top: 2, height: 3, width: 4, ch: 'O' })
    const r = new ProgramDocumentRenderer({ program, debug: true })
    program.reset()
    r.renderElement(div1)
    program.reset()
    expect(trimRightLines(r.printBuffer())).toContain(trimRightLines(
       `

   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXOOOOXXXX
   XXXXOOOOXXXX
   XXXXOOOOXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
       `))
    done()
  })

})

function createElement(doc: ProgramDocument, tagName: string, parent?: ProgramElement, props: Partial<ProgramElement> = {}) {
  const div1 = doc.createElement(tagName)
  doc.appendChild(div1)
  Object.assign(div1, props)
  if (parent) {
    parent.appendChild(div1)
  }
  return div1
}

function trimRightLines(s: string) {
  return s.split('\n').map(l => l.trimRight()).join('\n')
}
