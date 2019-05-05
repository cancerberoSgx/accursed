import { box, BoxOptions, Screen } from '../../../../src';
import { invertColor } from '../../../../src/util/data';

// showInModal(screen, React.render(
//   <Div parent={screen} >
//     <Strong>Welcome!</Strong><Br/><Br/>
//   This is a demonstration of how a color palette looks like in a terminal application where colors are limited. <Br/><Br/>
//   In this case, the library I'm using, blessed, tries to interpolate non existing colors. <Br/><Br/>
//   The color palette you are seeing is Google Material's Color Palette (https://material.google.com/style/color.html#color-color-palette).
//   <Br/><Br/>
//   Close this modal to proceed to the demonstration
//   <Br/><Br/>

//   </Div>), 'Color palettes demo', '50%', '50%', ()=>{
//     test3()
//     setTimeout(()=>{screen.render()}, 500)
//   })

// showInModal(screen,

//   React.render(
// <Div >
//   <Strong>Welcome!</Strong><Br/><Br/>
//   <Br/>Short information before the demo. Press ESC, Q, or Control-C to dismiss this message and start. <Br/><Br/>
// This is a demonstration of how a color palette looks like in a terminal application where colors are limited. <Br/><Br/>
// In this case, the library I'm using, blessed, tries to interpolate non existing colors. <Br/><Br/>
// The color palette you are seeing is Google Material's Color Palette (https://material.google.com/style/color.html#color-color-palette).
// <Br/><Br/>
// Close this modal to proceed to the demonstration.
// <Br/><Br/>

// </Div>),

// 'Color palettes demo', '50%', '50%',
// ()=>{
// screen.cursorReset()
//   test3()
//   setTimeout(()=>{screen.cursorReset();  screen.render()}, 500)
// }
// )
// screen.render()

// screen.focusNext()
// }, 4222)

