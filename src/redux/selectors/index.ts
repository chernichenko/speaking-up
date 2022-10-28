import { RootState } from 'constants/types'

export const getUser = (s: RootState) => s.auth.user
export const getEvents = (s: RootState) => s.events.events
