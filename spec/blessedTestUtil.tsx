import * as blessed from 'blessed'
import { installExitKeys } from '../src/blessed/blessed'
import { Element, Screen } from '../src/blessed/blessedTypes'
import { React } from '../src/blessed/jsx/createElement'

export function testJsx({
  creator,
  assert
}: {
  creator: (screen: Screen) => JSX.Element
  assert: (e: Element) => void
}) {
  const screen = blessed.screen({ smartCSR: true })
  installExitKeys(screen)
  const el = creator(screen)
  const a = React.render(el)
  a.on('render', () => {
    assert(a)
    screen!.destroy()
  })
  screen.render()
}

export function testElement({
  creator,
  assert
}: {
  creator: (screen: Screen) => Element
  assert: (e: Element) => void
}) {
  let screen: Screen
  try {
    screen = blessed.screen({ smartCSR: true, debug: true, log: 'log.txt' })
    installExitKeys(screen)
    const a = creator(screen)

    setTimeout(() => {
      // HEADS UP _ we need to timeout instead of lietening to render becase this i triggered twice the first time the workrges are not yet rendered....
      assert(a)
      screen!.destroy()
    }, 100)

    // a.on('render', () => {
    // })
    screen.render()
  } catch (error) {
    screen!.log(error)
  }
}

/** install beforeEach and afterEach so they create a new screen for its spec and destroy previous */
export function installBeforeAndAfterMethods(options: Options) {
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
}

/** a driver manages a screen and a test session */
export class TestDriver {
  private _screen: Screen | undefined
  public get screen(): Screen {
    return this.getScreen()
    // if(!this._screen){
    //   this._screen = this. (true)
    //   return this._screen!;
    // }
    // return this._screen!;
  }
  constructor(protected options: Options = {}) {}

  private getScreen(mode: 'nothing' | 'reset' | 'createNew' | 'destroy' = 'nothing') {
    if (this._screen && ((!this._screen.destroyed && mode === 'createNew') || mode === 'destroy')) {
      this._screen.destroy()
      this._screen = undefined
    }
    if (!this._screen || mode === 'createNew' || this._screen.destroyed) {
      this._screen = blessed.screen({ smartCSR: true, debug: true, log: './log.txt' })
      installExitKeys(this._screen)
    } else if (mode === 'reset') {
      this._screen!.leave() //TODO HEADS UP : test if this work!
      // TODO events and descendants ?
    }
    return this._screen
  }

  installBeforeAndAfterMethods(options: Options = {}) {
    this.options = { ...this.options, ...options }
    this._screen = this.getScreen()
    const before = options.installBeforeAfterAll ? beforeAll : beforeEach
    before(() => {
      this.getScreen(options.reuseScreen ? 'reset' : 'createNew')
    })
    const after = options.installBeforeAfterAll ? afterAll : afterEach
    after(() => {
      this.getScreen('destroy')
    })
    // return this.getScreen()
  }
  // /** setup beforeEach/afterEach methods. On each, depending on config, a new screen is created and previous destroyed */
  // async prepareSpec() {
  //   screen = this.options.screen||blessed.screen({ smartCSR: true })
  //   const screen = this.options.screen||blessed.screen({ smartCSR: true })
  //   return screen
  // }
  // destroy(){

  // }
}
interface Options {
  /** installs beforeAll and afterAll instead of beforeEach . by default beforeEinstallBeforeAndAfterMethodsMethods?: 'each'|'all'
  /** by default the screen is destroyed / created on setup / teardown - if this is true it will be reused. */
  reuseScreen?: boolean

  /** if true will setup beforeAll / afterAll instead of beforeEachafterEach */
  installBeforeAfterAll?: boolean

  // /** users can provide their own Screen instance at any time */
  // screen?: Screen
}
