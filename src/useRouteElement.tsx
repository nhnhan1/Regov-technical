import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import path from './constants/path'
import MainLayout from './layouts/MainLayout'
import Dashboard from 'src/pages/Dashboard'
import Country from './pages/Country'
import Login from './pages/Login'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElement() {
  const routeElements = useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: path.dashboard,
              element: <Dashboard />
            },
            {
              path: path.country,
              element: <Country />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Login />
        }
      ]
    }
  ])
  return routeElements
}
