import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import useRouteElement from './useRouteElement'

import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './contexts/app.context'
import './index.scss'
import { localStorageEventTarget } from './utils/auth'
function App() {
  const routeElements = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)

    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <>
      {routeElements} <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App
