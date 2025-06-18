import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SpanElement, PageStyle } from '../../types/Element';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface UserPageState {
  elements: Record<number, SpanElement>;
  pageStyle: PageStyle;
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

export const loadUserPageState = createAsyncThunk<
  SpanElement[] | undefined, // Return type
  string,                    // Argument type (userName)
  {}
>(
  'pageState/loadUserPageState',
  async (userName: string, thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3006/api/user/${userName}/redux-span`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const result = await response.json();
      console.log('API result:', result);

      const reduxSpan = result.data?.reduxSpan;
      if (!reduxSpan) {
        throw new Error('reduxSpan missing in API response');
      }

      const elements = reduxSpan.elements ?? [];
      const pageStyle = reduxSpan.pageStyle ?? {};

      // Dispatch pageStyle to the store
      thunkAPI.dispatch(setPageStyle(pageStyle));
      thunkAPI.dispatch(setSetForElements(pageStyle.setForElements ?? true));

      // Return elements as an array for the fulfilled reducer
      return elements ? Object.values(elements) : [];
    } catch (error) {
      console.log('Error loading span elements:', error);
      return thunkAPI.rejectWithValue('Failed to load span elements');
    }
  }
);

const initialState: UserPageState = { 
    elements: {},
    pageStyle: {
      backgroundColor: '#FFFFFF',
      fontFamily: 'Arial',
      fontSize: 16,
      color: '#000000',
      setForElements: false,
      btnBackgroundColor: '#F0F0F0',
      btnColor: '#000000',
      btnFontFamily: 'Arial',
      btnFontSize: 14,
      spanBackgroundColor: '#FFFFFF',
      spanColor: '#000000',
      spanFontFamily: "Arial",
      spanFontSize: 12  
    },
    loaded: false,
    loading: false,
    error: null,
  };

const spanElementsSlice = createSlice({
  name: 'spanElements',
  initialState,
  reducers: {
    clearSpans: (state) => {
      state.elements = {};
      state.pageStyle = {
        backgroundColor: '#FFFFFF',
        fontFamily: 'Arial',
        fontSize: 16,
        color: '#000000',
        setForElements: false,
        btnBackgroundColor: '#F0F0F0',
        btnColor: '#000000',
        btnFontFamily: 'Arial',
        btnFontSize: 14,
        spanBackgroundColor: '#FFFFFF',
        spanColor: '#000000',
        spanFontFamily: "Arial",
        spanFontSize: 12
      }
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
    setPageStyle: (state, action: PayloadAction<PageStyle>) => {
      const { setForElements, ...styleProps} = action.payload;
      state.pageStyle = {
        ...state.pageStyle,
        ...styleProps,
      };
    },
    setSetForElements: (state, action: PayloadAction<boolean>) => {
      if (state.pageStyle) {
        state.pageStyle.setForElements = action.payload;
      }
    },
    resetLoaded: (state) => {
      state.loaded = false;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserPageState.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserPageState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.elements = {};
        if(action.payload){
          action.payload.forEach(span => {
            state.elements[span.id] = span;
          });
        }
        console.log("Loaded span elements:", state.elements);
        state.loaded = true;
      })
      .addCase(loadUserPageState.rejected, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.error = action.error.message || 'Failed to load elements';
      });
  },
});

export const {
  setSpans,
  updateSpan,
  setPosition,
  setSize,
  addSpan,
  deleteSpan,
  clearSpans,
  setPageStyle,
  setSetForElements,
  resetLoaded
} = spanElementsSlice.actions;
export default spanElementsSlice.reducer;