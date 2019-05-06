import { writeFileSync } from 'fs'
import { Program, ProgramDocument, ProgramDocumentRenderer } from '../src'
import { createElement, destroyProgram, destroyProgramAndExit, getPerformanceFileName, nextTick } from '../src/util'
import { number } from './data'

async function main() {
  let renderer: ProgramDocumentRenderer
  let data: any[] = []
  let result: any

  // renderer =;
  result = await test(new ProgramDocumentRenderer({ program: new Program({ buffer: true }), debug: false }),'buffer_true-debug_false')
  data.push({ label: 'buffer_true-debug_false', result })

  // renderer = new ProgramDocumentRenderer({ program: new Program({ buffer: false }), debug: false });
  result = await test(new ProgramDocumentRenderer({ program: new Program({ buffer: false }), debug: false }),'buffer_false-debug_false')
  data.push({ label: 'buffer_false-debug_false', result })

// var differ = require('ansi-diff-stream')
// var diff = differ()
// // diff.pipe(process.stdout)
// diff.on('data', c=>process.stdout.write(c))
//   // renderer = new ProgramDocumentRenderer({ program: new Program({ buffer: false }), debug: false });
//   result = await test(new ProgramDocumentRenderer({ program: new Program({ buffer: false, input: diff }), debug: false }),'buffer_false-debug_false-diff_true' )
//   data.push({label: 'buffer_false-debug_false-diff_true', result});

  // await test(renderer, 'buffer_false-debug_false');
  // renderer = new ProgramDocumentRenderer({ program: new Program({ buffer: true }), debug: true });
  // await test(renderer, 'buffer_true-debug_true');
  result = await test(new ProgramDocumentRenderer({ program: new Program({ buffer: true }), debug: true }),'buffer_true-debug_true')
  data.push({ label: 'buffer_true-debug_true', result })

  renderer = new ProgramDocumentRenderer({ program: new Program({ buffer: false }), debug: true })
  // await test(renderer, 'buffer_false-debug_true');
  result = await test(renderer,'buffer_false-debug_true')
  data.push({ label: 'buffer_false-debug_true', result })

  // const result = {label: testLabel, fps}
  const f = getPerformanceFileName('renderElement01')
  writeFileSync('spec/performance-logs/' + f, JSON.stringify(data, null, 2))

  destroyProgramAndExit(renderer.program)
}

// (async ()=>{
//
main()
// })()

function test(renderer: ProgramDocumentRenderer, testLabel: string) {
  return new Promise(resolve => {
    const fps: any[] = []
    let finish = false
    const program = renderer.program
    setTimeout(() => {
      destroyProgram(program)
      // fps.length=0
      clearInterval(timer)
      finish = true
      resolve(fps.slice())
    }, 5100)

    program.reset()
    const doc = new ProgramDocument()
    const el = createElement(doc, 'Div', doc.body, { bg: 'red', fg: 'blue', left: 4, top: 2, height: 16, width: 24, ch: '_' })
    createElement(doc, 'Span', el, { bg: 'green', fg: 'black', left: 4, top: 2, height: 12, width: 19, ch: 'O' }, [
      createElement(doc, 'Ul', undefined, { bg: 'blue', fg: 'white', left: 5, top: 3, height: 6, width: 11, ch: 'w' })
    ])
    renderer.renderElement(el)
    const T = 0
    let counter = 0
    function draw() {
      renderer.eraseElement(el)
      el.props.width = number(24, 44)
      el.props.height = number(16, 30)
      el.props.left = number(2, program.cols - el.props.width - 3)
      el.props.top = number(2, program.rows - el.props.height - 3)
      !finish && nextTick(() => {
        renderer.renderElement(el)
        counter++
        setTimeout(draw, T)
      })
    }
    const timer = setInterval(() => {
      // renderer.write(0, 0, counter + ' fps');
      fps.push(counter)
      counter = 0
    }, 1000)
    draw()
  })

}
