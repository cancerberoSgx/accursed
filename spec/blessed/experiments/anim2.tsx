import { enumKeys, objectKeys } from 'misc-utils-of-mine-generic'
import { Br, Column, Columns, debug, Div, Element, React, Screen, Select, SelectOption, text } from '../../../src'
import { waitFor } from '../../../src/blessed/waitFor'
import { animate, easing } from '../../../src/util/anim'

export async function anim2(screen: Screen) {
  try {
    const opts = () => ({
      focusable: true,
      border: 'line',
      keyable: true,
      keys: true,
      style: { focus: { border: { fg: 'red' } }, bg: 'blue', item: { bg: '#118822' }, selected: { bg: 'red' } }
    })
    let duration = 1000
    let easingName = objectKeys(easing)[0]
    enum Mode {
      left = 'left',
      top = 'top',
      width = 'width',
      height = 'height',
      topAndLeft = 'topAndLeft',
      widthAndHeight = 'widthAndHeight'
    }
    let mode: Mode = Mode.left
    let parent: Element
    const app = (
      <Div parent={screen}>
        <Columns>
          <Column width="30%">
            <Select
              {...opts()}
              label="Easing"
              focused={true}
              height={8}
              onSelect={e => {
                easingName = e.value
                performAnimation()
              }}>
              {Object.keys(easing).map(e => (
                <SelectOption>{e}</SelectOption>
              ))}
              {}
            </Select>
            <Br />
            <textbox
              {...opts()}
              label="Duration"
              value={duration + ''}
              onChange={e => {
                duration = parseInt(e.value) || duration
                performAnimation()
              }}
            />
            <Br />
            <Select
              {...opts()}
              label="Transformation"
              height={8}
              onSelect={e => {
                mode = e.value
                performAnimation()
              }}>
              {enumKeys(Mode).map(e => (
                <SelectOption>{e}</SelectOption>
              ))}
              {}
            </Select>
          </Column>
          <Column width="70%" padding={2}>
            <box
              width="90%"
              height="80%"
              top="10%"
              left="10%"
              border="line"
              ref={React.createRef<Element>(current => (parent = current))}
            />
          </Column>
          {}
        </Columns>
      </Div>
    )

    const el = React.render(app)
    screen.render()

    await waitFor(() => parent, { timeout: 1000 })
    const width = 8
    const g = text({
      parent,
      width,
      height: 2,
      content: 'bounce',
      top: 0,
      left: 0,
      bg: 'white',
      fg: 'red'
    })

    function transform(g: Element, t: number) {
      if (mode === Mode.left) {
        g.left = Math.trunc(t * 90) + '%'
      } else if (mode === Mode.width) {
        g.width = Math.trunc(t * 90) + '%'
      } else if (mode === Mode.height) {
        g.height = Math.trunc(t * 90) + '%'
      } else if (mode === Mode.top) {
        g.top = Math.trunc(t * 90) + '%'
      } else if (mode === Mode.topAndLeft) {
        g.top = Math.trunc(t * 90) + '%'
        g.left = Math.trunc(t * 90) + '%'
      } else if (mode === Mode.widthAndHeight) {
        g.width = Math.trunc(t * 90) + '%'
        g.height = Math.trunc(t * 90) + '%'
      }
    }

    function performAnimation() {
      g.left = 0
      g.top = 0
      g.width = width
      g.height = 2
      screen.render()
      try {
        animate({
          duration,
          //@ts-ignore
          timing: easing[easingName](),
          draw: t => {
            transform(g, t)
            screen.render()
          }
        })
      } catch (error) {
        debug(error)
      }
    }

    screen.render()
  } catch (error) {
    debug(error)
  }
}
