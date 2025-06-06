import { configureStore } from '@reduxjs/toolkit';
import undoableRootReducer from './undoableRootReducer';

// Import your reducers here (example: roomReducer)
// import roomReducer from '../features/room/roomSlice';

// Function to save state to localStorage
function saveStateToLocalStorage(state: RootState) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.error('Could not save state to localStorage', e);
  }
}

// Function to load state from localStorage
function loadStateFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      // Return default state if nothing is in localStorage
      return undefined;
  }
    return JSON.parse(serializedState);
  } catch (e) {
    console.error('Could not load state from localStorage', e);
    return undefined;
  }
}

// Load the persisted state from localStorage
const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
  reducer: {
    undoableRoot: undoableRootReducer,
  },
  preloadedState, // Use the loaded state as the initial state
});


// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

// Export the store
export default store;

// Export RootState and AppDispatch types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;