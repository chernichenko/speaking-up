import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getEvents } from 'redux/selectors'

import styles from './Events.module.scss'
import { removeEvent } from 'redux/reducers/eventsSlice'
import Tabs from 'components/Tabs/Tabs'

export const Events = () => {
    const dispatch = useDispatch()
    const events = useSelector(getEvents)

    return (
        <div className={styles.wrap}>
            <Tabs />
            {events?.length ? (
                <div className={styles.eventsWrap}>
                    {events.map((event) => {
                        return (
                            <div className={styles.event} key={event.id}>
                                <div className={styles.column1}>
                                    <div className={styles.time}>
                                        {`${event.day} ${event.timeFrom} - ${event.timeTo}`}
                                    </div>
                                    <div className={styles.name}>
                                        {`with ${event.user.name}`}
                                    </div>
                                </div>
                                <div className={styles.column2}>
                                    <NavLink to="/profile" className={styles.button}>Join</NavLink>
                                    <div className={styles.button} onClick={() => {
                                        dispatch(removeEvent(event.id))
                                        // dispatch({ type: SAVE_STATE })
                                    }}>Delete</div>
                                    <div className={styles.avatar}></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : null}
        </div>
    )
}
