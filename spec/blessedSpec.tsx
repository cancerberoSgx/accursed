import * as blessed from 'blessed'
import { tryTo } from 'misc-utils-of-mine-generic'
import { getContent, installExitKeys, isElement, React, Screen, screen } from '../src'
import { color } from './blessed/gallery/util'

describe('blessed', () => {
  describe('blessed new Element type', () => {
    let s: Screen

    beforeEach(() => {
      tryTo(() => s.destroy())
      s = screen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      installExitKeys(s)
    })
    afterEach(() => {
      tryTo(() => s.destroy())
    })

    it('should allow to implement a new element type', async done => {
      interface SpinningClockOptions extends blessed.Widgets.TextOptions {
        // clockwise?: boolean // TODO
        frames?: string[]
        interval?: number
        clockLabel?: string // for testing
      }
      class SpinningClock extends blessed.widget.Text<SpinningClockOptions> {
        type = 'spinningclock'
        protected intervalHandler() {
          this.counter = this.counter >= this.options.frames!.length - 1 ? 0 : this.counter + 1
          const c = ` . ${this.options.clockLabel} ${this.options.frames![this.counter]} . `
          this.setContent(c)
          this.screen.render() // TODO: could be improved ?
        }
        protected counter = 0
        protected static defaultOptions = {
          width: 34,
          height: 6,
          clockLabel: 'Spinning',
          interval: 500,
          frames: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚']
        }
        protected timer: NodeJS.Timeout | undefined
        constructor(options: SpinningClockOptions = SpinningClock.defaultOptions) {
          super({ ...SpinningClock.defaultOptions, ...(options || {}) })
          this.options = { ...SpinningClock.defaultOptions, ...(options || {}) }
          this.intervalHandler = this.intervalHandler.bind(this)
          this.timer = setInterval(this.intervalHandler, this.options.interval!)
          this.on('attach', () => {
            this.timer = setInterval(this.intervalHandler, this.options.interval!)
          })
          this.on('detach', () => {
            if (this.timer) {
              clearInterval(this.timer)
            }
          })
        }
      }
      const clock = new SpinningClock({
        parent: s,
        clockLabel: ' flag2 '
      })
      s.render()
      setTimeout(() => { // TODO: wait for contant helper
        expect(getContent(clock)).toContain('flag2')
        done()
      }, 500);
    })

    it('should print function element children generated with map', async done => {
      function C(props: { children?: any; parent: Screen }) {
        // s.log(typeof props.children, props.children, props.children && typeof props.children[0])
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
