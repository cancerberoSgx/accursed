import { Context } from './context'
import { FSImpl } from './impl/fsImpl'

export function getContext() {
  if (!context) {
    context = { fs: new FSImpl() }
  }
  return context
}
let context: Context
