import { chainAuth, routes } from '@app/shared/router'

const route = chainAuth()(routes.boardList)

export { route }
