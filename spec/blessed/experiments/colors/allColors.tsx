import * as blessed from 'blessed'
import { box, Box, Br, Div, isElement, React, Screen, showInModal } from '../../../../src'
import { invertColor } from '../../../../src/util/data'

export function allColors(screen: Screen) {
  var dx = 9
  let colorStep = 20
  var dy = 3
  let showText = true

  let container: Box
  let parent: Box
  renderApp()

  function update() {
    const currentScroll = parent.getScroll()
    container.children.filter(isElement).forEach(c => {
      c.detach()
      c.destroy()
    })
    parent = drawColors(container)
    parent.scrollTo(currentScroll)
    screen.render()
  }

  function renderApp() {
    const opts = () => ({
      focusable: true,
      keyable: true,
      keys: true,
      input: true,
      border: 'line',
      style: { bg: 'cyan', border: { fg: '#ededed' }, focus: { bg: 'red', border: { fg: 'red' } } }
    })
    const app = (
      <Div width="100%" parent={screen}>
        <Br />
        <Div height={4} width="100%">
          <checkbox
            checked={true}
            {...opts()}
            label="Show Text?"
            onChange={e => {
              showText = e.value
              update()
            }}
          />
          <textbox
            {...opts()}
            value={dy + ''}
            width={10}
            label="Height"
            onChange={e => {
              dy = parseInt(e.value) || dy
              update()
            }}
          />
          <textbox
            {...opts()}
            value={dx + ''}
            width={10}
            label="Width"
            onChange={e => {
              dx = parseInt(e.value) || dx
              update()
            }}
          />
          <textbox
            {...opts()}
            value={colorStep + ''}
            width={20}
            label="Color Step"
            onChange={e => {
              colorStep = parseInt(e.value) || colorStep
              update()
            }}
          />{' '}
          (Warning: values below 5 take render takes lots of time to render)
        </Div>
        <Div
          width="100%"
          top={4}
          ref={React.createRef(current => {
            container = current
            parent = drawColors(container)
            parent.scrollTo(0)
          })}
        />
      </Div>
    )

    screen.render()

    setTimeout(() => {
      showInModal(
        screen,
        React.render(
          <Div>
            Welcome to "all colors" demo <Br />
            It's a demonstration printing all RGB colors in the terminal to see which are supported. <Br />
            <Br />
            * Use [UP] and [DOWN] keys to scroll the content. <Br />
            * Also you can use the mouse wheel to scroll. <Br />
            * At any time you can close the demo with keys [Q], or [Control-c] or [ESC]. <Br />
            * Close this modal with keys [Q], or [Control-c] or [ESC]. <Br />
            Enjoy.
            <Br />
            <Br />
            Author: Sebastian Gurin.
            <Br />
            Project Home: (https:/github.com/cancerberoSgx/accursed/)
            <Br />
          </Div>
        ),
        'Welcome',
        '90%',
        '90%'
      )
    }, 2000)
  }

  function drawColors(container: Box) {
    let x = 0,
      y = 0
    const parent = box({
      parent: container,
      top: 0,
      left: 0,
      width: '100%',
      bg: 'black',
      scrollable: true,
      focusable: true,
      focused: true,
      mouse: true,
      clickable: true,
      keyable: true,
      keys: true,
      input: true,
      scrollbar: {
        ch: ' ',
        track: {
          bg: 'cyan',
          fg: 'magenta'
        },
        style: {
          inverse: true
        }
      },
      alwaysScroll: true
    })
    for (let r = 0; r < 255; r += colorStep) {
      for (let g = 0; g < 255; g += colorStep) {
        for (let b = 0; b < 255; b += colorStep) {
          const color = blessed.colors.RGBToHex(r, g, b)
          box({
            parent,
            top: y,
            left: x,
            width: dx,
            height: dy,
            valign: 'middle',
            align: 'center',
            content: showText ? color : '',
            style: { bg: color, fg: showText ? invertColor(color) : undefined }
          })
          if (x >= screen.width - dx * 2) {
            x = 0
            y += dy
          } else {
            x += dx
          }
        }
      }
    }
    return parent
  }
}
