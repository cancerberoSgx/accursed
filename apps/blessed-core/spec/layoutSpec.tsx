import { ProgramDocument, Layout, BorderStyle, layoutChildren } from '../src'
import { Component } from '../src/jsx/component'
import { Flor } from '../src/jsx/createElement'
import { isElement } from '../src/programDom/elementUtil'
import { createProgramRendererDocument, createProgramRendererDocumentAndElement, createElement } from '../src/util/util'
import { array, serial } from 'misc-utils-of-mine-generic';
import { number, color } from './data';

describe('layout', () => {
  it('all layouts should make all text visible if there is enough space - invoking layoutChildren manually', async done => {
    const { renderer, el, document } = createProgramRendererDocumentAndElement()
    await serial([
      'top-down', 'left-right', 'diagonal', 'alt-diagonal', 'binary-tree',
      'justified-layout'
    ].map(l => async () => {
      const el = createElement(document, 'Div', document.body, { bg: 'yellow', fg: 'black', border: { type: BorderStyle.double }, left: 20, top: 2, height: 26, width: 60, ch: ' ' },
        array(12).map(i => createElement(document, 'Div', undefined, { bg: color(), fg: color(), top: number(2, 12), left: number(2, 8), height: number(2, 4), width: number(6, 12), ch: '.' }, [
          document.createTextNode('N' + i + 'th')
        ]))
      )
      renderer.renderElement(el)
      renderer.eraseElement(el)
      layoutChildren({ el, layout: l as any })
      renderer.renderElement(el)
      const output = renderer.printBuffer(true)
      array(7).map(i => 'N' + i + 'th').forEach(l => expect(output).toContain(l))
      // await sleep(  3100)
    }
    ))
    renderer.destroy()
    done()
  })

  it('justify-layout should make all text visible if there is enough space', async done => {
    const { renderer, el } = createProgramRendererDocumentAndElement()
    el.props.extend({ layout: { layout: 'justified-layout', justifiedLayout: { targetRowHeight: 10, targetRowHeightTolerance: 0 } } })
    function draw() {
      renderer.eraseElement(el)
      el.empty()
      array(20).map(i => ({
        top: number(0, 20), left: number(20), width: number(23, 40), height: number(12, 20), bg: color(), border: true
        , children: [`El ${i} fg`]
      })).forEach(el.create.bind(el))
      renderer.renderElement(el)
    }
    draw()
    const output = renderer.printBuffer(true)
    array(20).map(i => `El ${i} fg`).forEach(l => expect(output).toContain(l))
    renderer.destroy()
    done()
  })
})

