import { blessed, Screen } from '../src/blessed/blessedTypes'

describe('blessedTestUtil', () => {
  //   it('should provide testJsx function', async done => {
  //     testJsx({
  //       creator: screen => (
  //         <box parent={screen}>
  //           hello <textbox secret={true} content="helelele" />
  //           <button content="button123" />
  //         </box>
  //       ),
  //       assert: e => {
  //         expect(find<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
  //         done()
  //       }
  //     })
  //   })
  // })

  describe('blessedTestUtil', () => {
    let screen: Screen
    beforeEach(() => {
      if (!screen.destroyed) {
        screen.destroy()
      }
      screen = blessed.screen({ smartCSR: true })
    })
    afterEach(() => {
      if (!screen.destroyed) {
        screen.destroy()
      }
    })

    //   it('should provide TestDriver class and use beforeEach to maange the screen', async done => {
    //     const driver = new TestDriver({screen})
    //     const {screen, root}= await driver.start()
    //     const e = <box parent={screen}>
    //     hello <textbox secret={true} content="helelele" />
    //     <button content="button123" />
    //   </box>
    //   const ta = find<Textarea>(e, c => c.type === 'button')!.getContent()

    //     testJsx({
    //       creator: screen => (
    //         <box parent={screen}>
    //           hello <textbox secret={true} content="helelele" />
    //           <button content="button123" />
    //         </box>
    //       ),
    //       assert: e => {
    //         expect(find<Textarea>(e, c => c.type === 'button')!.getContent()).toContain('button123')
    //         // console.log(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent());
    //         // expect(find<Textbox>(e, c => isElement<Textbox>(c) && c.secret)!.getContent()).toContain('helelele')
    //         done()
    //       }
    //     })
  })
})

// function isBlessedElement<T extends Element>(a: any): a is T{
// return true
// }
