const ansi = require('ansi-escape-sequences')
import * as blessed from 'blessed'
import Project from 'ts-morph'
import { GeneralNode, getGeneralNodeChildren, isDirectory } from 'ts-simple-ast-extra'
import { Style } from '../blessed/blessedTypes'
import { resetFocusManager } from '../blessed/focus'
import { State } from '../store/state'
import { Store } from '../store/store'
import { buildCodeView } from '../ui/codeView'
import { buildFileView } from '../ui/projectView'
import { getGeneralNodeKindName, getGeneralNodeName } from './project'

export function buildTreeNode(n: GeneralNode) {
  const children: any = {}
  let counter = 0
  getGeneralNodeChildren(n).forEach(c => {
    const name =
      getGeneralNodeKindName(c) +
      (getGeneralNodeName(c)
        ? ` (${ansi.format(getGeneralNodeName(c), ['red', 'underline']) + (isDirectory(c) ? '/' : '')})`
        : '')
    children[children[name] ? name + ` (${counter++})` : name] = buildTreeNode(c)
  })
  return {
    children,
    astNode: n
  }
}

export const focusStyle: Style = {
  border: {
    type: 'line',
    fg: 'red'
  }
}

export const scrollableOptions = {
  scrollable: true,
  clickable: true,
  keys: true,
  focusable: true,
  mouse: true,
  scrollbar: {
    style: {
      inverse: true
    }
  }
}

export const buttonStyle = {
  item: {
    bg: 'black',
    hover: {
      bg: 'yellow'
    },
    focus: {
      bg: 'cyan'
    }
  },
  selected: {
    bg: 'blue'
  }
}

export function createInitialState(): State {
  var screen = blessed.screen({
    smartCSR: true
  })
  const project = new Project({ tsConfigFilePath: './tsconfig.json', addFilesFromTsConfig: true })
  return {
    project,
    screen,
    // TODO: we are building the two UIs only showing 1
    fileView: buildFileView(screen),
    codeView: buildCodeView(screen)
  }
}

/**
 * it will create a new screen , destroy the current one and regenerate everything, with the exception of the Project
 */
export function resetScreen(store: Store) {
  resetFocusManager()
  store.state.screen.clearRegion(
    0,
    parseInt(store.state.screen.width + ''),
    0,
    parseInt(store.state.screen.height + '')
  )
  store.state.screen.render()
  store.state.screen.destroy()
  var screen = blessed.screen({ smartCSR: true })
  Object.assign(store.state, {
    ...store.state,
    screen,
    fileView: {
      ...store.state.fileView,
      ...buildFileView(screen)
    },
    codeView: { ...store.state.codeView, ...buildCodeView(screen) }
  })
}
