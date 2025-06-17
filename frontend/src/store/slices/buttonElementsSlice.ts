import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ButtonElement } from '../../types/Element';

// API thunk to load elements for a room

export const loadElements = createAsyncThunk(
  'buttonElements/loadElements',
  async (userName: string) => {
    const response = await fetch(`http://localhost:3006/api/user/${userName}/button-instances`);
    const result = await response.json();
    // result.data is an array of objects with reduxState as a string
    // Parse reduxState and extract ButtonElement, add templateId
    const buttonElementsArray = result.data.map((item: any) => {
      const parsed = JSON.parse(item.reduxState);
      return {
        ...parsed.ButtonElement,
        templateId: item.buttonTemplate_ID,
      };
    });
    return buttonElementsArray;
  }
);

interface ButtonElementsState {
  elements: Record<number, ButtonElement>;
  loading: boolean;
  error: string | null;
}

const initialState: ButtonElementsState = {
  elements: {},
  loading: false,
  error: null,
};

const buttonElementsSlice = createSlice({
  name: 'buttonElements',
  initialState,
  reducers: {
    setElements: (state, action: PayloadAction<ButtonElement[]>) => {
      state.elements = {};
      action.payload.forEach(el => {
        state.elements[el.id] = el;
      });
    },
    addButton: (state, action: PayloadAction<ButtonElement>) => {
      const newElement = action.payload;
      if (!state.elements[newElement.id]) {
        state.elements[newElement.id] = newElement;
      }
    },
    updateButton: (state, action: PayloadAction<ButtonElement>) => {
      const updated = action.payload;
      if (state.elements[updated.id]) {
        state.elements[updated.id] = {
          ...state.elements[updated.id],
          ...updated,
        };
      }
    },
    setPosition: (
      state,
      action: PayloadAction<{ id: number; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload;
      if (state.elements[id]) {
        state.elements[id].position = position;
      }
    },
    setSize: (
      state,
      action: PayloadAction<{ id: number; size: { width: number; height: number } }>
    ) => {
      const { id, size } = action.payload;
      if (state.elements[id]) {
        state.elements[id].size = size;
      }
    },
    deleteButton: (state, action: PayloadAction<number>) => {
      delete state.elements[action.payload];
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
        state.error = null;
        state.elements = {};
        action.payload.forEach((el: ButtonElement) => {
          state.elements[el.id] = el;
        });
      })
      .addCase(loadElements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load elements';
      });
  },
});

export const {
  setElements,
  addButton,
  updateButton,
  setPosition,
  setSize,
  deleteButton,
} = buttonElementsSlice.actions;

export default buttonElementsSlice.reducer;