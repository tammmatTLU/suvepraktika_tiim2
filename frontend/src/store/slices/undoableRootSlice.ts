import { combineReducers } from '@reduxjs/toolkit';
import buttonElementsReducer from './buttonElementsSlice';
import spanElementsReducer from './spanElementsSlice';

const rootReducer = combineReducers({
    buttonElements: buttonElementsReducer,
    spanElements: spanElementsReducer,
});

import undoable from 'redux-undo';

const undoableRootReducer = undoable(rootReducer);

export default undoableRootReducer;