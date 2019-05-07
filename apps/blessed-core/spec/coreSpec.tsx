import { StylePropsImpl } from '../src';

describe('core', () => {
  it('Attr and Props should not spread private members', async done => {
    const s = new StylePropsImpl({bg: 'red'})
   expect(JSON.stringify(s)).toBe('{}');
    expect((s as any)._a).toBe(undefined)
    done()
  })  
})

