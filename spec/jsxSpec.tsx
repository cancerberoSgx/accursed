import { Div } from '../src';
import { Screen } from '../src/blessedTypes';
import { React } from '../src/jsx/createElement';
import { testJsx } from './blessedTestUtil';

describe('jsx', () => {
  fdescribe('custom elements', () => {
    it('should print function element children', async done => {

      function C(props: {children?: any, parent: Screen}) {
        return (
          <layout layout="grid" width="100%" height="100%">
            <text content="Custom component: "/>{props.children}
          </layout>
        )
      }
      
      testJsx({
        creator: screen => (
          <Div parent={screen}> hello world</Div>
          // <C parent={screen}>
          //   hello <textbox secret={true} content="helelele" />
          //   <button content="button123" />
          // </C>
        ),
        assert: async e => {
          await waits(3000)
          // expect(findDescendant<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
          // console.log(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent());
          // expect(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent()).toContain('helelele')
          done()
        }
      })
    })
  })
  })