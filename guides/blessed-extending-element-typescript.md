How to create a new blessed Element extending blessed classes, with descent type documented type checking and TypeScript using accursed:

# spec/blessed/experiments/blessedExtendTs.tsx

```ts
import { installExitKeys, screen, widget, Widgets } from '../../../src';

interface SpinningClockOptions extends Widgets.TextOptions {
  clockwise?: boolean
  frames?: string[]
  interval?: number
}

class SpinningClock extends widget.Text<SpinningClockOptions> {
  private static nextTick = global.setImmediate || process.nextTick.bind(process)
  type = 'spinningclock'
  private intervalHandler() {
    if (this.options.clockwise) {
      this.counter = this.counter >= this.options.frames!.length - 1 ? 0 : this.counter + 1
    }
    else {
      this.counter = this.counter <= 0 ? this.options.frames!.length - 1 : this.counter - 1
    }
    const c = `${this.options.frames![this.counter]}`
    this.setContent(c)
    SpinningClock.nextTick(() => this.screen.render())
  }
  private counter = 0
  private static defaultOptions = {
    width: 34,
    height: 6,
    clockLabel: 'Spinning',
    interval: 500,
    frames: ['🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚']
  }
  private timer: NodeJS.Timeout | undefined

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

// test our new element:
const screen1 = screen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
installExitKeys(screen1)
const clock = new SpinningClock({ parent: screen1, })
screen1.render()

```