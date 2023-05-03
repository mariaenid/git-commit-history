import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { commitSlice } from './auth/commitSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    commits: commitSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch