import { React } from '../../src/jsx/createElement'
import { animate, easing } from '../../src/util/anim';
import { createProgramRendererDocument } from '../../src/util/util';


const p = <box width={10} height={3} bg="red" fg="black" top={4} left={0} ch="_">
</box>
const { renderer } = createProgramRendererDocument()
const e = React.render(p)
renderer.renderElement(e)

animate({
  duration: 2000,
  timing: easing.bounceEasyOut(),
  draw: t => {
    renderer.eraseElement(e)
    const x = Math.round( (renderer.program.cols-e.props.width)*t)
    // console.log(x)
    e.props.left =x
    renderer.renderElement(e)
  },
  lapse: 0
})


