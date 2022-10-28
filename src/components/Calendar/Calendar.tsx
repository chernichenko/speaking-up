import { useEffect, useState } from "react"
import Tabs from "components/Tabs/Tabs"
import cn from "classnames"

import styles from './Calendar.module.scss'

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const TIMES = ['', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11  AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11  PM']

export const Calendar = () => {
  const [days, setDays] = useState<number[]>([])
  const today = new Date()

  useEffect(() => {
    const newDays = DAYS_OF_WEEK.map((_, index) => {
      const date = new Date(today.setDate(today.getDate() - today.getDay() + index + 1))
      return date.getDate()
    })
    setDays(newDays)
  }, [])

  return (
    <div className={styles.wrap}>
      <Tabs />
      <div className={styles.calendarWrap}>
        <div className={styles.calendar}>
          <div className={styles.top}>
            <div className={cn(styles.column, styles.first)} />
            {DAYS_OF_WEEK.map((day, index) => {
              return (
                <div
                  key={index}
                  className={cn(styles.column, today.getDate() === days[index] && styles.active, index + 1 === DAYS_OF_WEEK.length && styles.last)}>
                  <div className={styles.day}>{day}</div>
                  <div className={styles.numberOfDay}>{days[index]}</div>
                </div>
              )
            })}
          </div>
          <div className={styles.main}>
            {TIMES.map((time, index) => {
              return (
                <div key={index} className={styles.row}>
                  <div className={cn(styles.column, styles.first)}>
                    <div className={styles.time}>{time}</div>
                  </div>
                  {DAYS_OF_WEEK.map((_, index) => {
                    return (
                      <div key={index} className={cn(styles.column, index + 1 === DAYS_OF_WEEK.length && styles.last)} />
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
