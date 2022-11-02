import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getEvents } from 'redux/selectors'
import { SAVE_STATE } from 'redux/actions'
import { removeEvent, changeEventsPerWeekCount } from 'redux/reducers/eventsSlice'
import Tabs from 'components/Tabs/Tabs'
import cn from 'classnames'

import styles from './Events.module.scss'

export const Events = () => {
    const dispatch = useDispatch()
    const events = useSelector(getEvents)
    const meetingsCountFromStore = useSelector((s: any) => s.events.eventsPerWeek)
    const [showMoreMeetings, setShowMoreMeetings] = useState(false)
    const [meetingsCount, setMeetingsCount] = useState(meetingsCountFromStore)

    const onChangeHandler = (value: any) => {
        const count = value?.target?.value ? value.target.value : value
        if (count > 0 && count < 100) {
            setMeetingsCount(count)
        }
    }

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
                    <div className={cn(styles.event, styles.fullWidth)}>
                        <div className={styles.column1}>
                            <div className={styles.column1Inner}>
                                <div className={styles.avatar} />
                                <div className={styles.innerWrap}>
                                    <div className={styles.date}>We're searching for a new partner</div>
                                    <div className={styles.name}>You’ll receive you through email once we find your partner</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.column2}>
                            <div className={styles.button}>Delete</div>
                        </div>
                    </div>
                    <div className={cn(styles.event, styles.new)}>
                        <div className={styles.column1}>
                            <div className={styles.column1Inner}>
                                <div className={styles.avatar} />
                                <div className={styles.text}>Get new meeting</div>
                            </div>
                        </div>
                    </div>
                    {false && <div className={styles.getMoreWrap}>
                        <div className={styles.getMore}>
                            <div className={styles.text} onClick={() => setShowMoreMeetings(true)}>+ Get more meetings</div>
                            {showMoreMeetings && (<div className={styles.popup}>
                                <div className={styles.close} onClick={() => setShowMoreMeetings(false)}>x</div>
                                <div className={styles.top}>How many meetings you want to have?</div>
                                <div className={styles.calcWrap}>
                                    <div className={styles.minus} onClick={() => onChangeHandler(meetingsCount - 1)}>-</div>
                                    <input type="number" min={1} max={100} value={meetingsCount} onChange={onChangeHandler} />
                                    <div className={styles.plus} onClick={() => onChangeHandler(meetingsCount + 1)}>+</div>
                                </div>
                                <div className={styles.save} onClick={() => {
                                    dispatch(changeEventsPerWeekCount(meetingsCount))
                                    dispatch({ type: SAVE_STATE })
                                    setShowMoreMeetings(false)
                                }}>Save</div>
                            </div>)}
                        </div>
                    </div>}
                </div>
            ) : null}
        </div>
    )
}
