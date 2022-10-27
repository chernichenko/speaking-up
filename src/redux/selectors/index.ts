import { RootState } from 'constants/types'

export const getUser = (s: RootState) => s.auth.user
