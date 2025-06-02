import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = { data: {}, hasError: {}, isLoading: {} };

export const messagesSlice = createSlice({
  initialState,
  name: "messages",
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

    updateMessageInStore: (state, { payload }) => {
      const { messagesId, messageId, data } = payload;
      const messageList = state.data[messagesId]?.messages;
      if (!messageList) return console.log("Messages is not defined");

      const message = messageList.find(({ _id }) => _id === messageId);
      if (!message) return console.log("Message is not defined");

      Object.assign(message, data);
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
  updateMessageInStore,
  setChatMessagesError,
  addNewMessageToStore,
  setChatMessagesLoading,
  addNewChatMessagesToStore,
  removeChatMessagesFromStore,
} = messagesSlice.actions;

// Export reducer
export default messagesSlice.reducer;
