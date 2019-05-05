import { writeFileSync } from 'fs'
import { fromNow } from 'hrtime-now'
import { array, sleep, tryTo } from 'misc-utils-of-mine-generic'
import { exec } from 'shelljs'
import {
  Column,
  Columns,
  createScreen,
  debug,
  Div,
  Element,
  installExitKeys,
  printElement,
  React,
  Row,
  Rows,
  Screen,
  screenLogger,
  showInModal,
  Box,
  Component,
  Button2,
  ref
} from '../../src'
import { waitFor } from '../../src/blessed/waitFor'
import { randomHex, words } from '../../src/util/data'
import { scrollableOpts, focusableBorderedOpts } from '../../src/util/sharedOptions'
import { number } from '../blessed/gallery/util';

interface Options {
  columns: number
  rows: number
  words: number
  // buttons: number,
  parent?: Element | Screen
}

function getCurrentCommit() {
  return exec('git rev-parse --short HEAD')
    .stdout.toString()
    .trim()
}
function ColumnsWithRowsWithTextNoDepth(options: Options) {
  return (
    <Div {...scrollableOpts()} border="line" label="header1234">
      <Columns parent={options.parent}>
        {array(options.columns).map(i => (
          <Column bg={randomHex()}>
            {' '}
            {randomHex()}
            <Rows>
              {array(options.rows).map(j => (
                <Row bg={randomHex()}>
                  ({i}, {j}):
                  <text content={words(options.words).join(' ')} bg={randomHex()} />
                </Row>
              ))}
              {}
            </Rows>
          </Column>
        ))}
        {}
      </Columns>
    </Div>
  )
}

interface handlersDepthComponentsOptions{
  depth: number,
  componentCount?: number

}



// must render in hidden parent, is only to render the performance of createElement
function handlersDepthComponents(options: handlersDepthComponentsOptions) {

  function h(...args: []){
    return number(1,2)
  }
  class E extends Component {
    render(){
      return <box ref={ref(c=>{})}onKeyPress={h}>D
        hello
        <Button2 ref={ref(c=>{})} onClick={e=>showInModal(this.screen, words().join(' '))}>D</Button2>
        {words(2, 2)}
      </box>
    }
  }
  class D extends Component {
    render(){
      return <box onKeyPress={h} ref={ref(c=>{})} >D
        hello
        <Button2 ref={ref(c=>{})}  onClick={e=>showInModal(this.screen, words().join(' '))}>D</Button2>
        {words(2, 2)}
      </box>
    }
  }
  class C extends Component {
    render(){
      return <box  ref={ref(c=>{})} onChange={()=>{return number()}}>C
        hello
        <Button2  ref={ref(c=>{})}  onClick={e=>showInModal(this.screen, words().join(' '))}>world</Button2>
        {words(2, 2)}
      </box>
    }
  }
  function f(options:handlersDepthComponentsOptions, level=0) {
    return <box  {...{style: {bg: 'ref'}}} ref={ref(c=>{})} >
    width="100%" height="100%" border="line">
    {array(options.depth).map(i=><box  width="100%"height="100%" >
      {array(options.componentCount).map(j=><box  width="100%"height="100%" >
     <box>
       first <C/> hel <D/> aksjd <E/> sd
       {f(options, level+1)}
     </box>
      </box>)}
      </box>)}
    </box>
  };
  return (
    <box width="100%"height="100%">
    {f(options)}
    {/* {array(options.componentCount).map(i=>{ */}

    {/* })} */}
    </box>
  )
}


function nowHash() {
  return Date.now().toString(36)
}

(async()=>{
  await metaMetaTest( {testName: 'columnsRowsNoDepth', data: { columns: 16, rows: 36, words: 1 }, testFunction: ColumnsWithRowsWithTextNoDepth})
  // await metaMetaTest({testName: 'handlersDepthComponents', data: {
  //   depth:  3,
  //   componentCount: 4
  // } ,omitScreenRender: true, testFunction: handlersDepthComponents})
})()





