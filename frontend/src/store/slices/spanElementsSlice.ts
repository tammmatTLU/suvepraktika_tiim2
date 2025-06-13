import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SpanElement } from '../../types/Element';

interface SpanElementsState {
  elements: Record<number, SpanElement>;
}

const initialState: SpanElementsState = { elements: {} };

const spanElementsSlice = createSlice({
  name: 'spanElements',
  initialState,
  reducers: {
    setSpans(state, action: PayloadAction<SpanElement[]>) {
      state.elements = {};
      action.payload.forEach(span => { state.elements[span.id] = span; });
    },
    updateSpan(state, action: PayloadAction<SpanElement>) {
      state.elements[action.payload.id] = action.payload;
    },
  },
});

export const { setSpans, updateSpan } = spanElementsSlice.actions;
export default spanElementsSlice.reducer;