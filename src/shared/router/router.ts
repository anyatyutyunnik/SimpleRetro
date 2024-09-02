import { createHistoryRouter, createRoute } from 'atomic-router'
import { createBrowserHistory } from 'history'

import { urls } from '@app/shared/urls'

const history = createBrowserHistory()

const routes = {
  signin: createRoute(),
  board: createRoute(),
  boardList: createRoute(),
}

const router = createHistoryRouter({
  routes: [
    { path: urls.getSigninUrl().pathname, route: routes.signin },
    { path: urls.getBoardUrl().pathname, route: routes.board },
    { path: urls.getBoardListUrl().pathname, route: routes.boardList },
  ],
})

export { history, routes, router }
