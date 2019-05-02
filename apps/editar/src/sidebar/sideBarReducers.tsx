import { basename, join, resolve } from 'path'
import { ls, test } from 'shelljs'
import { initialState } from '../store/generalReducer'
import { State } from '../store/state'
import { OpenFilesAction, SetCwdAction } from './sidebarActions'

export function setCwd(s: State = initialState, a: SetCwdAction) {
  return { ...s, cwd: a.cwd, cwdRootFiles: listDirectoryAsNodes(a.cwd) }
}

export function openFiles(s: State = initialState, a: OpenFilesAction) {
  return {
    ...s,
    documents: [
      ...s.documents,
      ...a.paths.filter(p => !s.documents.find(d => d.path === p)).map(p => ({ path: p, name: basename(p) }))
    ]
  }
}

export function listDirectoryAsNodes(cwd: string) {

  //TODO: we must use fs.ls, etc...
  return ls(cwd).map(p => {
    const isDirectory = test('-d', resolve(join(cwd, p)))
    return {
      filePath: resolve(join(cwd, p)),
      children: [],
      name: p,
      isDirectory,
      expanded: false,
      expandedPrefix: isDirectory ? '📂' : '📄',
      collapsedPrefix: isDirectory ? '📁' : '📄'
    }
  })
  // return await Promise.all((await fs.ls(cwd)).map(async p => {
  //   const isDirectory = await fs.isDirectory(p)
  //   return {
  //     filePath: p, 
  //     children: [],
  //     name: p,
  //     isDirectory,
  //     expanded: false, 
  //     expandedPrefix: isDirectory ? '📂' : '📄',
  //     collapsedPrefix: isDirectory ? '📁' : '📄'
  //   }
  // }))
}
