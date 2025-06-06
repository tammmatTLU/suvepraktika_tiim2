import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ControlPanelPosition = {
  roomId: string;
  deviceId: string;
  position: { x: number; y: number };
};

type ControlPanelSize = {
  roomId: string;
  deviceId: string;
  size: { width: number; height: number };
};

type ControlPanelState = {
  [roomId: string]: {
    [deviceId: string]: {
      position: { x: number; y: number };
      size: { width: number; height: number };
    };
  };
};

const initialState: ControlPanelState = {
  "A-001": {
    lights: { position: { x: 50, y: 0 }, size: { width: 320, height: 420 } },
    screen: { position: { x: 450, y: 0 }, size: { width: 320, height: 420 } },
    projector: { position: { x: 850, y: 0 }, size: { width: 320, height: 420 } },
  },
  "A-002": {
    lights: { position: { x: 50, y: 0 }, size: { width: 320, height: 420 } },
    screen: { position: { x: 850, y: 0 }, size: { width: 320, height: 420 } },
  },
  "A-003": {
    lights: { position: { x: 50, y: 0 }, size: { width: 320, height: 420 } },
    projector: { position: { x: 850, y: 0 }, size: { width: 320, height: 420 } },
  },
};


const controlPanelSlice = createSlice({
  name: 'controlPanel',
  initialState,
  reducers: {
    setPosition(
      state,
      action: PayloadAction<ControlPanelPosition>
    ) {
      const { roomId, deviceId, position } = action.payload;
      
      if (!state[roomId]) {
        state[roomId] = {};
      }

      if (!state[roomId][deviceId]) {
        state[roomId][deviceId] = {
          position: { x: 100, y: 100 }, // Default position
          size: { width: 320, height: 420 }, // Default size
        };
      }

      state[roomId][deviceId].position = position;
    },
    setSize(
      state,
      action: PayloadAction<ControlPanelSize>
    ) {
      const { roomId, deviceId, size } = action.payload;
      
      if (!state[roomId]) {
        state[roomId] = {};
      }

      if (!state[roomId][deviceId]) {
        state[roomId][deviceId] = {
          position: { x: 100, y: 100 }, // Default position
          size: { width: 320, height: 420 }, // Default size
        };
      }

      state[roomId][deviceId].size = size;
    },
  },
});

export const { setPosition, setSize } = controlPanelSlice.actions;
export default controlPanelSlice.reducer;