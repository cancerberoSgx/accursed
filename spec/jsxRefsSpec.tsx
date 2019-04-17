import { tryTo } from 'misc-utils-of-mine-generic';
import { BoxOptions, Button, Div, React, Screen, createScreen, installExitKeys, } from '../src';
import { waitFor } from '../src/blessed/waitFor';

describe('jsxRefs', () => {
describe('should associate a element with vriable at render time ', () => {
  let screen: Screen
    afterEach(() => {
      tryTo(() => screen.destroy())
  })
  fit('should create references to elements for markup at render time', async done => {
      screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
      installExitKeys(screen)
    const ref1 = React.createRef<Button>()
  React.render(<Div width="100%" border="line" height="100%"  style={{ bg: 'red' }} parent={screen}>
      <button ref={ref1}      
      top="80%" left="80%" content="button11" onPress={e => { e.currentTarget.content = "clicked!"; e.currentTarget.screen.render() }}></button>
    </Div>)
  screen.render()
       ref1.current!.content = "'changed3"
       ref1.current!.screen.render()
         await waitFor(()=>ref1.current! && ref1.current!.getContent().includes('changed3'))
         done()
      })
    })
  })


// describe('waitFor green full of comments', () => {
//   let screen: Screen
//   // beforeEach(() => {
//     //   tryTo(() => screen.destroy())
//     //   screen = blessed.screen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
//     //   installExitKeys(screen)
//     // })
//     afterEach(() => {
//       tryTo(() => screen.destroy())
//   })
  
//   fit('should create references to elements for markup at render time', async done => {
//     // (() => screen.destroy())
//     try{
//       screen = createScreen({ smartCSR: true, log: 'log.txt', fullUnicode: true })
//       installExitKeys(screen)
      
//       function logTrue(s:string){
//         screen.log(s)
//         return true
//       }
//       // } catch (error) {
//         // screen && screen.log(error)
//         // throw error
//   // }
//     const ref1 = React.createRef<Button>()

//   React.render(<Div width="100%" border="line" height="100%"  style={{ bg: 'red' }} parent={screen}>
//       <button ref={ref1} top="80%" left="80%" content="button11" onPress={e => { e.currentTarget.content = "clicked!"; e.currentTarget.screen.render() }}></button>
//     </Div>)

// screen.render()
// //  await waitFor(()=>ref1.current! && ref1.current!.getContent()&& logTrue(ref1.current!.getContent()) && ref1.current!.getContent().includes('button11'))
//  expect(ref1.current!.getContent().includes('button11')).not.toContain('changed3')

// // try {
//   // screen.append(React.render(app))
//   screen.render()
      
//        ref1.current!.content = "'changed3"
//        ref1.current!.screen.render()
//          await waitFor(()=>ref1.current! && ref1.current!.getContent().includes('changed3'))
   
//          console.log(ref1.current!.getContent());
         
//          done()
//         //  ref1.current!.press() 
//         //  ref1.current!.screen.render()
//         //    await waitFor(()=>ref1.current! && ref1.current!.getContent().includes('clicked'))
  
// } catch (error) {
//   screen && screen.log(error)
//   tryTo(() => screen.destroy())
//   console.log(error);
  
//   throw error
// }
//       })
// })
// })

// // const opts = () => ({
// //   // keys: true, mouse: true, clickable: true, tags: true, focusable: true, draggable: true, input: true, inputOnFocus: true, keyable: true, vi: true, border: 'line',
// //   // style: {
// //   //   bg: 'gray',
// //   //   fg: 'white'
// //   // }
// // } as BoxOptions)





// })

