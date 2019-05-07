import { Flor } from '../../src/jsx/createElement'
import { animate, easing } from '../../src/util/anim'
import { createProgramRendererDocument } from '../../src/util/util'
import { FlorDocument, debug } from '../../src';

const p = <box width={10} height={3} bg="red" fg="black" top={4} left={0} ch="_">
</box>

const flor = new FlorDocument()
let e = flor.add(p)

debug(e, e.outerHTML);

e = Flor.render(p)
flor.renderer.renderElement(e)

// animate({
//   duration: 2000,
//   timing: easing.bounceEasyOut(),
//   draw: t => {
//     flor.renderer.eraseElement(e)
//     const x = Math.round((flor.renderer.program.cols - e.props.width) * t)
//     console.log(x)
//     e.props.left = x
//     flor.renderer.renderElement(e)
//   },
//   lapse: 0
// })
