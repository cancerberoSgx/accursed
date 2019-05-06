import { ProgramDocument, ProgramDocumentRenderer, ProgramElement } from '..'
import { Program, ProgramOptions } from '../declarations/program'
import { Node } from '../dom'
import { React } from '../jsx/createElement'
import { ElementProps, FullProps, isElement } from '../programDom'
import { getCurrentCommit, nowFormat } from './misc'

export function getPerformanceFileName(label: string) {
  return nowFormat().replace(/:/g, '_') + '_' + getCurrentCommit() + '_' + label + '.json'
}

export function destroyProgramAndExit(program: Program, status = 0) {
  destroyProgram(program)
  process.exit(status)
}

export function destroyProgram(program: Program) {
  program.showCursor()
  program.disableMouse()
  program.normalBuffer()
  program.reset()
  program.destroy()
}

export function installExitKeys(program: Program) {
  program.key(['q', 'escape', 'C-c'], function () {
    destroyProgramAndExit(program)
  })

}
export function createProgramRendererDocument(programOptions: ProgramOptions = { buffer: true }) {
  const document = new ProgramDocument()
  React.setDocument(document)
  const program = new Program(programOptions)
  installExitKeys(program)
  program.reset()
  const renderer = new ProgramDocumentRenderer({ program, debug: true })
  return { renderer, document, program }
}

export function createElement(doc: ProgramDocument, tagName: string | FullProps, parent?: ProgramElement, props: Partial<ElementProps> = {}, children?: Node[]) {
  if (typeof tagName !== 'string') {
    let opts = tagName
    tagName = opts.tagName || 'box'
    parent = opts.parent
    props = { ...opts, parent: undefined, children: undefined, tagName: undefined } as any
    children = (opts.children || []).map(c => {
      if (typeof c === 'string') {
        return doc.createTextNode(c)
      }
      else if (isElement(c)) {
        return c
      }
      else {
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

