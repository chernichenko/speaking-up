import { Redirect } from 'react-router-dom'
import {
  Login,
  Registration,
  ChangePassword,
  ChangePasswordSuccess,
  Main,
  Profile,
  EmailConfirm,
} from 'components'
import { MainLayout } from 'layouts'

export const publicRoutes = [
  {
    path: '/',
    exact: true,
    component: Login,
  },
  {
    path: '/registration',
    component: Registration,
  },
  {
    path: '/password',
    exact: true,
    component: ChangePassword,
  },
  {
    path: '/password/:token',
    component: ChangePasswordSuccess,
  },
  {
    path: '/email-confirm',
    component: EmailConfirm,
  },
  {
    component: () => <Redirect to="/" />,
  },
]

export const privateRoutes = [
  {
    path: '/',
    exact: true,
    component: Main,
    layout: MainLayout,
  },
  {
    path: '/dialog/:userToId',
    exact: true,
    component: Main,
    layout: MainLayout,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    component: () => <Redirect to="/" />,
  },
]
