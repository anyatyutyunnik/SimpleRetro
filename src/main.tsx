import { allSettled } from 'effector'
import { Provider } from 'effector-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { appStarted, scope } from '@app/shared/config'

async function render() {
  await allSettled(appStarted, { scope })
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider value={scope}>
        <div>Hello yopta</div>
      </Provider>
    </StrictMode>,
  )
}

render()
