import { combineReducers } from '@reduxjs/toolkit';
import deviceStateReducer from './deviceStateSlice';
import controlPanelReducer from './controlPanelSlice';
import deviceListSliceReducer from './deviceListSlice';
import roomColorsReducer from './roomColorsSlice';

const rootReducer = combineReducers({
  deviceState: deviceStateReducer,
  controlPanel: controlPanelReducer,
  deviceList: deviceListSliceReducer,
  roomColors: roomColorsReducer,
});

import undoable from 'redux-undo';

const undoableRootReducer = undoable(rootReducer);

export default undoableRootReducer;