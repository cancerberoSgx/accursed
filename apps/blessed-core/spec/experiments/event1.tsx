import { debug, FlorDocument } from '../../src'
import { Flor } from '../../src/jsx/createElement'

try {
  const p = <box width={10} height={3} bg="red" fg="black" top={4} left={0} ch="_" onClick={e => {
    e.currentTarget!.props.bg = 'blue'
    flor.renderer.renderElement(le)
  }}>
  </box>
  const flor = new FlorDocument()
  flor.renderer.program.enableMouse()
  const le = flor.renderElement(p)

} catch (error) {
  debug(error)
}
