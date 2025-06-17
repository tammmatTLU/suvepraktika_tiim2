import { combineReducers } from '@reduxjs/toolkit';
import buttonElementsReducer from './buttonElementsSlice';
import userPageReducer from './userPageSlice';

const rootReducer = combineReducers({
    buttonElements: buttonElementsReducer,
    userPage: userPageReducer,
});

import undoable from 'redux-undo';

const undoableRootReducer = undoable(rootReducer);

export default undoableRootReducer;