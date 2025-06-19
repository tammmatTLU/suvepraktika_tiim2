import { configureStore } from '@reduxjs/toolkit';
import undoableRootReducer from './slices/undoableRootSlice';
import buttonTemplateReducer from './slices/buttonTemplateSlice';

export const store = configureStore({
  reducer: {
    undoableRoot: undoableRootReducer,
    buttonTemplate: buttonTemplateReducer,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;