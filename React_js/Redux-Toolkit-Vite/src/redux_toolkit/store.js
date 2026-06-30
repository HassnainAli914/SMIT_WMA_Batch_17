import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import counterSlice from './counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
})

