import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  user: {
    id: '',
    name: '',
    avatarUrl: '',
    token: '',
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeUser(state: any, { payload }) {
      Object.keys(payload).forEach(key => {
        state.user[key] = payload[key]
      })
    },
    clearUserInfo() {
      return initialState
    }
  },
})

export const {
  changeUser,
  clearUserInfo,
} = authSlice.actions

export default authSlice.reducer
