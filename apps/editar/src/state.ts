
export interface Document {
  /** basename */
  name: string
  /** absolute path */
  path: string
}

export interface State{
  search: Search;
  /** opened docs */
  documents: Document[]
  cwd: string 
}
export interface Search {
  caseSensitive?: boolean
}