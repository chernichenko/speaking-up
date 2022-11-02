import { Redirect } from 'react-router-dom'
import {
  Login,
  Registration,
  Profile,
  EmailConfirm,
  Events,
  Calendar,
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
    component: Events,
    layout: MainLayout,
  },
  {
    path: '/profile',
    exact: true,
    component: Profile,
    layout: MainLayout,
  },
  {
    path: '/events',
    exact: true,
    component: Events,
    layout: MainLayout,
  },
  {
    path: '/calendar',
    exact: true,
    component: Calendar,
    layout: MainLayout,
  },
  {
    component: () => <Redirect to="/" />,
  },
]
