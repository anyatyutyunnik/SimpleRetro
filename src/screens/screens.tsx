import { createRoutesView } from 'atomic-router-react'

import { BoardScreen } from './board'
import { BoardListScreen } from './board-list'
import { MainScreen } from './main'
import { SigninScreen } from './signin'

const Screens = createRoutesView({
  routes: [MainScreen, SigninScreen, BoardScreen, BoardListScreen],
})

export { Screens }
