import { createSlice, /*createAsyncThunk*/ } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ButtonElement } from '../../types/Element';

// API thunk to load elements for a room

/*export const loadElements = createAsyncThunk<ButtonElement[], string>(
  'elements/loadElements',
  async (userName, { rejectWithValue }) => {
    const response: Response = await fetch(`http://localhost:3006/api/user/${userName}/button-instances`);
    const result = await response.json();
    if (result.status !== 200) {
      return rejectWithValue(
        `Failed to fetch elements for user ${userName}: ${result.message || 'Unknown error'}`);
    } else{
      console.log(`Successfully fetched elements for user ${userName}`);
      return result.data as ButtonElement[];
    }
  }
);
*/

interface ElementsState {
  elements: Record<number, ButtonElement>;
  loading: boolean;
  error: string | null;
}

const initialState: ElementsState = {
  elements: {
    1: {
      id: 1,
      name: 'Lamp',
      type: 'button',
      position: { x: 200, y: 0 },
      state: false,
      size: { width: 400, height: 400 },
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      backgroundColor: '#00FF00',
      templateId: 1
    },
    2: {
      id: 2,
      name: 'Fan',
      type: 'button',
      position: { x: 800, y: 0 },
      state: false ,
      size: { width: 200, height: 400 },
      fontSize: 16,
      fontFamily: 'Times New Roman',
      color: '#000000',
      backgroundColor: '#0000FF',
      templateId: 2
    }
  },
  loading: false,
  error: null
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<ButtonElement[]>) => {
      state.elements = {};
      action.payload.forEach(element => {
        state.elements[element.id] = element;
      });
    },
    updateElementState: (state, action: PayloadAction<{ id: number; state: boolean }>) => {
      const { id, state: newState } = action.payload;
      if (state.elements[id]) {
        state.elements[id].state = newState;
      }
    },
    addButton: (state, action: PayloadAction<ButtonElement>) => {
      const newElement = action.payload;
      if (!state.elements[newElement.id]) {
        state.elements[newElement.id] = {
          ...newElement,
          position: { x: 0, y: 0 },
          size: { width: 320, height: 420 },
          fontSize: 14,
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#FFFFFF'
        };
      }
    },
    setPosition: (
      state,
      action: PayloadAction<{ id: number; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload;

      if (!state.elements[id]) {
        state.elements[id] = {
          id,
          name: 'New Element',
          type: 'button',
          position: { x: 100, y: 100 }, // Default position
          state: false,
          size: { width: 320, height: 420 }, // Default size
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#FFFFFF',
          templateId: 0
        };
      }

      state.elements[id].position = position;
    },
    setSize: (
      state,
      action: PayloadAction<{ id: number; size: { width: number; height: number } }>
    ) => {
      const { id, size } = action.payload;

      if (!state.elements[id]) {
        state.elements[id] = {
          id,
          name: 'New Element',
          type: 'button',
          position: { x: 100, y: 100 }, // Default position
          state: false,
          size: { width: 320, height: 420 }, // Default size
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#FFFFFF',
          templateId: 0
        };
      }

      state.elements[id].size = size;
    }
  },
  
  /*
  extraReducers: (builder) => {
    builder
      .addCase(loadElements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadElements.fulfilled, (state, action) => {
        state.loading = false;
        state.elements = {};
        action.payload.forEach(element => {
          state.elements[element.id] = element;
        });
      })
      .addCase(loadElements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error';
      });
  }
  */
});

export const { setElements, updateElementState, setPosition, setSize } = elementsSlice.actions;

export default elementsSlice.reducer;