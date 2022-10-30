import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  availableTime: [],
  events: [
    { id: '1', day: 'Sunday', timeFrom: '18:00', timeTo: '18:30', user: { name: 'Alex', avatar: '' } },
    { id: '2', day: 'Monday', timeFrom: '14:00', timeTo: '15:30', user: { name: 'Andrew', avatar: '' } },
    { id: '3', day: 'Friday', timeFrom: '22:00', timeTo: '22:30', user: { name: 'Tom', avatar: '' } },
  ],
  eventsPerWeek: 3,
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent(state: any, { payload }) {
      state.events.push(payload)
    },
    removeEvent(state: any, { payload }: any) {
      state.events = state.events.filter((event: any) => event.id !== payload)
    },
    changeEventsPerWeekCount(state: any, { payload }) {
      state.eventsPerWeek = payload
    },
    addAvailableTime(state: any, { payload }) {
      state.availableTime.push(payload)
    },
    removeAvailableTime(state: any, { payload }) {
      state.availableTime = state.availableTime
        .map((time: any) => {
          if (
            time.day === payload.day &&
            time.month === payload.month &&
            time.year === payload.year &&
            time.rowFrom === payload.rowFrom &&
            time.rowTo === payload.rowTo
          ) {
            return null
          }
          return time
        })
        .filter((time: any) => !!time)
    },
  },
})

export const {
  addEvent,
  removeEvent,
  changeEventsPerWeekCount,
  addAvailableTime,
  removeAvailableTime,
} = eventsSlice.actions

export default eventsSlice.reducer
