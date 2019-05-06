import { array, tryTo } from 'misc-utils-of-mine-generic'
import { Program, ProgramDocument, ProgramDocumentRenderer } from '../src'
import { BorderStyle } from '../src/util/border'
import { layoutChildren } from '../src/util/layout'
import { serial } from '../src/util/misc'
import { createElement } from '../src/util/util'
import { color, number } from './data'

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
    const div1 = doc.createElement('Div')
    doc.appendChild(div1)
    Object.assign(div1.props, { bg: 'red', fg: 'blue', left: 4, top: 2, height: 5, width: 6, ch: 'X' })
    renderer.renderElementWithoutChildren(div1)
    expect(renderer.printBuffer(true)).toContain(`

    XXXXXX
    XXXXXX
    XXXXXX
    XXXXXX
    XXXXXX
`)
    done()
  })

  it('renderElement ', async done => {
    const div1 = createElement(doc, 'Div', doc.body, { bg: 'red', fg: 'blue', left: 3, top: 2, height: 9, width: 12, ch: 'X' })
    const d2 = createElement(doc, 'Span', div1, { bg: 'green', fg: 'yellow', left: 4, top: 2, height: 3, width: 4, ch: 'O' })
    renderer.renderElement(div1)
    expect(renderer.printBuffer(true)).toContain(`

   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXOOOOXXXX
   XXXXOOOOXXXX
   XXXXOOOOXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
   XXXXXXXXXXXX
`)
    done()
  })

  it('children 2nd level ', async done => {
    const div1 = createElement(doc, 'Div', doc.body, { bg: 'red', fg: 'blue', left: 4, top: 2, height: 16, width: 24, ch: '_' })
    const d2 = createElement(doc, 'Span', div1, { bg: 'green', fg: 'black', left: 4, top: 2, height: 12, width: 19, ch: 'O' }, [
      createElement(doc, 'Ul', undefined, { bg: 'blue', fg: 'white', left: 5, top: 3, height: 6, width: 11, ch: 'w' })
    ])
    renderer.renderElement(div1)
    expect(renderer.printBuffer(true)).toContain(`

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
`)
    done()
  })

  it('textContent as unique children', async done => {
    const t = doc.createTextNode('hello world')
    const div1 = createElement(doc, 'Div', doc.body, { bg: 'yellow', fg: 'black', left: 6, top: 2, height: 6, width: 16, ch: '_' }, [
      t
    ])
    renderer.renderElement(div1)
    expect(renderer.printBuffer(true)).toContain(`

      hello world_____
      ________________
      ________________
      ________________
      ________________
      ________________
`)
    done()
  })

  it('multiple text nodes and drawElementBorder', async done => {
    const el = createElement(doc, 'Div', doc.body, { bg: 'yellow', fg: 'black', left: 10, top: 2, height: 6, width: 16, border: { type: BorderStyle.round } }, [
      doc.createTextNode('hello'), doc.createTextNode(' world')
    ])

    renderer.renderElement(el)
    // drawElementBorder({ renderer, el, borderStyle: BorderStyle.round })

    expect(renderer.printBuffer(true)).toContain(`
          ╭──────────────╮
          │hello world   │
          │              │
          │              │
          │              │
          ╰──────────────╯
`)
    done()
  })

  it('el.props.border', async done => {
    const el = createElement(doc, 'Div', doc.body, { bg: 'yellow', fg: 'black', border: { type: BorderStyle.double }, left: 10, top: 3, height: 6, width: 16 }, [
      doc.createTextNode('hello'), doc.createTextNode(' world')
    ])
    renderer.renderElement(el)
    expect(renderer.printBuffer(true)).toContain(`

          ╔══════════════╗
          ║hello world   ║
          ║              ║
          ║              ║
          ║              ║
          ╚══════════════╝
`)
    done()
  })

  it('layout', async done => {
    await serial(['top-down', 'left-right', 'diagonal', 'alt-diagonal', 'binary-tree'
    ].map(l => async() => {
      const el = createElement(doc, 'Div', doc.body, { bg: 'yellow', fg: 'black', border: { type: BorderStyle.double }, left: 20, top: 2, height: 29, width: 36, ch: '_' },
        array(7).map(i => createElement(doc, 'Div', undefined, { bg: color(), fg: color(), top: number(2, 12), left: number(2, 8), height: number(2, 4), width: number(6, 12), ch: '.' }, [
          doc.createTextNode('N' + i + 'th')
        ]))
      )
      renderer.renderElement(el)
      // await sleep(100)
      renderer.eraseElement(el)
      layoutChildren({ el, layout: l as any })
      renderer.renderElement(el)
      const output = renderer.printBuffer(true)
      array(7).map(i => 'N' + i + 'th').forEach(l => expect(output).toContain(l))
      // await sleep(1100)
    }
    ))
    done()
  })
})
