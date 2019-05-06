import { Document, ProgramDocument } from '../src'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
describe('programDom', () => {

  it('x, ax', async done => {
    const d = new ProgramDocument()
    const div1  = d.createElement('Div')
    d.appendChild(div1)
    div1.props.left = 10
    const d2 = d.createElement('Div')
    d2.props.left = 5
    div1.appendChild(d2)
    div1.appendChild(d.createTextNode('text'))

    expect(d2.absoluteLeft).toBe(15)
    expect(d2.props.left).toBe(5)

   expect(div1.outerHTML).toBe('<Div left="10"><Div left="5"></Div><text ></text></Div>')
    
    done()
  })


  it('border test', async done => {
    const d = new ProgramDocument()
    const div1  = d.createElement('Div')
    d.appendChild(div1)
    div1.props.left = 10
    const d2 = d.createElement('Div')
    d2.props.left = 5
    div1.appendChild(d2)
    div1.appendChild(d.createTextNode('text'))

    expect(d2.absoluteLeft).toBe(15)
    expect(d2.props.left).toBe(5)

   expect(div1.outerHTML).toBe('<Div left="10"><Div left="5"></Div><text ></text></Div>')
    
    done()
  })

})
