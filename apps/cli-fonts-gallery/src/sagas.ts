import { Saga, Store } from './store';
import { ACTIONS } from "./fontsAction";
import { showInModal } from '../../../dist/src';

export const onFontSelectRenderer: Saga<ACTIONS.FONTS_FONT_SELECTED> = {
 type: ACTIONS.FONTS_FONT_SELECTED,
 listener( a, store){
  dispatchTransform(store)
 } 
}

export const onTextChangeRenderer: Saga<ACTIONS.FONTS_TEXT_CHANGED> = {
  type: ACTIONS.FONTS_TEXT_CHANGED,
  listener(a, store){
   dispatchTransform(store)
  } 
 }

function dispatchTransform(store: Store)  {
  const s = store.getState()
  const font = s.fonts.selected
  const text = s.fonts.text
  figlet.text(text, {
    font,
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, (error, output)=> {
    if (error) {
      store.dispatch({
        type: ACTIONS.FONTS_ERROR,
        error
      })
    }
    else {
      store.dispatch({
        type: ACTIONS.FONTS_SHOW,
        output
      })
    }
})

}
const figlet = require('figlet')