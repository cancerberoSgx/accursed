import { enumKeys } from 'misc-utils-of-mine-typescript'
import { BorderStyle, Button2, Div, React } from '../../../src'
import { number, words } from '../../../src/util/data'
import { color } from '../gallery/util'

export function borderBoxDemo() {
  {
    /* <borderBox borderStyle={style as any} label={style} draggable={true} width={16} height={10}>
border style: {style}
<Button2  top="50%"onClick={e=>{}}>click me </Button2>{}
</borderBox>)} */
  }

  return (
    <Div>
      {enumKeys(BorderStyle).map(style => (
        <borderBox
          borderStyle={style as any}
          label={style}
          style={{ label: { fg: color() }, border: { fg: color() } }}
          width={26}
          height={14}>
          <text content={`border style: ${style}, ${words(number(5, 10)).join(', ')}`} />
          <Button2 top="50%" onClick={e => {}}>
            {style}
          </Button2>
          {}
        </borderBox>
      ))}
      {/* <borderBox borderStyle={BorderStyle.single} label="single" draggable={true} width={16} height={10}>
  BorderStyle.single
  <Button2  top="50%"onClick={e=>{}}>click me </Button2>{}
  </borderBox>
  <borderBox borderStyle={BorderStyle.lightDoubleDash} label="doubleDash" draggable={true} width={16} height={10}>
  BorderStyle.doubleDash
  <Button2  top="50%"onClick={e=>{}}>click me </Button2>{}
  </borderBox>
  <borderBox borderStyle={BorderStyle.double} label="double" draggable={true} width={16} height={10}>
  BorderStyle.double
  <Button2  top="50%"onClick={e=>{}}>click me </Button2>{}
  </borderBox>

  <borderBox borderStyle={BorderStyle.double} label="double" draggable={true} width={16} height={10}>
  BorderStyle.double
  <Button2  top="50%"onClick={e=>{}}>click me </Button2>{}
  </borderBox>

    <borderBox borderStyle={BorderStyle.heavier} label="heavier" draggable={true} width={16} height={10}>
    BorderStyle.bolder
  <Button2 top="50%"onClick={e=>{}}>click me </Button2>{}  
  </borderBox>
  <borderBox borderStyle={BorderStyle.single} label="single" draggable={true}  width={16} height={10}>
  BorderStyle.single
  <Button2  top="50%"onClick={e=>{}}>click me </Button2>{}
  </borderBox>

  <borderBox borderStyle={BorderStyle.round} label="round" draggable={true} width={16} height={10}>
  BorderStyle.round
  <Button2  top="50%"onClick={e=>{}}>click me </Button2>{}
  </borderBox>{} */}
    </Div>
  )

  // animDemo(screen)
}

// try {

//   const screen = createScreen({ fastCSR: true, useBCE: true })
//   installExitKeys(screen)

//   // screen.append(React.render(app))
//   borderBoxDemo(screen)
//   screen.render()

// } catch (error) {
//   debug(error)

// }
