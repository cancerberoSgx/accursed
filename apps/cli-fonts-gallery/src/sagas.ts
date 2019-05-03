import { Saga } from './store';
import { Store } from "./storeImpl";
import { ACTIONS } from "./fontsAction";
import { appLogger } from './toolPanel/debugTool';

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


export const onFontChangeMetadataExtractor: Saga<ACTIONS.FONTS_FONT_SELECTED> = {
  type: ACTIONS.FONTS_FONT_SELECTED,
  listener(a, store)  {
    const s = store.getState()
    const font = s.fonts.selected
    // const text = s.fonts.text
  
  figlet.metadata(font, function(error, options, headerComment) {
    appLogger(error, options, headerComment)
    if (error) {
      store.dispatch({
        type: ACTIONS.FONTS_ERROR,
        error
      })
    }
    else {
      store.dispatch({
        type: ACTIONS.FONT_METADATA_SHOW,
        options, headerComment
      })
    }
    // console.dir(options);
    // console.log(headerComment);
  })
   /*
   options is something like this

   { hardBlank: '$',
  height: 1,
  baseline: 0,
  maxLength: 9,
  oldLayout: -1,
  numCommentLines: 13,
  printDirection: 0,
  fullLayout: 0,
  codeTagCount: 0,
  fittingRules:
   { vRule5: false,
     vRule4: false,
     vRule3: false,
     vRule2: false,
     vRule1: false,
     hRule6: false,
     hRule5: false,
     hRule4: false,
     hRule3: false,
     hRule2: false,
     hRule1: false,
     hLayout: 0,
     vLayout: 0 } }

   */
 }
}



const figlet = require('figlet')