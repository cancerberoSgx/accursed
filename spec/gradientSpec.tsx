import { tryTo } from 'misc-utils-of-mine-generic'
import { createScreen, debug, getContent, installExitKeys, React, Screen, ElementOptions } from '../src'
import { waitFor } from '../src/blessed/waitFor'
import { Br, Div } from '../src/jsx-components'
import { OptionsProvider } from '../src/jsx-components/optionsProvider'
import * as blessed from 'blessed'
import { rgb2Hex } from '../src/util/misc';
import { GradientText, GradientTextAnimation } from '../src/blessed/gradient';

describe('gradient', () => {
  let screen: Screen
  afterEach(() => {
    tryTo(() => screen.destroy())
  })

  it('should reate text with gradient fg and bg colors, animations', async done => {
    try {
      screen = createScreen({})
      installExitKeys(screen)
      const g = new GradientText({ parent: screen, width: 40, height: 10, wrap: true, content: 'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a' , bgGradientColors: ['#000088', '#0006dd', '#338800'], fgGradientColors: ['#ff0000', '#00ff00', '#0000ff']})


     new GradientText({ parent: screen, width: 40, height: 10, top: 12, left: 22, wrap: true, content: 'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a' , bgGradientColors: ['#ff5511', '#008833', '#331166'], fgGradientColors: ['#66aaee', '#ee66ff', '#ff0000']})


     new GradientText({ parent: screen, width: 40, height: 10, top: 2, left: 32, wrap: true, content: 'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a' , bgGradientColors: ['#ff5511', '#008833', '#331166'], bg: 'black', bold: true})
      
     new GradientTextAnimation({ parent: screen, width: 40, height: 10, top: 22, left: 0, wrap: true, content: 'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a' , bgGradientColors: ['#ff5511', '#00ff33', '#3311ee', '#ff5511'],fg:'black', bold: true, interval: 100})
      
     new GradientTextAnimation({ parent: screen, width: 40, height: 10, top: 22, left: 40, wrap: true, content: 'HELLO HELLO WORLD HOW OALSKJ FALSKDJ FLAJS DFL AKS JDLFK ASLKDJ Fh\nla jsdlkaj sdlkja sldk jalk sdlaks jld kalksd\nlaks jdlak jsdlk ajlsd lka jsld kals dlkaj sdlka jsldk ajl sdl ajklsd kla jsdlak jlsd kals jdlak jsldk a' , fgGradientColors: ['#66aaee', '#ee66ff', '#ff0000', '#66aaee'], bold: true, interval: 50})


      screen.render()

      await waitFor(() => getContent(g).includes('HELLO'))

      done()
    } catch (error) {
      debug('ERROR', error)
    }
  })
})
