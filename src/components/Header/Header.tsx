import { useMemo, useCallback } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearUserInfo } from 'redux/reducers/authSlice'
import { SAVE_STATE } from 'redux/actions'
import { getUser } from 'redux/selectors'

import styles from './Header.module.scss'

export const Header = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(getUser)

    const config = useMemo(() => ({ headers: { auth: `Che ${user?.token}` } }), [user?.token])

    const logoutHandler = useCallback(async (e: any) => {
        try {
            e.preventDefault()
            dispatch(clearUserInfo())
            dispatch({ type: SAVE_STATE })
            history.push('/')
        } catch (e) { toast.error(e) }
    }, [config])

    return (
        <div className={styles.header} data-testid="header">
            <div className={styles.logo}>
                {!!user?.avatarUrl && (
                    <div className={styles.imageWrap}>
                        <img src={user?.avatarUrl} alt="avatar" data-testid="avatar" />  
                    </div>
                )}
                <p>{user?.name}</p>
            </div>
            <div className={styles.nav}>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink to="/" onClick={logoutHandler}>Logout</NavLink>
            </div>
        </div>
    )
}
