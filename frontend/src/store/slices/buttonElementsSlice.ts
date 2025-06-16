import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ButtonElement } from '../../types/Element';

// API thunk to load elements for a room

export const loadElements = createAsyncThunk<ButtonElement[], string>(
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


interface ElementsState {
  elements: Record<number, ButtonElement>;
  loading: boolean;
  error: string | null;
}

const initialState: ElementsState = {
  elements: {},
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
        state.elements[newElement.id] = newElement;
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
          size: { width: 175, height: 75 }, // Default size
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
          size: { width: 170, height: 75 }, // Default size
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#FFFFFF',
          templateId: 0
        };
      }

      state.elements[id].size = size;
    },
    deleteButton: (state, action: PayloadAction<number>) => {
      console.log(state.elements[action.payload]);
    if (state.elements[action.payload]) {
      delete state.elements[action.payload];
    }
    },
  },

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
});

export const { setElements, updateElementState, setPosition, setSize, addButton, deleteButton } = elementsSlice.actions;

export default elementsSlice.reducer;