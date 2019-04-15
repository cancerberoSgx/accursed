import { createStore } from '../src/store/store'
import { buildCodeAst } from '../src/ui/codeView'
try {
  var store = createStore()
  buildCodeAst(store)
  store.state.screen.render()
} catch (error) {
  console.log(error)
}
