import {React} from '../src/jsx/createElement'
describe('jsx', () => {

  fit('1', async done => {
    const p = <box>hello</box>
    expect(JSON.stringify(p)).toEqual(`{"type":"box","props":{"children":[{"type":"__text","props":{"textContent":"hello","children":[]}}]}}`)
    done()
  })

})
