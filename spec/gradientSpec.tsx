import { tryTo } from 'misc-utils-of-mine-generic'
import { Br, createScreen, debug, Div, getContent, GradientText, GradientTextAnimation, installExitKeys, React, Screen } from '../src'
import { waitFor } from '../src/blessed/waitFor'

describe('gradient', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })
  beforeEach(() => {
    tryTo(() => screen.destroy())
    screen = createScreen({})
    installExitKeys(screen)
  })

  it('should reate text with gradient fg and bg colors, animations', async done => {
    try {
      const g = new GradientText({
        parent: screen,
        width: 40,
        height: 10,
        wrap: true,
        content:
          'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a',
        bgGradientColors: ['#000088', '#0006dd', '#338800'],
        fgGradientColors: ['#ff0000', '#00ff00', '#0000ff']
      })

      new GradientText({
        parent: screen,
        width: 40,
        height: 10,
        top: 12,
        left: 22,
        wrap: true,
        content:
          'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a',
        bgGradientColors: ['#ff5511', '#008833', '#331166'],
        fgGradientColors: ['#66aaee', '#ee66ff', '#ff0000']
      })

      new GradientText({
        parent: screen,
        width: 40,
        height: 10,
        top: 2,
        left: 32,
        wrap: true,
        content:
          'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a',
        bgGradientColors: ['#ff5511', '#008833', '#331166'],
        bg: 'black',
        bold: true
      })

      new GradientTextAnimation({
        parent: screen,
        width: 40,
        height: 10,
        top: 22,
        left: 0,
        wrap: true,
        content:
          'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a',
        bgGradientColors: ['#ff5511', '#00ff33', '#3311ee', '#ff5511'],
        fg: 'black',
        bold: true,
        interval: 100
      })

      new GradientTextAnimation({
        parent: screen,
        width: 40,
        height: 10,
        top: 22,
        left: 40,
        wrap: true,
        content:
          'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a',
        fgGradientColors: ['#66aaee', '#ee66ff', '#ff0000', '#66aaee'],
        bold: true,
        interval: 50
      })

      screen.render()

      await waitFor(() => getContent(g).includes('HELLO'))

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })

  it('should support jsx', async done => {
    const app = React.render(
      <Div parent={screen}>
        <gradientText width="30" fgGradientColors={['#ee9911', '#aa0000']} content="hello world how are you today ?" />

        <gradientText left="40%" width="60%" bgGradientColors={['#ee9911', '#aa0000', '#0000ee']}>
          Aute voluptate et nisi nisi nisi sint aute in nulla ullamco non sit. Laboris commodo elit mollit do. Nisi id
          anim excepteur deserunt elit veniam Lorem dolor deserunt proident dolor ea officia. Et exercitation non sunt
          sint Lorem cupidatat aliqua dolor aliqua consequat voluptate aliquip cillum. Do incididunt est nulla aute
          tempor officia quis mollit dolor ipsum pariatur velit. Cillum cupidatat culpa reprehenderit commodo ad amet
          elit.
        </gradientText>
        <Br />

        <gradientTextAnimation
          left="40%"
          width="60%"
          fgGradientColors={['#ee9911', '#aa2233', '#22aaff', '#ee9911']}
          interval={10}>
          Aute voluptate et nisi nisi nisi sint aute in nulla ullamco non sit. Laboris commodo elit mollit do. Nisi id
          anim excepteur deserunt elit veniam Lorem dolor deserunt proident dolor ea officia. Et exercitation non sunt
          sint Lorem cupidatat aliqua dolor aliqua consequat voluptate aliquip cillum. Do incididunt est nulla aute
          tempor officia quis mollit dolor ipsum pariatur velit. Cillum cupidatat culpa reprehenderit commodo ad amet
          elit.
        </gradientTextAnimation>
      </Div>
    )
    screen.render()

    await waitFor(() => getContent(app).includes('hello'))

    done()
  })

  //   fit('should support JSXText', async done => {
  //     const app =React.render( <Div parent={screen}>
  //       <gradientText fgGradientColors={['#ee9911', '#aa0000']}>hello world how are you today ?</gradientText>
  //     </Div>)
  //     screen.render()
  //     await waitFor(() => getContent(app).includes('hello'))
  //     // done()
  // })
})
