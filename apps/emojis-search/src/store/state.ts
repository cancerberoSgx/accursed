import { Screen } from 'accursed';
import { MainView } from './uiActions';

export interface State {
  onlyEmojis: boolean
  currentView: MainView
  categoriesView: {
    compact: boolean
    categoryIndex: number
  }
  searchView: {
    compact: boolean
    query: string
  },
  screen: Screen
}



