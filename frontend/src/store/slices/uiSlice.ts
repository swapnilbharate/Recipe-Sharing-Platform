import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  darkMode: boolean;
  toastMessage: { type: 'success' | 'error' | 'info'; message: string } | null;
}

const initialState: UiState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  toastMessage: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', String(state.darkMode));
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', String(state.darkMode));
    },
    showToast: (state, action: PayloadAction<{ type: 'success' | 'error' | 'info'; message: string }>) => {
      state.toastMessage = action.payload;
    },
    clearToast: (state) => {
      state.toastMessage = null;
    }
  },
});

export const { toggleDarkMode, setDarkMode, showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;
