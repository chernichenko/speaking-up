import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
// import { SAVE_STATE } from 'redux/actions'
import Tabs from "components/Tabs/Tabs"
import cn from "classnames"

import styles from './Calendar.module.scss'
import { addAvailableTime } from "redux/reducers/eventsSlice"

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const TIMES = ['', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11  AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11  PM']
const DAYS_IN_WEEK = 7
const MINUTES_IN_HOUR = 60
const ROW_HEIGHT = 40

export const Calendar = () => {
  const mainWrap = useRef<any>()
  const zeroPoint = mainWrap?.current?.offsetTop
  const [days, setDays] = useState<any[]>([])
  const [currentDay, setCurrentDay] = useState<any>({ day: 0, month: 0 })
  const [currentTime, setCurrentTime] = useState<any>({})
  const [dayOffset, setDayOffset] = useState<number>(0)
  const [navigationData, setNavigationData] = useState<any>()
  const [selectedInfo, setSelectedInfo] = useState<any>({ selectedColumnIndex: 0, from: 0, to: 0 })
  const [showPopup, setShowPopup] = useState(false)
  const dispatch = useDispatch()
  const availableTime = useSelector((s: any) => s.events.availableTime)

  console.log('availableTime', availableTime)

  useEffect(() => {
    const today = new Date()
    setCurrentDay({ day: today.getDate(), month: today.getMonth(), year: today.getFullYear() })
    setCurrentTime({ hours: today.getHours(), minutes: today.getMinutes() })
  }, [])

  useEffect(() => {
    const currentDayOfWeek = new Date()
    if (!!currentDayOfWeek.getDay()) {
      currentDayOfWeek.setDate(currentDayOfWeek.getDate() + dayOffset)
    } else {
      // If Sunday we go back
      currentDayOfWeek.setDate(currentDayOfWeek.getDate() - 1 + dayOffset)
    }

    const newDays = DAYS_OF_WEEK.map((_, index) => {
      const date = new Date(currentDayOfWeek.setDate(currentDayOfWeek.getDate() - currentDayOfWeek.getDay() + index + 1))
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
    setDayOffset(offset => prev ? offset - DAYS_IN_WEEK : offset + DAYS_IN_WEEK)
  }

  const isMooving = useRef(false)
  const mooving = useRef<any>({ selectedColumnIndex: 0, fromY: 0, toY: 0 })

  const mousedownHander = (event: any) => {
    if (showPopup) return
    isMooving.current = true
    mooving.current = { ...mooving.current, selectedColumnIndex: +event.target.getAttribute('data-column'), fromY: event.target.offsetTop }
  }

  const mousemoveHandler = (event: any) => {
    if (!isMooving.current || showPopup) return
    mooving.current = { ...mooving.current, toY: event.target.offsetTop }
  }

  const mouseupHander = (event: any) => {
    if (showPopup) return
    mooving.current = { ...mooving.current, toY: event.target.offsetTop }
    const selectedCoordFrom = mooving.current.fromY - zeroPoint
    const selectedCoordTo = mooving.current.toY - zeroPoint
    const from = selectedCoordFrom <= selectedCoordTo ? selectedCoordFrom : selectedCoordTo
    const to = selectedCoordTo >= selectedCoordFrom ? selectedCoordTo : selectedCoordFrom
    setSelectedInfo({ selectedColumnIndex: mooving.current.selectedColumnIndex, from, to })
    isMooving.current = false

    setShowPopup(true)
  }

  const saveEventHandler = (data: any) => {
    dispatch(addAvailableTime(data))
    closePopup()
  }

  const closePopup = () => {
    mooving.current = { selectedColumnIndex: 0, fromY: 0, toY: 0 }
    setSelectedInfo({ selectedColumnIndex: 0, from: 0, to: 0 })
    setShowPopup(false)
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
          <div
            className={styles.main}
            ref={mainWrap}
            onMouseDown={mousedownHander}
            onMouseMove={mousemoveHandler}
            onMouseUp={mouseupHander}
          >
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
                    const coordY = rowIndex * ROW_HEIGHT
                    return (
                      <div
                        key={columndIndex}
                        id={`row${rowIndex + 1}-column${columndIndex + 1}`}
                        data-column={columndIndex + 1}
                        className={
                          cn(
                            styles.column,
                            "tableItem",
                            activeColumn && styles.activeColumn,
                            columndIndex + 1 === DAYS_OF_WEEK.length && styles.last,
                            (columndIndex + 1 === selectedInfo.selectedColumnIndex && coordY >= selectedInfo.from && coordY <= selectedInfo.to) && styles.selected,
                            (columndIndex + 1 === selectedInfo.selectedColumnIndex && coordY === selectedInfo.from) && styles.selectedFrom,
                            (columndIndex + 1 === selectedInfo.selectedColumnIndex && coordY === selectedInfo.to) && styles.selectedTo,
                          )
                        }
                      >
                        {(columndIndex + 1 === selectedInfo.selectedColumnIndex && coordY === selectedInfo.from && showPopup) && (
                          <>
                            <div className={styles.abs} onClick={closePopup} />
                            <div className={styles.popup}>
                              <div className={styles.close} onClick={closePopup}>x</div>
                              <div className={styles.top}>Now availability line</div>
                              <div className={styles.time}>{DAYS_OF_WEEK[columndIndex]}, {TIMES[selectedInfo.from / ROW_HEIGHT] || '0 AM'} - {TIMES[selectedInfo.to / ROW_HEIGHT + 1]}</div>
                              <div className={styles.save} onClick={() => saveEventHandler({ column: columndIndex + 1, rowFrom: selectedInfo.from / ROW_HEIGHT + 1, rowTo: selectedInfo.to / ROW_HEIGHT + 1 })}>Save</div>
                            </div>
                          </>
                        )}
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
