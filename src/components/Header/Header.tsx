import { useMemo, useCallback } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearUserInfo } from 'redux/reducers/authSlice'
import { SAVE_STATE } from 'redux/actions'
import { getUser } from 'redux/selectors'
import { useGoogleLogout } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../constants'

import styles from './Header.module.scss'

export const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(getUser)

    const { signOut } = useGoogleLogout({ clientId: GOOGLE_CLIENT_ID })

    const config = useMemo(() => ({ headers: { auth: `Che ${user?.token}` } }), [user?.token])

    const logoutHandler = useCallback(async (e: any) => {
        try {
            e.preventDefault()
            dispatch(clearUserInfo())
            dispatch({ type: SAVE_STATE })
            await signOut()
            history.push('/')
        } catch (e) { toast.error(e) }
    }, [config])

    return (
        <div className={styles.header} data-testid="header">
            <div>
                <h3>Speaking Up</h3>
            </div>
            <div className={styles.nav}>
                <NavLink to="/">Events</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/" onClick={logoutHandler}>Logout</NavLink>
            </div>
        </div>
    )
}
