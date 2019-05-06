import { Document, ProgramDocument, Program, ProgramDocumentRenderer, ProgramElement } from '../src'
import { tryTo, removeWhites } from 'misc-utils-of-mine-generic'
import { ansi, Driver, InteractionSpecHelper } from 'cli-driver'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

describe('programDocumentRenderer', () => {
  let program: Program
  let doc: ProgramDocument
  let renderer: ProgramDocumentRenderer
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
    program.reset()
    doc = new ProgramDocument()
    renderer = new ProgramDocumentRenderer({ program, debug: true })
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
    renderer.renderElementWithoutChildren(div1)
    const expected = `

    XXXXXX
    XXXXXX
    XXXXXX
    XXXXXX
    XXXXXX
    `
    expect(trimRightLines(renderer.printBuffer())).toContain(trimRightLines(expected))
    done()
  })

  it('renderElement ', async done => {
    const div1 = createElement(doc, 'Div', doc.body,{ bg: 'red', fg: 'blue', left: 3, top: 2, height: 9, width: 12, ch: 'X' })
    const d2 = createElement(doc, 'Span', div1, { bg: 'green', fg: 'yellow', left: 4, top: 2, height: 3, width: 4, ch: 'O' })
    renderer.renderElement(div1)
    expect(trimRightLines(renderer.printBuffer())).toContain(trimRightLines(
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

  it('children 2nd level ', async done => {
    const div1 = createElement(doc, 'Div', doc.body,{ bg: 'red', fg: 'blue', left: 4, top: 2, height: 16, width: 24, ch: '_' })
    const d2 = createElement(doc, 'Span', div1, { bg: 'green', fg: 'black', left: 4, top: 2, height: 12, width: 19, ch: 'O' }, [
      createElement(doc, 'Ul', undefined, { bg: 'blue', fg: 'white', left: 5, top: 3, height: 6, width: 11, ch: 'w' })
    ])
    renderer.renderElement(div1)
    expect(trimRightLines(renderer.printBuffer())).toContain(trimRightLines(`

    ________________________
    ________________________
    ____OOOOOOOOOOOOOOOOOOO_
    ____OOOOOOOOOOOOOOOOOOO_
    ____OOOOOOOOOOOOOOOOOOO_
    ____OOOOOwwwwwwwwwwwOOO_
    ____OOOOOwwwwwwwwwwwOOO_
    ____OOOOOwwwwwwwwwwwOOO_
    ____OOOOOwwwwwwwwwwwOOO_
    ____OOOOOwwwwwwwwwwwOOO_
    ____OOOOOwwwwwwwwwwwOOO_
    ____OOOOOOOOOOOOOOOOOOO_
    ____OOOOOOOOOOOOOOOOOOO_
    ____OOOOOOOOOOOOOOOOOOO_
    ________________________
    ________________________
       `))
    done()
  })

})

function createElement(doc: ProgramDocument, tagName: string, parent?: ProgramElement, props: Partial<ProgramElement> = {}, children?: ProgramElement[]) {
  const el = doc.createElement(tagName)
  doc.appendChild(el)
  Object.assign(el, props)
  if (parent) {
    parent.appendChild(el)
  }
  if (children) {
    children.forEach(c => el.appendChild(c))
  }
  return el
}

function trimRightLines(s: string) {
  return s.split('\n').map(l => l.trimRight()).join('\n')
}
