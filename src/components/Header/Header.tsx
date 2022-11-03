import { useCallback, useState, useRef } from 'react'
import { useHistory, NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { clearUserInfo } from 'redux/reducers/authSlice'
import { SAVE_STATE } from 'redux/actions'
import { useGoogleLogout } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../constants'
import useOnClickOutside from '../../hooks/useOutsideClick'

import styles from './Header.module.scss'

export const Header = () => {
    const dropdown = useRef<any>()
    const history = useHistory()
    const dispatch = useDispatch()
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useOnClickOutside(dropdown, () => setIsDropdownOpen(false))

    const { signOut } = useGoogleLogout({ clientId: GOOGLE_CLIENT_ID })

    const logoutHandler = useCallback(async (e: any) => {
        try {
            e.preventDefault()
            dispatch(clearUserInfo())
            dispatch({ type: SAVE_STATE })
            await signOut()
            history.push('/')
        } catch (e) { toast.error(e) }
    }, [])

    return (
        <div className={styles.header} data-testid="header">
            <div>
                <h3><strong>Speaking Up</strong></h3>
            </div>
            <div className={styles.nav}>
                <NavLink to="/">Join Discord</NavLink>
                <NavLink to="/send-feedback">Send Feedback</NavLink>
                <NavLink to="/"><span>*</span>Get Extension</NavLink>
                <div onClick={() => setIsDropdownOpen(true)} className={styles.avatar} ref={dropdown}>
                    <div className={styles.circle} />
                    {isDropdownOpen && (
                        <div className={styles.dropdown}>
                            <NavLink to="/profile">Profile</NavLink>
                            <NavLink to="/" onClick={logoutHandler}>Logout</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
