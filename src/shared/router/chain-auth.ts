import {
  type RouteInstance,
  type RouteParams,
  type RouteParamsAndQuery,
  chainRoute,
} from 'atomic-router'
import { createEvent, sample } from 'effector'

import { userUpdated } from '@app/shared/session'
import { urls } from '@app/shared/urls'

import { router, routes } from './router'

export function chainAuth<Params extends RouteParams>() {
  return (route: RouteInstance<Params>) => {
    const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>()

    const isAuthenticated = sample({
      clock: [sessionCheckStarted, userUpdated],
      filter: (user) => user !== null,
    })

    return chainRoute({
      route,
      beforeOpen: sessionCheckStarted,
      openOn: isAuthenticated,
    })
  }
}

sample({
  clock: sample({
    clock: userUpdated,
    filter: (user) => user === null,
  }),
  source: router.$path,
  filter: (path) => path !== urls.getSigninUrl().pathname,
  target: routes.signin.navigate.prepend<string>((path) => ({
    params: {},
    query: { retpath: path },
    replace: true,
  })),
})
