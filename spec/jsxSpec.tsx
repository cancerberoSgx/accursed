import { tryTo } from 'misc-utils-of-mine-generic'
import { Element, installExitKeys, isElement, React, Screen, screen, visitDescendants } from '../src'
import { strip } from '../src/util/misc'
import { color } from './blessed/gallery/util'

describe('jsxBasic', () => {
  describe('custom elements', () => {
    let s: Screen
    beforeEach(() => {
      tryTo(() => s.destroy())
      s = screen({ smartCSR: true, log: 'log.txt' })
      installExitKeys(s)
    })
    afterEach(() => {
      tryTo(() => s.destroy())
    })
    it('should print function element children', async done => {
      function C(props: { children?: any; parent: Screen }) {
        return (
          <layout parent={props.parent} layout="grid" width="100%" height="100%">
            <text content="before1" width={20} height={3} style={{ bg: color() }} border="line" />
            {props.children}
            <text content="after2" width={6} height={5} />
          </layout>
        )
      }
      const e = React.render(
        <C parent={s}>
          hello22 <textbox secret={true} content="secret" width={20} height={4} />
          <button content="button123" width={20} height={4} /> bye22
        </C>
      )
      s.render()
      const c = getContent(e)
      ;['before1', 'after2', 'button123', 'bye22', 'hello22'].forEach(s => {
        expect(c).toContain(s)
      })
      expect(c).not.toContain('secret')
      done()
    })

    it('should print function element children generated with map', async done => {
      function C(props: { children?: any; parent: Screen }) {
        return (
          <layout parent={props.parent} layout="grid" width="100%" height="100%">
            <text content="before1" width={20} height={3} style={{ bg: color() }} border="line" />
            {props.children}
            <text content="after2" width={6} height={5} />
          </layout>
        )
      }
      const e = React.render(
        <C parent={s}>
          hello22{' '}
          {[1, 2, 3].map(i => (
            <text content={`test${i * 2}`} width={5} height={2} />
          ))}{' '}
          bye22
        </C>
      )
      s.render()
      const c = getContent(e)
      ;['before1', 'after2', 'test2', 'bye22', 'hello22'].forEach(s => {
        expect(c).toContain(s)
      })
      expect(c).not.toContain('secret')
      done()
    })

    // it('should print function element children', async done => {

    //   function C(props: {children?: any, parent: Screen}) {
    //     return (
    //       <layout parent={props.parent} layout="grid" width="100%" height="100%">
    //       <text content="before1" width={20} height={3}
    //           style={{ bg: color() }}
    //           border="line"/>
    //       {props.children}
    //         <text content="after2" width={6} height={5}/>
    //       </layout>
    //     )
    //   }

    //   testJsx({
    //     creator: screen => (
    //     //   <layout parent={screen} width={number(40, 60)} height={number(15, 20)} border="line" layout="grid">
    //     //   {new Array(10).fill(0).map((e, i) => (
    //     //     <box
    //     //       width={number(5, 10)}
    //     //       height={number(4, 7)}
    //     //       style={{ bg: color() }}
    //     //       border="line"
    //     //       content={i + 1 + 12 + ''}
    //     //     />
    //     //   ))}
    //     // </layout>

    //       // <Div parent={screen}> hello world</Div>
    //       <C parent={screen}>
    //         hello22 <textbox secret={true} content="secret"  width={20} height={4}  />
    //         <button content="button123" width={20} height={4}  /> bye22
    //       </C>
    //     ),
    //     assert: e => {
    //       // e.screen.log( getContent(e));
    //       // e.screen.log( getContent(e));
    //       // await sleep(3000)
    //       const c = getContent(e);
    //       e.screen.log( 'content', c);

    //       ['before1', 'after2', 'button123', 'bye22', 'hello22',
    //       'secret'
    //     ].forEach(s=>{
    //         expect(c).toContain(s)
    //       })
    //     //  expect( getContent(e)).toContain('button123')
    //       // expect(findDescendant<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
    //       // console.log(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent());
    //       // expect(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent()).toContain('secret')
    //       done()
    //     }
    //   })
    // })
  })
})

function getContent(e: Element) {
  let text: string[] = []
  visitDescendants(
    e,
    d => {
      e.screen.log('getccc', isElement(d), isElement(d) && d.getContent())
      text.push(isElement(d) ? strip(d.getContent()) : '')
      return false
    }
    // ,    {childrenFirst: true}
  )
  return text.join(' ')
}
