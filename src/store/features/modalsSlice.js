import { createSlice } from "@reduxjs/toolkit";

const initialModalData = { isOpen: false, data: null, isLoading: false };

// Initial state
const initialState = {
  payment: initialModalData,
  passport: initialModalData,
  sendTicket: initialModalData,
  imageViewer: initialModalData,
  createTicket: initialModalData,
  paymentDetails: initialModalData,
  passportDetails: initialModalData,
  deletePaymentDetails: initialModalData,
  deletePassportDetails: initialModalData,
  photoMessageContextMenu: initialModalData,
};

export const modalsSlice = createSlice({
  initialState,
  name: "modals",
  reducers: {
    openModal: (state, action) => {
      const { name, data = null } = action.payload;
      state[name] = { isOpen: true, data };
    },

    closeModal: (state, action) => {
      const name = action.payload;
      if (state[name]) state[name].isOpen = false;
    },

    closeAllModals: (state) => {
      for (const key in state) {
        state[key].data = null;
        state[key].isOpen = false;
      }
    },

    setModalLoading: (state, action) => {
      const { name, value } = action.payload;
      if (state[name]) state[name].isLoading = value;
    },
  },
});

// Export actions
export const { closeAllModals, closeModal, openModal, setModalLoading } =
  modalsSlice.actions;

// Export reducer
export default modalsSlice.reducer;
