import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Element } from '../../types/Element';

// API thunk to load elements for a room
export const loadElements = createAsyncThunk<Element[], string>(
  'elements/loadElements',
  async (roomId) => {
    const response = await fetch(`/api/rooms/${roomId}/elements`);
    const data: Element[] = await response.json();
    return data;
  }
);

interface ElementsState {
  elements: Record<number, Element>;
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
    setElements: (state, action: PayloadAction<Element[]>) => {
      state.elements = {};
      action.payload.forEach(element => {
        state.elements[element.id] = element;
      });
    },
    updateElement: (state, action: PayloadAction<{ id: number; updates: Partial<Element> }>) => {
      const { id, updates } = action.payload;
      const element = state.elements[id];
      if (element) {
        state.elements[id] = { ...element, ...updates };
      }
    },
    addElement: (state, action: PayloadAction<Element>) => {
      state.elements[action.payload.id] = action.payload;
    },
    removeElement: (state, action: PayloadAction<number>) => {
      delete state.elements[action.payload];
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

export const { setElements, updateElement, addElement, removeElement } = elementsSlice.actions;

export default elementsSlice.reducer;