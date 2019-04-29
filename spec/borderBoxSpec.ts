import { tryTo } from 'misc-utils-of-mine-generic'
import { BorderBox, BorderStyle, box, createScreen, debug, getContent, installExitKeys, Screen, Widgets } from '../src'
import { waitFor } from '../src/blessed/waitFor'

export interface BorderBoxOptions extends Widgets.BoxOptions {
  borderStyle: BorderStyle
  removeLabel?: boolean
}

describe('borderBox', () => {
  let screen: Screen

  beforeEach(() => {
    tryTo(() => screen.destroy())
    screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
    installExitKeys(screen)
  })
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should show a border and respect label by default', async done => {
    try {
      var border = new BorderBox({
        parent: screen,
        borderStyle: BorderStyle.double,
        top: 2,
        style: { border: { fg: 'blue' }, label: { fg: 'red' } },
        left: 3,
        label: 'hello'
      })
      var b = box({
        parent: border,
        content: 'children content'
      })
      installExitKeys(screen)
      screen.append(border)
      screen.render()
      await waitFor(() => getContent(border).includes('hello'))
      expect(getContent(border)).toContain('children content')
      expect(screen.screenshot()).toContain('╔═')
      expect(screen.screenshot()).toContain('═╗')
      done()
    } catch (error) {
      debug(error)
    }
  })
})
