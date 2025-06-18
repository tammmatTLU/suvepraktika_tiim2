import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ButtonElement } from '../../types/Element';

// API thunk to load elements for a room

export const loadButtonElements = createAsyncThunk(
  'buttonElements/loadElements',
  async (userName: string) => {
    const response = await fetch(`http://localhost:3006/api/user/${userName}/button-instances`);
    
    const text = await response.text();
    // If the response is empty, return an empty array
    if (!text) {
      return [];
    }


    const result = await JSON.parse(text);

// Parse each redux_state and extract the ButtonElement
    const buttonElementsArray = result.data.map((item: any) => {
      try {
          const parsed = JSON.parse(item.redux_state);
          return parsed as ButtonElement;
        } catch (e) {
          console.error('Failed to parse redux_state:', item.redux_state, e);
          return null;
        }
    });

    // Now buttonElementsArray is an array of ButtonElement objects with valid ids
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
    clearButtons: (state) => {
      state.elements = {};
      state.loading = true;
      state.error = null;
    },
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
      .addCase(loadButtonElements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadButtonElements.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.elements = {};
        action.payload.forEach((button: ButtonElement) => {
            state.elements[button.id] = button;
        });
        console.log("Loaded button elements:", state.elements);
      })
      .addCase(loadButtonElements.rejected, (state, action) => {
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
  clearButtons,
} = buttonElementsSlice.actions;

export default buttonElementsSlice.reducer;