import { Program, ProgramOptions } from '../declarations/program'
import { Node } from '../dom'
import { React } from '../jsx/createElement'
import { ElementPropsImpl, ProgramDocument, ProgramDocumentRenderer, ProgramElement } from '..'
import { nowFormat, getCurrentCommit } from './misc';

export function getPerformanceFileName(label: string) {
  return nowFormat().replace(/:/g, '_') + '_' + getCurrentCommit() + '_' + label + '.json'
}

let program
export function destroyProgramAndExit(program: Program, status= 0) {
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
  program.key(['q', 'escape', 'C-c'], function() {
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

export function createElement(doc: ProgramDocument, tagName: string, parent?: ProgramElement, props: Partial<ElementPropsImpl> = {}, children?: Node[]) {
  const el = doc.createElement(tagName)
  doc.appendChild(el)
  Object.assign(el.props, props)
  if (parent) {
    parent.appendChild(el)
  }
  if (children) {
    children.forEach(c => el.appendChild(c))
  }
  return el
}
