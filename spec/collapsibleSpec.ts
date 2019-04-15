import * as blessed from 'blessed'
import * as contrib from 'blessed-contrib'
import { BoxOptions, Markdown, Screen } from '../src/blessed/blessedTypes'
import { installCollapsible } from '../src/blessed/collapsible'
import { findDescendant } from '../src/blessed/node'
import { strip } from '../src/util/misc'
import { testElement } from './blessedTestUtil'

describe('collapsible', () => {
  it('should allow zero configuration with auto property', async done => {
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
        installCollapsible(layout, { auto: true })
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
