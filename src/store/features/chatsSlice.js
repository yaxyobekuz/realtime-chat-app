import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  data: [],
  isLoading: true,
  hasError: false,
};

export const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    updateChatsFromStore: (state, action) => {
      state.data = action.payload;
    },

    addNewChatToStore: (state, action) => {
      state.data.push(action.payload);
    },

    removeChatFromStore: (state, action) => {
      state.data = state.data.filter((chat) => chat.id !== action.payload);
    },

    updateSingleChatInStore: (state, { payload }) => {
      const index = state.data.findIndex((chat) => chat.id === payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...payload };
      }
    },

    setChatsLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setChatsError: (state, action) => {
      state.hasError = action.payload;
    },
  },
});

// Export actions
export const {
  setChatsError,
  setChatsLoading,
  addNewChatToStore,
  removeChatFromStore,
  updateChatsFromStore,
  updateSingleChatInStore,
} = chatsSlice.actions;

// Export reducer
export default chatsSlice.reducer;
