import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SpanElement } from '../../types/Element';

interface SpanElementsState {
  elements: Record<number, SpanElement>;
}

const initialState: SpanElementsState = { 
    elements: {
    1: {
      id: 1,
      name: 'Title',
      type: 'span',
      position: { x: 100, y: 50 },
      size: { width: 300, height: 50 },
      fontSize: 24,
      fontFamily: 'Arial',
      color: '#000000',
      backgroundColor: '#FFFFFF'
    },
    2: {
      id: 2,
      name: 'Subtitle',
      type: 'span',
      position: { x: 100, y: 120 },
      size: { width: 300, height: 30 },
      fontSize: 18,
      fontFamily: 'Arial',
      color: '#333333',
      backgroundColor: '#FFFFFF'
    } 
}};

const spanElementsSlice = createSlice({
  name: 'spanElements',
  initialState,
  reducers: {
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
});

export const { setSpans, updateSpan, setPosition, setSize, addSpan, deleteSpan } = spanElementsSlice.actions;
export default spanElementsSlice.reducer;