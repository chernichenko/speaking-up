import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import cn from 'classnames'
import { getUser } from 'redux/selectors'

import styles from './Tabs.module.scss'

const Tabs = () => {
  const user = useSelector(getUser)
  const location = useLocation()

    return (
    <div className={styles.top}>
      <h1>Hey there, {user.name}</h1>
      <div className={styles.tabs}>
          <NavLink to="/" className={cn(styles.tab, location.pathname === '/' && styles.active)}>Your current week</NavLink>
          <NavLink to="/calendar" className={cn(styles.tab, location.pathname === '/calendar' && styles.active)}>Your availability</NavLink>
      </div>
    </div>
  )
}

export default Tabs
