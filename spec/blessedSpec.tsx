import { tryTo } from 'misc-utils-of-mine-generic'
import { getContent, installExitKeys, React, Screen, screen, box } from '../src'
import { color } from './blessed/gallery/util'
import * as blessed from 'blessed'

describe('blessed', () => {
  describe('blessed new Element type', () => {
    let s: Screen

    beforeEach(() => {
      tryTo(() => s.destroy())
      s = screen({ smartCSR: true, log: 'log.txt' })
      s.program.output.on
      installExitKeys(s)
    })
    afterEach(() => {
      tryTo(() => s.destroy())
    })

    it('should allow to implement a new element type', async done => {
      interface CollapsibleBoxOptions extends blessed.Widgets.BoxOptions{

      }
      class CollapsibleBox extends blessed.widget.Box {
        constructor(options:CollapsibleBoxOptions){
          super(options)
          // this.onScreenEvent()
        }
        // render()
      }
      function C(props: { children?: any; parent: Screen }) {
        return (
          <layout parent={props.parent} layout="grid" width="100%" height="100%">
            <text content="before1" width={20} height={3} style={{ bg: color() }} border="line" />
            {props.children}
            <text content="after2" width={6} height={5} />
          </layout>
        )
      }
      // log  before1 hello22   button123  bye22 after2
      // before1 hello22   button123  bye22 after2
      const e = React.render(
        <C parent={s}>
          hello22 <textbox secret={true} content="secret" width={20} height={4} />
          <button content="button123" width={20} height={4} /> bye22
        </C>
      )

      s.render()
      const c = getContent(e)
        // s.log('first', getContent(e, {childrenLast: false}), 'last', getContent(e, {childrenLast: true}))
      ;['before1', 'after2', 'button123', 'bye22', 'hello22'].forEach(s => {
        expect(c).toContain(s)
      })
      expect(c).not.toContain('secret')
      done()
    })

    it('should print function element children generated with map', async done => {
      function C(props: { children?: any; parent: Screen }) {
        s.log(typeof props.children, props.children, props.children && typeof props.children[0])

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
        // s.log('first', getContent(e, {childrenLast: false}), 'last', getContent(e, {childrenLast: true}))
      ;['before1', 'after2', 'test2', 'test4', 'test6', 'bye22', 'hello22'].forEach(s => {
        expect(c).toContain(s)
      })
      expect(c).not.toContain('secret')
      done()
    })
  })
})
