import { Document } from '../src/dom'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
describe('dom', () => {

  it('createElement, appendChild, createTextNode, innerHTML, outerHTML', async done => {
    const d = new Document()
    const div1  = d.createElement('Div')
    d.appendChild(div1)
    div1.appendChild(d.createElement('Div'))
    div1.appendChild(d.createTextNode('text'))

    expect(div1.innerHTML).toBe('<Div></Div>text')
    expect(div1.outerHTML).toBe('<Div><Div></Div>text</Div>')

    expect(div1.parentNode).toBe(d)

    done()
  })

})
