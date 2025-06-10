import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { data: [], hasError: false, isLoading: true };

export const passportsSlice = createSlice({
  initialState,
  name: "passports",
  reducers: {
    updatePassportsFromStore: (state, action) => {
      state.data = action.payload;
    },

    addNewPassportToStore: (state, action) => {
      state.data.push(action.payload);
    },

    removePassportFromStore: (state, action) => {
      state.data = state.data.filter(
        (passport) => passport.id !== action.payload
      );
    },

    updateSinglePassportInStore: (state, { payload }) => {
      const index = state.data.findIndex(
        (passport) => passport.id === payload.id
      );

      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...payload };
      }
    },

    setPassportsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setPassportsError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

// Export actions
export const {
  setPassportsError,
  setPassportsLoading,
  addNewPassportToStore,
  removePassportFromStore,
  updatePassportsFromStore,
  updateSinglePassportInStore,
} = passportsSlice.actions;

// Export reducer
export default passportsSlice.reducer;
