import { Document, ProgramDocument } from '../src'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
describe('programDom', () => {

  it('x, ax', async done => {
    const d = new ProgramDocument()
    const div1  = d.createElement('Div')
    d.appendChild(div1)
    div1.left = 10
    const d2 = d.createElement('Div')
    d2.left = 5
    div1.appendChild(d2)
    div1.appendChild(d.createTextNode('text'))

    expect(d2.absoluteLeft).toBe(15)
    expect(d2.left).toBe(5)

    done()
  })

})
