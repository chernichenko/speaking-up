import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  events: [
    { id: '1', day: 'Sunday', timeFrom: '18:00', timeTo: '18:30', user: { name: 'Alex', avatar: '' } },
    { id: '2', day: 'Monday', timeFrom: '14:00', timeTo: '15:30', user: { name: 'Andrew', avatar: '' } },
    { id: '3', day: 'Friday', timeFrom: '22:00', timeTo: '22:30', user: { name: 'Tom', avatar: '' } },
  ]
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
  },
})

export const {
  addEvent,
  removeEvent,
} = eventsSlice.actions

export default eventsSlice.reducer
