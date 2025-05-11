import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: {},
  hasError: {},
  isLoading: {},
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addNewChatMessagesToStore: (state, { payload }) => {
      state.data[payload.id] = payload;
    },

    removeChatMessagesFromStore: (state, { payload }) => {
      delete state.data[payload];
    },

    addNewMessageToStore: (state, { payload }) => {
      const { chatId, message } = payload;
      if (!state.data[chatId]) return;

      const data = [...(state.data[chatId].messages || []), message];
      state.data[chatId].messages = data;
    },

    updateSingleChatMessagesInStore: (state, { payload }) => {
      const prev = state.data[payload.id];
      if (!prev) return;
      state.data[payload.id] = { ...prev, ...payload };
    },

    setChatMessagesLoading: (state, { payload }) => {
      state.isLoading[payload.id] = payload.value ?? false;
    },

    setChatMessagesError: (state, { payload }) => {
      state.hasError[payload.id] = payload.value ?? false;
    },
  },
});

// Export actions
export const {
  setChatMessagesError,
  addNewMessageToStore,
  setChatMessagesLoading,
  addNewChatMessagesToStore,
  removeChatMessagesFromStore,
  updateSingleChatMessagesInStore,
} = messagesSlice.actions;

// Export reducer
export default messagesSlice.reducer;
