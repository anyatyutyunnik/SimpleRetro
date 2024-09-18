import { createHistoryRouter, createRoute } from 'atomic-router'
import { attach, createEvent, sample } from 'effector'
import { createBrowserHistory } from 'history'

import { urls } from '@app/shared/urls'

const history = createBrowserHistory()

const routes = {
  signin: createRoute(),
  board: createRoute(),
  boardList: createRoute(),
  main: createRoute(),
}

const router = createHistoryRouter({
  routes: [
    { path: urls.getMainUrl().pathname, route: routes.main },
    { path: urls.getSigninUrl().pathname, route: routes.signin },
    { path: urls.getBoardUrl().pathname, route: routes.board },
    { path: urls.getBoardListUrl().pathname, route: routes.boardList },
  ],
})

const redirect = createEvent<string>()

const redirectFx = attach({
  source: router.$history,
  effect: (history, url: string) => {
    history.replace(url)
  },
})

sample({
  clock: redirect,
  target: redirectFx,
})

export { history, routes, router, redirect }
