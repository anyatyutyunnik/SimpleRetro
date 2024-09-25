import { RouterProvider } from 'atomic-router-react'
import { allSettled } from 'effector';
import { Provider } from 'effector-react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Screens } from '@app/screens'
import { appStarted, scope } from '@app/shared/config'
import '@app/shared/firebase'
import { history, router } from '@app/shared/router'
import '@app/shared/session'

async function render() {
  await allSettled(appStarted, { scope })
  await allSettled(router.setHistory, { scope, params: history })
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Provider value={scope}>
        <RouterProvider router={router}>
          <Screens />
        </RouterProvider>
      </Provider>
    </StrictMode>,
  )
}

render()
