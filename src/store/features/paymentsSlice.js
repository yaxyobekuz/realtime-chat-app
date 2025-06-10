import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { data: [], hasError: false, isLoading: true };

export const paymentsSlice = createSlice({
  initialState,
  name: "payments",
  reducers: {
    updatePaymentsFromStore: (state, action) => {
      state.data = action.payload;
    },

    addNewPaymentToStore: (state, action) => {
      state.data.push(action.payload);
    },

    removePaymentFromStore: (state, action) => {
      state.data = state.data.filter(
        (payment) => payment.id !== action.payload
      );
    },

    updateSinglePaymentInStore: (state, { payload }) => {
      const index = state.data.findIndex(
        (payment) => payment.id === payload.id
      );

      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...payload };
      }
    },

    setPaymentsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setPaymentsError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

// Export actions
export const {
  setPaymentsError,
  setPaymentsLoading,
  addNewPaymentToStore,
  removePaymentFromStore,
  updatePaymentsFromStore,
  updateSinglePaymentInStore,
} = paymentsSlice.actions;

// Export reducer
export default paymentsSlice.reducer;
