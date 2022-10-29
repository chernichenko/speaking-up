import { useEffect, useState } from "react"
import Tabs from "components/Tabs/Tabs"
import cn from "classnames"

import styles from './Calendar.module.scss'

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const TIMES = ['', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11  AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11  PM']
const MINUTES_IN_HOUR = 60
const ROW_HEIGHT = 40

export const Calendar = () => {
  const [days, setDays] = useState<number[]>([])
  const [currentDay, setCurrentDay] = useState<number>()
  const [currentTime, setCurrentTime] = useState<any>({  })

  useEffect(() => {
    const today = new Date()
    setCurrentDay(today.getDate())
    setCurrentTime({ hours: today.getHours(), minutes: today.getMinutes() })

    const newDays = DAYS_OF_WEEK.map((_, index) => {
      const date = new Date(today.setDate(today.getDate() - today.getDay() + index + 1))
      return date.getDate()
    })
    setDays(newDays)
  }, [])

  useEffect(() => {
    if (days?.length && currentDay && currentTime) {
      const timeLine: any = document.querySelector('#timeLine')
      if (timeLine) {
        const minutes = currentTime.minutes
        const top = minutes / MINUTES_IN_HOUR * ROW_HEIGHT;
        timeLine.style.top = `${top}px`;
      }
    }
  }, [days, currentDay, currentTime])

  return (
    <div className={styles.wrap}>
      <Tabs />
      <div className={styles.calendarWrap}>
        <div className={styles.calendar}>
          <div className={styles.top}>
            <div className={cn(styles.column, styles.first)} />
            {DAYS_OF_WEEK.map((day, index) => {
              const isActiveColumn = currentDay === days[index]
              return (
                <div
                  key={index}
                  className={
                    cn(
                      styles.column,
                      isActiveColumn && styles.activeColumn,
                      index + 1 === DAYS_OF_WEEK.length && styles.last
                    )
                  }
                >
                  <div className={styles.day}>{day}</div>
                  <div className={styles.numberOfDay}>{days[index]}</div>
                </div>
              )
            })}
          </div>
          <div className={styles.main}>
            {TIMES.map((time, rowIndex) => {
              const activeRow = currentTime.hours === rowIndex
              return (
                <div
                  key={rowIndex}
                  className={
                    cn(
                      styles.row,
                      activeRow && styles.activeRow,
                    )
                  }
                >
                  <div className={cn(styles.column, styles.first)}>
                    <div className={styles.time}>{time}</div>
                  </div>
                  {DAYS_OF_WEEK.map((_, columndIndex) => {
                    const activeColumn = currentDay === days[columndIndex]
                    return (
                      <div
                        key={columndIndex}
                        className={
                          cn(
                            styles.column,
                            activeColumn && styles.activeColumn,
                            columndIndex + 1 === DAYS_OF_WEEK.length && styles.last
                          )
                        }
                      >
                        {(activeRow && activeColumn) && (
                          <div id="timeLine" className={styles.timeLine} />
                        )}
                      </div>
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
