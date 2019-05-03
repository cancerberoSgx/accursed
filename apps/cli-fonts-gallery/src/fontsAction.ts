import { Action } from './store';
import { State } from "./state";
// implementations 
let fontsAction;
export enum ACTIONS {
  FONTS_SHOW = 'FONTS_SHOW',
  FONTS_FONT_SELECTED = 'FONTS_FONT_SELECTED',
  FONTS_ERROR = "FONTS_ERROR",
  FONTS_TEXT_CHANGED = 'FONTS_TEXT_CHANGED',
  FONT_METADATA_SHOW = "FONTS_SHOW_FONT_METADATA"
}
export interface FontSelectedAction extends Action<ACTIONS.FONTS_FONT_SELECTED> {
  type: ACTIONS.FONTS_FONT_SELECTED;
  font: string;
}
export interface TextChangeAction extends Action<ACTIONS.FONTS_TEXT_CHANGED> {
  type: ACTIONS.FONTS_TEXT_CHANGED;
  text: string;
}
export interface FontsShowAction extends Action<ACTIONS.FONTS_SHOW> {
  type: ACTIONS.FONTS_SHOW;
  output: string;
}
export interface FontsErrorAction extends Action<ACTIONS.FONTS_ERROR> {
  type: ACTIONS.FONTS_ERROR;
  error: any;
}

export interface FontsMetadataShowAction extends Action<ACTIONS.FONT_METADATA_SHOW> {
  type: ACTIONS.FONT_METADATA_SHOW;

  options: any
  headerComment: any
}

export const fontShow = {
  type: ACTIONS.FONTS_SHOW,
  reduce(s: State, a: FontsShowAction) {
    return { ...s, fonts: { ...s.fonts, output: a.output } };
  }
}


export const fontSelected = {
  type: ACTIONS.FONTS_FONT_SELECTED,
  reduce(s: State, a: FontSelectedAction) {
    return { ...s, fonts: { ...s.fonts, selected: a.font } };
  }
}


export const textChange = {
  type: ACTIONS.FONTS_TEXT_CHANGED,
  reduce(s: State, a: TextChangeAction) {
    return { ...s, fonts: { ...s.fonts, text: a.text } };
  }
  
}


export const fontMetadataShow = {
  type: ACTIONS.FONT_METADATA_SHOW,
  reduce(s: State, a: TextChangeAction) {
    return { ...s, fonts: { ...s.fonts, text: a.text } };
  }
  
}
