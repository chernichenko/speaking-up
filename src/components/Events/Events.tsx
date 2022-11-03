import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from 'redux/selectors'
import { removeEvent } from 'redux/reducers/eventsSlice'
import Tabs from 'components/Tabs/Tabs'
import cn from 'classnames'

import styles from './Events.module.scss'

const IconLoading = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4.02283V15.4514" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9.14282 15.4514L17.5543 23.1771" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M4.57141 40.5943L15.6343 36.48" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20.0686 59.9771L25.1429 49.7371" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M54.8571 15.4514L46.4457 23.1771" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M59.4286 40.5943L48.3657 36.48" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M43.9315 59.9771L38.8572 49.7371" stroke="black" stroke-opacity="0.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export const Events = () => {
    const dispatch = useDispatch()
    const events = useSelector(getEvents)
    const [isFindingNewMeeting, setIsFindingNewMeeting] = useState(false)

    return (
        <div className={styles.wrap}>
            <Tabs />
            {events?.length ? (
                <div className={styles.eventsWrap}>
                    {events.map((event) => {
                        return (
                            <div className={styles.event} key={event.id}>
                                <div className={styles.column1}>
                                    <div className={styles.column1Inner}>
                                        <div className={styles.avatar} />
                                        <div className={styles.innerWrap}>
                                            <div className={styles.date}>{event.day}</div>
                                            <div className={styles.name}>{event.user.name}</div>
                                        </div>
                                    </div>
                                    <div className={styles.time}>
                                        {`${event.timeFrom} - ${event.timeTo}`}
                                    </div>
                                </div>
                                <div className={styles.column2}>
                                    <div className={styles.primary}>Join with Google Meet</div>
                                    <div className={styles.button} onClick={() => {
                                        dispatch(removeEvent(event.id))
                                        // dispatch({ type: SAVE_STATE })
                                    }}>Delete</div>
                                </div>
                            </div>
                        )
                    })}
                    {isFindingNewMeeting && (
                        <div className={cn(styles.event, styles.findingNewMeeting)}>
                            <div className={styles.column1}>
                                <div className={styles.column1Inner}>
                                    <div className={styles.avatar}>
                                        <IconLoading />
                                    </div>
                                    <div className={styles.innerWrap}>
                                        <div className={styles.date}>We're searching for a new partner</div>
                                        <div className={styles.name}>You’ll receive you through email once we find your partner</div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.column2}>
                                <div className={styles.button} onClick={() => setIsFindingNewMeeting(false)}>Delete</div>
                            </div>
                        </div>
                    )}
                    <div className={cn(styles.event, styles.new)} onClick={() => setIsFindingNewMeeting(true)}>
                        <div className={styles.column1}>
                            <div className={styles.column1Inner}>
                                <div className={styles.avatar} />
                                <div className={styles.text}>Get new meeting</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
