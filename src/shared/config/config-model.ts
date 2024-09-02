import { createEvent, fork } from 'effector'

const scope = fork()
const appStarted = createEvent()

export { scope, appStarted }
