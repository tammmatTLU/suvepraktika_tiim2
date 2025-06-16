// layoutSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    snapToGrid: true,
    components: [] // e.g., [{ id: 'btn-1', x: 20, y: 40, width: 100, height: 40 }]
  },
  reducers: {
    toggleSnap(state) {
      state.snapToGrid = !state.snapToGrid;
    },
    updateComponent(state, action) {
      const index = state.components.findIndex(c => c.id === action.payload.id);
      if (index !== -1) state.components[index] = action.payload;
    }
  }
});

export const { toggleSnap, updateComponent } = layoutSlice.actions;
export default layoutSlice.reducer;
