import { blessed, Screen, Textarea } from '../src/blessed/blessedTypes'
import { React } from '../src/blessed/jsx/createElement'
import { findDescendant } from '../src/blessed/node'
import { testJsx } from './blessedTestUtil'

describe('blessed node', () => {
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
      // const ta = find<Textarea>(React.render(e), c => c.type === 'button')!.getContent()
      expect(findDescendant<Textarea>(el, c => c.type === 'button')!.getContent()).toContain('button123')
      done()
    })
  })
})
