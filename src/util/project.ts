import { getRelativePath } from 'misc-utils-of-mine-generic'
import Project, { Node, TypeGuards } from 'ts-morph'
import {
  buildAstPath,
  File,
  GeneralNode,
  getChildrenForEachChild,
  isDirectory,
  isSourceFile,
  printAstPath
} from 'ts-simple-ast-extra'

export function getGeneralNodeKindName(c: GeneralNode) {
  return isDirectory(c) ? 'Directory' : c.getKindName()
}

export function getGeneralNodeName(c: GeneralNode) {
  try {
    return isDirectory(c) ? c.getBaseName() : isSourceFile(c) ? c.getBaseName() : c ? getName(c) : ''
  } catch (error) {
    console.log(error)
    return ''
  }
}

/**
 *  Try to call n.getName or returns empty string if there is no such method
 */
export function getName(n: Node) {
  try {
    return TypeGuards.hasName(n) ? n.getName() : TypeGuards.isIdentifier(n) ? n.getText() : undefined
  } catch (error) {
    return undefined
  }
}
/**
 * Returns immediate children. In case of Nodes, children are obtained using forEachChild instead of getChildren method
 */
export function getGeneralNodeChildren(f: GeneralNode, project: Project): GeneralNode[] {
  return isDirectory(f)
    ? (f.getDirectories().filter(d => project.getDirectory(d.getPath())) as GeneralNode[]).concat(
        f.getSourceFiles() as GeneralNode[]
      )
    : getChildrenForEachChild(f)
}
/**
 * Directories and SourceFile path is given by getPath* methods. For nodes we use AstPath for defining their path.
 */
export function getGeneralNodePath(f: GeneralNode, relativeTo?: string, includeNodeKind = false): string | undefined {
  if (isDirectory(f) || isSourceFile(f)) {
    return relativeTo ? getRelativePath(relativeTo, getFilePath(f)) : getFilePath(f)
  } else {
    const file = f.getSourceFile()
    const s = buildAstPath(f, file, { includeNodeKind })
    let nodePath = printAstPath(s)
    nodePath = nodePath.startsWith('SourceFile>') ? nodePath.substring('SourceFile>'.length) : nodePath
    const path = `${getGeneralNodePath(file, relativeTo, includeNodeKind)}#${nodePath}`
    return path
  }
}

export function getFilePath(f: File) {
  return isSourceFile(f) ? f.getFilePath() : f.getPath()
}
