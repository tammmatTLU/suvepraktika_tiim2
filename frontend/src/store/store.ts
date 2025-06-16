import { configureStore } from '@reduxjs/toolkit';
import buttonElementsReducer from './slices/buttonElementsSlice';
import spanElementsReducer from './slices/spanElementsSlice';


export const store = configureStore({
  reducer: {
    buttonElements: buttonElementsReducer,
    spanElements: spanElementsReducer,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;