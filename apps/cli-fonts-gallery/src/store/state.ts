let state
export interface State {
  fonts: {
    selected: string
    text: string
    output?: string
    error?: Error
  }
}
