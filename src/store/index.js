import { configureStore } from '@reduxjs/toolkit'
import mode from '../reducers/mode'

export const store = configureStore({
  reducer: {
    mode,
  },
})