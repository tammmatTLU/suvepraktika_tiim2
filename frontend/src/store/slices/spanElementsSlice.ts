import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SpanElement } from '../../types/Element';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface SpanElementsState {
  elements: Record<number, SpanElement>;
  loading: boolean;
  error: string | null;
}

export const loadSpanElements = createAsyncThunk(
  'spanElements/loadElements',
    async (userName: string) => {
      try {
      const response = await fetch(`http://localhost:3006/api/user/${userName}/redux-span`);
      const result = await response.json();
      console.log(result.data)
      const spanElementsArray = result.data.reduxSpan.map((item: any) => {
        return {
          ...item,
        };
      });
      return spanElementsArray;
    } catch (error) {
      console.error('Error loading span elements:', error);
    }
  }
);

const initialState: SpanElementsState = { 
    elements: {},
    loading: false,
    error: null,
  };

const spanElementsSlice = createSlice({
  name: 'spanElements',
  initialState,
  reducers: {
    clearSpans: (state) => {
      state.elements = {};
    },
    setSpans(state, action: PayloadAction<SpanElement[]>) {
      state.elements = {};
      action.payload.forEach(span => { state.elements[span.id] = span; });
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
          type: 'span',
          position: { x: 100, y: 100 }, // Default position
          size: { width: 320, height: 420 }, // Default size
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#FFFFFF'
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
          type: 'span',
          position: { x: 100, y: 100 }, // Default position
          size: { width: 320, height: 420 }, // Default size
          fontSize: 16,
          fontFamily: 'Arial',
          color: '#000000',
          backgroundColor: '#FFFFFF'
        };
      }

      state.elements[id].size = size;
    },
    addSpan: (state, action: PayloadAction<SpanElement>) => {
        const newElement = action.payload;
        if (!state.elements[newElement.id]) {
          state.elements[newElement.id] = newElement;
        }
      },
    deleteSpan: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      if (state.elements[id]) {
        delete state.elements[id];
      }
    },
    updateSpan: (state, action: PayloadAction<SpanElement>) => {
      const updated = action.payload;
      if (state.elements[updated.id]) {
        state.elements[updated.id] = {
          ...state.elements[updated.id],
          ...updated,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSpanElements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadSpanElements.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.elements = {};
        action.payload.forEach((el: SpanElement) => {
          console.log(el)
          state.elements[el.id] = el;
        });
        console.log("Loaded span elements:", state.elements);
      })
      .addCase(loadSpanElements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load elements';
      });
  },
});

export const { setSpans, updateSpan, setPosition, setSize, addSpan, deleteSpan, clearSpans } = spanElementsSlice.actions;
export default spanElementsSlice.reducer;