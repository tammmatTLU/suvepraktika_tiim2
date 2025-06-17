import { configureStore } from '@reduxjs/toolkit';
import undoableRootReducer from './slices/undoableRootSlice';

export const store = configureStore({
  reducer: {
    undoableRoot: undoableRootReducer,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;