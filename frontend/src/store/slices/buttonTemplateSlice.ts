import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import type { PayloadAction } from '@reduxjs/toolkit';
import type { ButtonTemplate } from '../../types/Element';

export const loadButtonTemplates = createAsyncThunk(
  'buttonTemplates/loadButtonTemplates',
  async () => {
    const templateResponse = await fetch(`http://localhost:3006/api/button-templates`);
    const roomResponse = await fetch(`http://localhost:3006/api/rooms`);
    const templateResult = await templateResponse.json();
    const roomResult = await roomResponse.json();
    console.log(templateResult.data)
    console.log(roomResult.data)
    // Combine room name into each template
    const templatesWithRoomName = templateResult.data.map((template: any) => {
      const room = roomResult.data.find((room: any) => room.id === template.room_id);
      return {
        ...template,
        roomName: room ? room.name : '', // Add roomName or empty string if not found
      };
    });

    return templatesWithRoomName as ButtonTemplate[];
  }
);

interface ButtonTemplateState {
  elements: Record<number, ButtonTemplate>;
  loading: boolean;
  error: string | null;
}

const initialState: ButtonTemplateState = {
  elements: {},
  loading: false,
  error: null,
};

const buttonTemplateSlice = createSlice({
  name: 'buttonTemplates',
  initialState,
  reducers: {
    clearTemplates: (state) => {
      state.elements = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadButtonTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadButtonTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.elements = action.payload.reduce((acc, element) => {
          acc[element.id] = element;
          return acc;
        }, {} as Record<number, ButtonTemplate>);
      })
      .addCase(loadButtonTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load button templates';
      });
  },
});

export const {
  clearTemplates,
} = buttonTemplateSlice.actions;

export default buttonTemplateSlice.reducer;