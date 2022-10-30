import { useEffect, useState } from "react"
import Tabs from "components/Tabs/Tabs"
import cn from "classnames"

import styles from './Calendar.module.scss'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
const TIMES = ['', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11  AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11  PM']
const DAYS_IN_WEEK = 7
const MINUTES_IN_HOUR = 60
const ROW_HEIGHT = 40

export const Calendar = () => {
  const [days, setDays] = useState<any[]>([])
  const [currentDay, setCurrentDay] = useState<any>({ day: 0, month: 0 })
  const [currentTime, setCurrentTime] = useState<any>({})
  const [dayOffset, setDayOffset] = useState<number>(0)
  const [navigationData, setNavigationData] = useState<any>()

  useEffect(() => {
    const today = new Date()
    today.setDate(today.getDate() + dayOffset)

    // Only for Init
    if (!dayOffset) {
      setCurrentDay({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() })
      setCurrentTime({ hours: today.getHours(), minutes: today.getMinutes() })
    }

    const newDays = DAYS_OF_WEEK.map((_, index) => {
      const date = new Date(today.setDate(today.getDate() - today.getDay() + index))
      return { day: date.getDate(), month: date.getMonth(), year: date.getFullYear() }
    })
    setDays(newDays)
  }, [dayOffset])

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

  useEffect(() => {
    const months: any = []
    const years: any = []
    days.forEach((day) => {
      months.push(MONTHS[day.month])
      years.push(day.year)
    })

    setNavigationData({
      months: months.filter((item: string, index: number) => months.indexOf(item) === index),
      years: years.filter((item: string, index: number) => years.indexOf(item) === index),
    })
  }, [days])

  const onChangeWeekHandler = ({ prev }: any) => {
    setDayOffset(offset => {
      if (prev) {
        return offset - DAYS_IN_WEEK
      }
      return offset + DAYS_IN_WEEK
    })
  }

  return (
    <div className={styles.wrap}>
      <Tabs />
      <div className={styles.calendarWrap}>
        <div className={styles.navigation}>
          <div className={styles.arrowWrap}>
            <div className={styles.prev} onClick={() => onChangeWeekHandler({ prev: true })}>&lt;</div>
            <div className={styles.next} onClick={() => onChangeWeekHandler({ prev: false })}>&gt;</div>
          </div>
          <div className={styles.date}>
            {navigationData?.months && (
              <div className={styles.months}>
                {navigationData.months.length === 1 ? navigationData.months[0] : `${navigationData.months[0]} - ${navigationData.months[1]}`}
              </div>
            )}
            {navigationData?.years && (
              <div className={styles.years}>
                {navigationData.years.length === 1 ? navigationData.years[0] : `${navigationData.years[0]} - ${navigationData.years[1]}`}
              </div>
            )}
          </div>
        </div>
        <div className={styles.calendar}>
          <div className={styles.top}>
            <div className={cn(styles.column, styles.first)} />
            {DAYS_OF_WEEK.map((day, index) => {
              const isActiveColumn = currentDay?.day === days[index]?.day && currentDay?.month === days[index]?.month
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
                  <div className={styles?.day}>{day}</div>
                  <div className={styles.numberOfDay}>{days[index]?.day}</div>
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
                    const activeColumn = currentDay?.day === days[columndIndex]?.day && currentDay?.month === days[columndIndex]?.month
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