async function metaMetaTest( options: {testName :string, data: any, omitScreenRender?:boolean, testFunction: (...args: any[])=>void}) {
  let screen: Screen
  try {
    const s = []
    const results = []
    screen = await resetScreen(screen)

    const testAndVersion = getCurrentCommit() + '_' + nowHash() +options.testName
    const {log} = screenLogger(screen)
    
    fromNow(
      () => ColumnsWithRowsWithTextNoDepth({ ...options.data, ...{ parent: screen } }),
      (t, hint, ms) => {
        s.push(`createElement_ScreenParent: ${t}`)
        results.push({
          ...options.data,
          ms,
          t,
          name: options.testName + '_' + 'createElement'
        })
      }
    )
    await sleep(100)
    fromNow(
      () => screen.render(),
      (t, hint, ms) => {
        s.push(`screenRender_ScreenParent: ${t}`)
        results.push({
          ...options.data,
          ms,
          t,
          name: options.testName + '_' + 'renderScreen'
        })
      }
    )

    await options.testFunction(options.data, screen, s, results, testAndVersion)

    await sleep(100)
    log(s.join('\n'))
    if(options.omitScreenRender){
      screen.render()

      const label = 'all settled'
      showInModal(screen, label)
      // debug(printElement(screen))
      await sleep(500)
  
      if(!printElement(screen).includes(label )){
        debug('Aborting because cannot find label '+'all settled')
        screen.destroy()
        process.exit(1)
      }
    }

    
    // await waitFor(() => printElement(screen).includes(label )) //, {interval: 444})

    // debug('printElement(screen)1')
    writeFileSync('spec/performance/logs/' + testAndVersion + '.json', JSON.stringify(results, null, 2))
    // debug('printElement(screen)2')

    // screen.emit('key q')
    // await sleep(100)
    // screen.emit('key q')
    // await sleep(200)
    screen.destroy()
    await sleep(500)
  } catch (error) {
    debug(123123)
    debug(+'perf test error', error && error)
    screen.destroy()
    process.exit(1)
  }
}
// async function metaTest(
//   data: { columns: number; rows: number; words: number },
//   screen: Screen,
//   s: any[],
//   results: any[],
//   testName: string
// ) {
 
// }

async function resetScreen(screen: Screen) {
  tryTo(() => screen.destroy())
  await sleep(500)
  screen = createScreen({})
  installExitKeys(screen)
  screen.render()
  return screen
}

// describe('performance', () => {

//   describe('we will change radically some things need to emasure...', () => {
//     let s: Screen
//     beforeEach(() => {
//       tryTo(() => s.destroy())
//       s = createScreen({  })
//       installExitKeys(s)
//     })
//     afterEach(() => {
//       tryTo(() => s.destroy())
//     })

//     it('columns and rows x-y-z with spaced new lines text inside', async done => {

//       function C(props: { children?: any; parent: Screen }) {
//         return (
//           <layout parent={props.parent} layout="grid" width="100%" height="100%">
//             <text content="before1" width={20} height={3} style={{ bg: color() }} border="line" />
//             {props.children}
//             <text content="after2" width={6} height={5} />
//           </layout>
//         )
//       }
//       // log  before1 hello22   button123  bye22 after2
//       // before1 hello22   button123  bye22 after2
//       const e = React.render(
//         <C parent={s}>
//           hello22 <textbox secret={true} content="secret" width={20} height={4} />
//           <button content="button123" width={20} height={4} /> bye22
//         </C>
//       )

//       s.render()
//       const c = getContent(e)
//         // s.log('first', getContent(e, {childrenLast: false}), 'last', getContent(e, {childrenLast: true}))
//       ;['before1', 'after2', 'button123', 'bye22', 'hello22'].forEach(s => {
//         expect(c).toContain(s)
//       })
//       expect(c).not.toContain('secret')
//       done()
//     })

//     it('should print function element children generated with map', async done => {
//       function C(props: { children?: any; parent: Screen }) {
//         s.log(typeof props.children, props.children, props.children && typeof props.children[0])

//         return (
//           <layout parent={props.parent} layout="grid" width="100%" height="100%">
//             <text content="before1" width={20} height={3} style={{ bg: color() }} border="line" />
//             {props.children}
//             <text content="after2" width={6} height={5} />
//           </layout>
//         )
//       }
//       const e = React.render(
//         <C parent={s}>
//           hello22{' '}
//           {[1, 2, 3].map(i => (
//             <text content={`test${i * 2}`} width={5} height={2} />
//           ))}{' '}
//           bye22
//         </C>
//       )
//       s.render()
//       const c = getContent(e)
//         // s.log('first', getContent(e, {childrenLast: false}), 'last', getContent(e, {childrenLast: true}))
//       ;['before1', 'after2', 'test2', 'test4', 'test6', 'bye22', 'hello22'].forEach(s => {
//         expect(c).toContain(s)
//       })
//       expect(c).not.toContain('secret')
//       done()
//     })
//   })
// })
