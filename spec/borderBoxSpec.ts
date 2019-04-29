import { React, widget, Widgets, installExitKeys, createScreen, debug, labelBlink, box, Screen } from '../dist/src'
import { BorderSide, BorderStyle, getBoxStyleChar } from '../src/blessed/boxes';
import { Border } from '../src/blessed/borderBox';
import { tryTo } from 'misc-utils-of-mine-generic';
import { waitFor } from '../src/blessed/waitFor';
import { getContent, printElement } from '../src';

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

  fit('should show a border and respect label by default', async done => {

    try {
      var border = new Border({
        parent: screen,
        borderStyle: BorderStyle.double,
        top: 2,
        left: 3,
        label: 'hello',
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


