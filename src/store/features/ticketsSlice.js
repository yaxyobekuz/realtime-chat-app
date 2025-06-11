import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { data: [], hasError: false, isLoading: true };

export const ticketsSlice = createSlice({
  initialState,
  name: "tickets",
  reducers: {
    updateTicketsFromStore: (state, action) => {
      state.data = action.payload;
    },

    addNewTicketToStore: (state, action) => {
      state.data.push(action.payload);
    },

    removeTicketFromStore: (state, action) => {
      state.data = state.data.filter(
        (ticket) => ticket.id !== action.payload
      );
    },

    updateSingleTicketInStore: (state, { payload }) => {
      const index = state.data.findIndex(
        (ticket) => ticket.id === payload.id
      );

      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...payload };
      }
    },

    setTicketsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setTicketsError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

// Export actions
export const {
  setTicketsError,
  setTicketsLoading,
  addNewTicketToStore,
  removeTicketFromStore,
  updateTicketsFromStore,
  updateSingleTicketInStore,
} = ticketsSlice.actions;

// Export reducer
export default ticketsSlice.reducer;
