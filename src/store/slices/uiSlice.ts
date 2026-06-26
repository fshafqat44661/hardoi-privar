import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  mobileNavOpen: boolean;
  lightboxIndex: number | null;
}

const initialState: UiState = {
  mobileNavOpen: false,
  lightboxIndex: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setLightboxIndex(state, action: PayloadAction<number | null>) {
      state.lightboxIndex = action.payload;
    },
  },
});

export const { setMobileNavOpen, setLightboxIndex } = uiSlice.actions;
export default uiSlice.reducer;
