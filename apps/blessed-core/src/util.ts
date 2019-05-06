import { ProgramDocument, ProgramElement, ElementPropsImpl } from './programDom';
import { exec, execSync } from 'child_process';
import { Program } from './declarations/program';
import { Node } from './dom';

export function trimRightLines(s: string) {
  return s.split('\n').map(l => l.trimRight()).join('\n')
}

export function createElement(doc: ProgramDocument, tagName: string, parent?: ProgramElement, props: Partial<ElementPropsImpl> = {}, children?:  Node[]) {
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

export const nextTick = global.setImmediate || process.nextTick.bind(process)

export function nowHash() {
  return Date.now().toString(36)
}

export function formatDate(d: Date) {
  return d.getFullYear()+'-'+d.getMonth()+'-'+d.getDay()+':'+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()
}

export function nowFormat(){
  return formatDate(new Date())
}

export function getCurrentCommit() {
  return execSync('git rev-parse --short HEAD')
   .toString()
    .trim()
}

export function getPerformanceFileName(label: string) {
  return nowFormat().replace(/:/g, '_') + '_'+getCurrentCommit()+'_'+label+'.json'
}


export function destroyProgramAndExit(program: Program, status=0) {
  destroyProgram(program)
  process.exit(status);
}

export function destroyProgram(program: Program) {
  program.showCursor();
  program.disableMouse();
  program.normalBuffer();
  program.reset();
  program.destroy();
}

export function installExitKeys(program: Program ) {

program.key(['q', 'escape', 'C-c'], function () {
  destroyProgramAndExit(program)
})


}
