import { tryTo } from 'misc-utils-of-mine-generic'
import { getContent, installExitKeys, React, Screen, screen, box, Div } from '../src'
import { color } from './blessed/gallery/util'
import * as blessed from 'blessed'
import { strip } from '../src/util/misc';
import { notFalsy } from 'misc-utils-of-mine-typescript';

describe('blessed', () => {
  describe('blessed new Element type', () => {
    let s: Screen

    beforeEach(() => {
      tryTo(() => s.destroy())
      s = screen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      s.log(Object.keys(blessed.widget))
      s.program.output.on
      installExitKeys(s)
    })
    afterEach(() => {
      tryTo(() => s.destroy())
    })

    fit('should allow to implement a new element type', async done => {
      interface SpinningClockOptions extends blessed.Widgets.TextOptions {
        // clockwise?: boolean // TODO
        frames?: string[]
        interval?: number 
        clockLabel?: string // for testing
      }
      
      class SpinningClock extends blessed.widget.Text< SpinningClockOptions > {
        // protected static defaultFrames: string[]  = 
        protected intervalHandler() {
          this.counter = this.counter >= this.options.frames!.length -1 ? 0 : this.counter + 1
          const c = ` . ${this.options.clockLabel} ${this.options.frames![this.counter]} . `
          // this.screen.log('intervalHandler', c)
          this.setContent(c)
          
          this.screen.render()
        }
      // protected   frames: string[];
      // protected   interval: number;
      // protected   clockwise: boolean;
      protected counter = 0
      // protected clockLabel : string
        protected static defaultOptions = {width: 34, height: 6, clockLabel: 'Spinning', interval: 500,
         frames:  ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'], 
        //  content:  `${'shhshshs'} ... '🕐', jsjs'` 
        }

        protected timer: NodeJS.Timeout|undefined
        
        type = 'spinningclock'
        constructor(options:SpinningClockOptions=SpinningClock.defaultOptions){
          super({...SpinningClock.defaultOptions , ...options||{}})
          this.options = {...SpinningClock.defaultOptions , ...options||{}}  
          // this.frames = options.frames||SpinningClock.defaultFrames
          // this.interval = options.interval||500
          // this.clockwise = options.clockwise||true
          this.intervalHandler = this.intervalHandler.bind(this)

          // setTimeout(()=>{
          //   this.setContent(`'🕑', '🕒'`)
          //   this.screen.render()
          // }, 2000)
          // this.on('attach', ()=>{
            // this.screen.log('attach', this.options)
            // this.intervalHandler
           this.timer = setInterval(this.intervalHandler, this.options.interval!)
          // })
          this.on('detach', ()=>{
            if(this.timer){
              //TODO: test that is called when we remove the element
              clearInterval(this.timer)
            }
           })
          // this.getLine()[0
          // this.onAttach
        }
      //   render() {
      //     this.setContent(this.frames[0])
      // return super.render()
  // var coords = this._render();
  // if (!coords) return;

          // this.clearPos()

        // }
      }

      const clock = new SpinningClock({parent: s
          , clockLabel: ' flag2 '
      })
      s.render()
      // const c = getContent(clock)
        s.log('first', clock.content, clock.getContent(), s.lines)
        // expect(c).toContain(s)
      // })
      // expect(c).not.toContain('secret')
      // await 
      // done()
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
