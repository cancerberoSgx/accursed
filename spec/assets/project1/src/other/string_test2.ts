const chalk = null as any
const _ = null as any

const a = 'a' + 2 + 'b' + 'c' + `${Math.PI}`

const b = `${a} b c ${Math.PI} g ${function() {
  return 1
}.toString()}`

/**
 * Adapted from inquirer sources. The paginator keeps track of a pointer index in a list and returns* a subset of the choices if the list is too long.
 */
export class AbstractPaginator {
  pointer: number
  lastIndex: number
  screen: any
  constructor(screen?: any) {
    this.pointer = 0
    this.lastIndex = 0
    this.screen = screen
  }
  paginate(output: string, active: number, pageSize: number | undefined) {
    pageSize = pageSize || 7
    var active_: string[]
    const middleOfList = Math.floor(pageSize / 2)
    let lines = output.split('\n')
    if (this.screen) {
      lines = this.screen.breakLines(lines)
      active_ = lines.splice(0, active)
      lines = _.flatten(lines)
    }
    // Make sure there's enough lines to paginate
    if (lines.length <= pageSize) {
      return output
    }
    // Move the pointer only when the user go down and limit it to the middle of the list
    if (this.pointer < middleOfList && this.lastIndex < active && active - this.lastIndex < pageSize) {
      this.pointer = Math.min(middleOfList, this.pointer + active - this.lastIndex)
    }
    this.lastIndex = active
    // Duplicate the lines so it give an infinite list look
    const section = ['\n', ...lines].splice(active, pageSize).join('\n')
    return (
      section +
      '\n' +
      chalk.dim('(Navigate Nodes using arrows, type tsquery selectors to filter, enter for selecting node)')
    )
  }
}

export const nodeKinds = [
  'NumericLiteral',
  'BigIntLiteral',
  'StringLiteral',
  'JsxText',
  'ModuleKeyword',
  'NamespaceKeyword',
  'NeverKeyword',
  'ReadonlyKeyword',
  'RequireKeyword',
  'NumberKeyword',
  'ObjectKeyword',
  'SetKeyword',
  'StringKeyword',
  'SymbolKeyword',
  'TypeKeyword',
  'UndefinedKeyword',
  'UniqueKeyword',
  'UnknownKeyword',
  'FromKeyword',
  'GlobalKeyword',
  'BigIntKeyword',
  'OfKeyword'
]
