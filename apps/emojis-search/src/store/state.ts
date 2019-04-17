import { Screen } from 'accursed';
import { MainView } from './uiActions';
import { EmojiDefinition } from '../data/data';

export interface State {
  onlyEmojis: boolean
  currentView: MainView
  categoriesView: {
    compact: boolean
    selectedCategory?: string
  }
  searchView: {
    compact: boolean
    query: string
    results?: EmojiDefinition[]
  },
  screen: Screen
}



