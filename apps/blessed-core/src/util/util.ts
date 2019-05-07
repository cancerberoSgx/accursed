import { ProgramDocument, ProgramDocumentRenderer, ProgramElement } from '..'
import { Program, ProgramOptions } from '../declarations/program'
import { Node } from '../dom'
import { Flor } from '../jsx/createElement'
import { ElementProps, FullProps, isElement } from '../programDom'
import { getCurrentCommit, nowFormat } from './misc'
import { tryTo } from 'misc-utils-of-mine-generic';

export function getPerformanceFileName(label: string) {
  return nowFormat().replace(/:/g, '_') + '_' + getCurrentCommit() + '_' + label + '.json'
}

export function destroyProgramAndExit(program: Program, status = 0) {
  destroyProgram(program)
  process.exit(status)
}

// export function cursorReset(program: Program){
//   this.cursor.shape = 'block';
//   this.cursor.blink = false;
//   this.cursor.color = null;
//   this.cursor._set = false;
// }
export function destroyProgram(program: Program) {


  if (!program.isAlt) return;
  program.put.keypad_local();
  // if (program.scrollTop !== 0
  //     || program.rows - 1) {
  //   program.csr(0, height - 1);
  // }
  tryTo(()=> program.disableMouse())
  // XXX For some reason if alloc/clear() is before this
  // line, it doesn't work on linux console.
  // program.showCursor();
  // alloc();
  // if (_listenedMouse) {
  //   program.disableMouse();
  // }
  program.normalBuffer();
  // if (cursor._set) cursorReset();
  // tryTo(()=>cursorReset())
  program.cursorReset();

  program.flush();
  if (process.platform === 'win32') {
    tryTo(()=>require('child_process').execSync('cls', { stdio: 'ignore', timeout: 1000 }))
  }

  program.resetCursor()
  program.showCursor()
  program.disableMouse()
  program.normalBuffer()
  program.sgr0()
  program.reset()
  program.clear()

  program.destroy()
}
const defaultProgramOptions = { buffer: true }
export function installExitKeys(program: Program) {
  program.key(['q', 'escape', 'C-c'], function() {
    destroyProgramAndExit(program)
  })

}
export function createProgramRendererDocument(programOptions: ProgramOptions = defaultProgramOptions) {
  const document = new ProgramDocument()
  Flor.setDocument(document)
  const program = createProgram(programOptions)
  program.reset()
  const renderer = new ProgramDocumentRenderer({ program})
  return { renderer, document, program }
}

export function createProgram(programOptions: ProgramOptions&{installDefaultExitKeys?: boolean}= { ...defaultProgramOptions, installDefaultExitKeys: true}) {
  const p =  new Program(programOptions);
  programOptions.installDefaultExitKeys && installExitKeys(p)
  return p

}

export function createProgramRendererDocumentAndElement(programOptions: ProgramOptions = defaultProgramOptions, props?: FullProps) {
  const document = new ProgramDocument()
  Flor.setDocument(document)
  const program = new Program(programOptions)
  installExitKeys(program)
  program.reset()
  const renderer = new ProgramDocumentRenderer({ program})
  const el = document.create({ top: 0, left: 0, width: program.cols - 1, height: program.rows - 1, fg: 'black', bg: 'green', border: true,  ...props || {} })
  return { renderer, document, program, el }
}

export function createElement(doc: ProgramDocument, tagName: string | Partial<FullProps>, parent?: ProgramElement, props: Partial<ElementProps> = {}, children?: Node[]) {
  if (typeof tagName !== 'string') {
    let opts = tagName
    tagName = opts.tagName || 'box'
    parent = opts.parent
    props = { ...opts, parent: undefined, children: undefined, tagName: undefined } as any
    children = (opts.children || []).map(c => {
      if (typeof c === 'string') {
        return doc.createTextNode(c)
      } else if (isElement(c)) {
        return c
      } else {
        return createElement(doc, c)
      }
    })
  }
  const el = doc.createElement(tagName)
  // doc.appendChild(el)
  Object.assign(el.props, props)
  if (parent) {
    parent.appendChild(el)
  }
  if (children) {
    children.forEach(c => {
      el.appendChild(c)
    })
  }
  return el
}
