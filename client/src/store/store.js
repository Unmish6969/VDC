import { configureStore } from '@reduxjs/toolkit';
import rowsReducer from './rowsSlice';

export const store = configureStore({
  reducer: {
    rows: rowsReducer,
  },
});
