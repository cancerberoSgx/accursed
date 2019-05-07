import { execSync } from 'child_process'

export function trimRightLines(s: string) {
  return s.split('\n').map(l => l.trimRight()).join('\n')
}
export function serial<T = any>(p: (() => Promise<T>)[]): Promise<T[]> {
  return new Promise(resolve => {
    p.reduce((promiseChain: any, currentTask: () => Promise<T>) => {
      return promiseChain.then((chainResults: T[]) => currentTask().then(currentResult => [...chainResults, currentResult]))
    }, Promise.resolve([])).then((arrayOfResults: T[]) => {
      resolve(arrayOfResults)
    })
  })
}
export const nextTick = global.setImmediate || process.nextTick.bind(process)
export function nowHash() {
  return Date.now().toString(36)
}
export function formatDate(d: Date) {
  return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDay() + ':' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
}
export function nowFormat() {
  return formatDate(new Date())
}
export function getCurrentCommit() {
  return execSync('git rev-parse --short HEAD')
    .toString()
    .trim()
}

export function inBrowser() {
  // @ts-ignore
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}
export function nonEnumerableMember(o: any, name: string) {
  Object.defineProperty(o, name, {
    enumerable: false,
    writable: true
  })
}

export type RemoveProperties<O, K extends keyof O> = Pick<O, Exclude<keyof O, K>>