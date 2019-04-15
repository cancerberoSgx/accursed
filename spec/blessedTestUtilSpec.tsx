import { blessed, Screen, Textarea, BoxOptions, Markdown } from '../src/blessedTypes'
import { testJsx, testElement } from './blessedTestUtil';
import { React } from '../src/jsx/createElement'
import { findDescendant } from '../src/node';
import * as contrib from 'blessed-contrib'
import { strip } from '../src/util/misc';


describe('blessedTestUtil', () => {


describe('testJsx', () => {

  it('should find and filter', async done => {
    testJsx({
      creator: screen => (
        <box parent={screen}>
          hello <textbox secret={true} content="helelele" />
          <button content="button123" />
        </box>
      ),
      assert: e => {
        expect(findDescendant<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
        // console.log(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent());
        // expect(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent()).toContain('helelele')
        done()
      }
    })
  })
})

describe('testElement', () => {
  it('should help to test elements', async done => {
    const markdown = `# Notes
    This text should collapse
    when the collapsible checkbox above is clicked
    and reappear when clicked again
    what they call toggle...`
    const checkboxOptions: BoxOptions = {
      input: true,
      mouse: true,
      clickable: true,
      focusable: true
    }
    testElement({
      creator(screen: Screen) {
        const layout = blessed.layout({
          ...checkboxOptions,
          parent: screen,
          top: '0%',
          left: '0%',
          width: '100%',
          height: '100%',
          border: 'line'
        })
        // installCollapsible(layout, { auto: true })
        contrib.markdown({
          ...checkboxOptions,
          parent: layout,
          markdown
        })
        return layout
      },
      assert(e) {
        const el = findDescendant<Markdown>(e, c => c.type === 'markdown')!
        markdown
          .split('\n')
          .map(s => strip(s).trim())
          .forEach(l => {
            expect(el.getContent()).toContain(l)
          })
        done()
      }
    })
  })
})


  describe('without test util', () => {
    let screen: Screen
    beforeEach(() => {
      if (screen && !screen.destroyed) {
        screen.destroy()
      }
      screen = blessed.screen({ smartCSR: true })
    })
    afterEach(() => {
      if (screen && !screen.destroyed) {
        screen.destroy()
      }
    })
    it('should be able test wihotu helpers', async done => {
      const el = React.render(
        <box parent={screen}>
          hello <textbox secret={true} content="helelele" />
          <button content="button123" />
        </box>
      )
      expect(findDescendant<Textarea>(el, c => c.type === 'button')!.getContent()).toContain('button123')
      done()
    })
  })
})

  //   it('should provide testJsx function', async done => {
  //     testJsx({
  //       creator: screen => (
  //         <box parent={screen}>
  //           hello <textbox secret={true} content="helelele" />
  //           <button content="button123" />
  //         </box>
  //       ),
  //       assert: e => {
  //         expect(findDescendant<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
  //         done()
  //       }
  //     })
  //   })
  // })

  
  // describe('blessedTestUtil', () => {
  //   let screen: Screen
  //   beforeEach(() => {
  //     if (!screen.destroyed) {
  //       screen.destroy()
  //     }
  //     screen = blessed.screen({ smartCSR: true })
  //   })
  //   afterEach(() => {
  //     if (!screen.destroyed) {
  //       screen.destroy()
  //     }
  //   })

  //   //   it('should provide TestDriver class and use beforeEach to maange the screen', async done => {
  //   //     const driver = new TestDriver({screen})
  //   //     const {screen, root}= await driver.start()
  //   //     const e = <box parent={screen}>
  //   //     hello <textbox secret={true} content="helelele" />
  //   //     <button content="button123" />
  //   //   </box>
  //   //   const ta = find<Textarea>(e, c => c.type === 'button')!.getContent()

  //   //     testJsx({
  //   //       creator: screen => (
  //   //         <box parent={screen}>
  //   //           hello <textbox secret={true} content="helelele" />
  //   //           <button content="button123" />
  //   //         </box>
  //   //       ),
  //   //       assert: e => {
  //   //         expect(find<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
  //   //         // console.log(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent());
  //   //         // expect(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent()).toContain('helelele')
  //   //         done()
  //   //       }
  //   //     })
  // })

// function isBlessedElement<T extends Element>(a: any): a is T{
// return true
// }
