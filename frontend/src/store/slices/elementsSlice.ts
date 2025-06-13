import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Element } from '../../types/Element';

// API thunk to load elements for a room

export const loadElements = createAsyncThunk<Element[], string>(
  'elements/loadElements',
  async (userName, { rejectWithValue }) => {
    const response: Response = await fetch(`http://localhost:3006/api/user/${userName}/button-instances`);
    const result = await response.json();
    if (result.status !== 200) {
      return rejectWithValue(
        `Failed to fetch elements for user ${userName}: ${result.message || 'Unknown error'}`);
    } else{
      console.log(`Successfully fetched elements for user ${userName}`);
      return result.data as Element[];
    }
  }
);


interface ElementsState {
  elements: Record<number, Element>;
  loading: boolean;
  error: string | null;
}

const initialState: ElementsState = {
  elements: {
    /*1: {
      id: 1,
      name: 'Lamp',
      position: { x: 200, y: 600 },
      state: { on: false },
      size: { width: 400, height: 400 },
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      backgroundColor: '#00FF00'
    },
    2: {
      id: 2,
      name: 'Fan',
      position: { x: 800, y: 600 },
      state: { on: false },
      size: { width: 200, height: 400 },
      fontSize: 16,
      fontFamily: 'Times New Roman',
      color: '#000000',
      backgroundColor: '#0000FF'
    }*/
  },
  loading: false,
  error: null
};

const elementsSlice = createSlice({
  name: 'elements',
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<Element[]>) => {
      state.elements = {};
      action.payload.forEach(element => {
        state.elements[element.id] = element;
      });
    },
    updateElementState: (state, action: PayloadAction<{ id: number; state: boolean }>) => {
      const { id, state: newState } = action.payload;
      if (state.elements[id]) {
        state.elements[id].state.on = newState;
      }
    }
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

export const { setElements, updateElementState } = elementsSlice.actions;

export default elementsSlice.reducer;