import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  mode: localStorage.getItem("mode") == "true" || false,
}

export const counterSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = !state.mode
      localStorage.setItem("mode", state.mode)
    }
  },
})

export const { setMode } = counterSlice.actions

export default counterSlice.reducer