export function color4(screen: Screen) {
  demo()
  // screen.on('click', e=>help())
  screen.render()

  function demo() {
    const palettes = getPalettes()
    const N = Object.keys(palettes[Object.keys(palettes)[0]]).length
    const M = Object.keys(palettes).length
    var dx = Math.trunc(screen.width / N)
    var dy = Math.trunc(screen.height / M)

    function calcX(x: number) {
      return Math.trunc(x * (screen.width / N))
    }
    function calcY(y: number) {
      return Math.trunc(y * (screen.height / M))
    }

    for (let y = 0; y < M; y += 1) {
      const paletteName = Object.keys(palettes)[y]
      const options = {
        focused: true,
        top: calcY(y),
        left: 0,
        content: `${paletteName}`,
        width: dx,
        height: dy,
        style: { bg: 'white', bold: true, underline: true, fg: 'black' },
        hoverText: `Palette: \n${paletteName}, ${Object.keys(Object.values(palettes)[y]).length} colors`
      }
      box({ parent: screen, ...options })
    }

    // blessed.colors.match([b, a+b-255, a ])
    for (let y = 0; y < M; y += 1) {
      for (let x = 1; x < N; x += 1) {
        // const paletteName = Object.keys(palettes)[y]
        const paletteColors = Object.values(palettes)[y]
        const colorName = Object.keys(paletteColors)[x]
        const color = Object.values(paletteColors)[x]
        const options: BoxOptions = {
          top: calcY(y),
          // border: 'line',
          focusable: true,
          mouse: true,
          clickable: true,
          keyable: true,
          keys: true,
          input: true,
          tags: true,
          vi: true,

          focused: true,
          //  draggable: true,
          left: calcX(x) - 1,
          content: colorName,
          width: dx,
          height: dy,
          style: {
            bg: color,
            fg: invertColor(color),
            bold: true,
            hover: { bg: color, fg: invertColor(color) },
            focus: { bg: color, fg: invertColor(color), blink: true, underline: true }

            //border: {fg: invertColor(color), bg: color, type: 'line'}
          },
          hoverText: `${colorName} (${color})`
        }

        box({ parent: screen, ...options })
      }
    }



function getPalettes() {
  return {
    red: {
      shade_50: '#ffebee',
      shade_100: '#ffcdd2',
      shade_200: '#ef9a9a',
      shade_300: '#e57373',
      shade_400: '#ef5350',
      shade_500: '#f44336',
      shade_600: '#e53935',
      shade_700: '#d32f2f',
      shade_800: '#c62828',
      shade_900: '#b71c1c',
      shade_A100: '#ff8a80',
      shade_A200: '#ff5252',
      shade_A400: '#ff1744',
      shade_A700: '#d50000'
    },
    pink: {
      shade_50: '#fce4ec',
      shade_100: '#f8bbd0',
      shade_200: '#f48fb1',
      shade_300: '#f06292',
      shade_400: '#ec407a',
      shade_500: '#e91e63',
      shade_600: '#d81b60',
      shade_700: '#c2185b',
      shade_800: '#ad1457',
      shade_900: '#880e4f',
      shade_A100: '#ff80ab',
      shade_A200: '#ff4081',
      shade_A400: '#f50057',
      shade_A700: '#c51162'
    },
    purple: {
      shade_50: '#f3e5f5',
      shade_100: '#e1bee7',
      shade_200: '#ce93d8',
      shade_300: '#ba68c8',
      shade_400: '#ab47bc',
      shade_500: '#9c27b0',
      shade_600: '#8e24aa',
      shade_700: '#7b1fa2',
      shade_800: '#6a1b9a',
      shade_900: '#4a148c',
      shade_A100: '#ea80fc',
      shade_A200: '#e040fb',
      shade_A400: '#d500f9',
      shade_A700: '#aa00ff'
    },
    deepPurple: {
      shade_50: '#ede7f6',
      shade_100: '#d1c4e9',
      shade_200: '#b39ddb',
      shade_300: '#9575cd',
      shade_400: '#7e57c2',
      shade_500: '#673ab7',
      shade_600: '#5e35b1',
      shade_700: '#512da8',
      shade_800: '#4527a0',
      shade_900: '#311b92',
      shade_A100: '#b388ff',
      shade_A200: '#7c4dff',
      shade_A400: '#651fff',
      shade_A700: '#6200ea'
    },
    indigo: {
      shade_50: '#e8eaf6',
      shade_100: '#c5cae9',
      shade_200: '#9fa8da',
      shade_300: '#7986cb',
      shade_400: '#5c6bc0',
      shade_500: '#3f51b5',
      shade_600: '#3949ab',
      shade_700: '#303f9f',
      shade_800: '#283593',
      shade_900: '#1a237e',
      shade_A100: '#8c9eff',
      shade_A200: '#536dfe',
      shade_A400: '#3d5afe',
      shade_A700: '#304ffe'
    },
    blue: {
      shade_50: '#e3f2fd',
      shade_100: '#bbdefb',
      shade_200: '#90caf9',
      shade_300: '#64b5f6',
      shade_400: '#42a5f5',
      shade_500: '#2196f3',
      shade_600: '#1e88e5',
      shade_700: '#1976d2',
      shade_800: '#1565c0',
      shade_900: '#0d47a1',
      shade_A100: '#82b1ff',
      shade_A200: '#448aff',
      shade_A400: '#2979ff',
      shade_A700: '#2962ff'
    },
    lightBlue: {
      shade_50: '#e1f5fe',
      shade_100: '#b3e5fc',
      shade_200: '#81d4fa',
      shade_300: '#4fc3f7',
      shade_400: '#29b6f6',
      shade_500: '#03a9f4',
      shade_600: '#039be5',
      shade_700: '#0288d1',
      shade_800: '#0277bd',
      shade_900: '#01579b',
      shade_A100: '#80d8ff',
      shade_A200: '#40c4ff',
      shade_A400: '#00b0ff',
      shade_A700: '#0091ea'
    },
    cyan: {
      shade_50: '#e0f7fa',
      shade_100: '#b2ebf2',
      shade_200: '#80deea',
      shade_300: '#4dd0e1',
      shade_400: '#26c6da',
      shade_500: '#00bcd4',
      shade_600: '#00acc1',
      shade_700: '#0097a7',
      shade_800: '#00838f',
      shade_900: '#006064',
      shade_A100: '#84ffff',
      shade_A200: '#18ffff',
      shade_A400: '#00e5ff',
      shade_A700: '#00b8d4'
    },
    teal: {
      shade_50: '#e0f2f1',
      shade_100: '#b2dfdb',
      shade_200: '#80cbc4',
      shade_300: '#4db6ac',
      shade_400: '#26a69a',
      shade_500: '#009688',
      shade_600: '#00897b',
      shade_700: '#00796b',
      shade_800: '#00695c',
      shade_900: '#004d40',
      shade_A100: '#a7ffeb',
      shade_A200: '#64ffda',
      shade_A400: '#1de9b6',
      shade_A700: '#00bfa5'
    },
    green: {
      shade_50: '#e8f5e9',
      shade_100: '#c8e6c9',
      shade_200: '#a5d6a7',
      shade_300: '#81c784',
      shade_400: '#66bb6a',
      shade_500: '#4caf50',
      shade_600: '#43a047',
      shade_700: '#388e3c',
      shade_800: '#2e7d32',
      shade_900: '#1b5e20',
      shade_A100: '#b9f6ca',
      shade_A200: '#69f0ae',
      shade_A400: '#00e676',
      shade_A700: '#00c853'
    },
    lightGreen: {
      shade_50: '#f1f8e9',
      shade_100: '#dcedc8',
      shade_200: '#c5e1a5',
      shade_300: '#aed581',
      shade_400: '#9ccc65',
      shade_500: '#8bc34a',
      shade_600: '#7cb342',
      shade_700: '#689f38',
      shade_800: '#558b2f',
      shade_900: '#33691e',
      shade_A100: '#ccff90',
      shade_A200: '#b2ff59',
      shade_A400: '#76ff03',
      shade_A700: '#64dd17'
    },
    lime: {
      shade_50: '#f9fbe7',
      shade_100: '#f0f4c3',
      shade_200: '#e6ee9c',
      shade_300: '#dce775',
      shade_400: '#d4e157',
      shade_500: '#cddc39',
      shade_600: '#c0ca33',
      shade_700: '#afb42b',
      shade_800: '#9e9d24',
      shade_900: '#827717',
      shade_A100: '#f4ff81',
      shade_A200: '#eeff41',
      shade_A400: '#c6ff00',
      shade_A700: '#aeea00'
    },
    yellow: {
      shade_50: '#fffde7',
      shade_100: '#fff9c4',
      shade_200: '#fff59d',
      shade_300: '#fff176',
      shade_400: '#ffee58',
      shade_500: '#ffeb3b',
      shade_600: '#fdd835',
      shade_700: '#fbc02d',
      shade_800: '#f9a825',
      shade_900: '#f57f17',
      shade_A100: '#ffff8d',
      shade_A200: '#ffff00',
      shade_A400: '#ffea00',
      shade_A700: '#ffd600'
    },
    amber: {
      shade_50: '#fff8e1',
      shade_100: '#ffecb3',
      shade_200: '#ffe082',
      shade_300: '#ffd54f',
      shade_400: '#ffca28',
      shade_500: '#ffc107',
      shade_600: '#ffb300',
      shade_700: '#ffa000',
      shade_800: '#ff8f00',
      shade_900: '#ff6f00',
      shade_A100: '#ffe57f',
      shade_A200: '#ffd740',
      shade_A400: '#ffc400',
      shade_A700: '#ffab00'
    },
    orange: {
      shade_50: '#fff3e0',
      shade_100: '#ffe0b2',
      shade_200: '#ffcc80',
      shade_300: '#ffb74d',
      shade_400: '#ffa726',
      shade_500: '#ff9800',
      shade_600: '#fb8c00',
      shade_700: '#f57c00',
      shade_800: '#ef6c00',
      shade_900: '#e65100',
      shade_A100: '#ffd180',
      shade_A200: '#ffab40',
      shade_A400: '#ff9100',
      shade_A700: '#ff6d00'
    },
    deepOrange: {
      shade_50: '#fbe9e7',
      shade_100: '#ffccbc',
      shade_200: '#ffab91',
      shade_300: '#ff8a65',
      shade_400: '#ff7043',
      shade_500: '#ff5722',
      shade_600: '#f4511e',
      shade_700: '#e64a19',
      shade_800: '#d84315',
      shade_900: '#bf360c',
      shade_A100: '#ff9e80',
      shade_A200: '#ff6e40',
      shade_A400: '#ff3d00',
      shade_A700: '#dd2c00'
    },
    brown: {
      shade_50: '#efebe9',
      shade_100: '#d7ccc8',
      shade_200: '#bcaaa4',
      shade_300: '#a1887f',
      shade_400: '#8d6e63',
      shade_500: '#795548',
      shade_600: '#6d4c41',
      shade_700: '#5d4037',
      shade_800: '#4e342e',
      shade_900: '#3e2723'
    },
    grey: {
      shade_50: '#fafafa',
      shade_100: '#f5f5f5',
      shade_200: '#eeeeee',
      shade_300: '#e0e0e0',
      shade_400: '#bdbdbd',
      shade_500: '#9e9e9e',
      shade_600: '#757575',
      shade_700: '#616161',
      shade_800: '#424242',
      shade_900: '#212121'
    },
    blueGrey: {
      shade_50: '#eceff1',
      shade_100: '#cfd8dc',
      shade_200: '#b0bec5',
      shade_300: '#90a4ae',
      shade_400: '#78909c',
      shade_500: '#607d8b',
      shade_600: '#546e7a',
      shade_700: '#455a64',
      shade_800: '#37474f',
      shade_900: '#263238'
    }
  }
}
