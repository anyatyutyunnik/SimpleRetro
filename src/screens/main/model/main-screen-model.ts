import { chainAuth, routes } from '@app/shared/router'

const route = chainAuth()(routes.main)

export { route }
