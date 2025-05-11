import { configureStore } from "@reduxjs/toolkit";

// Features
import chatsSlice from "./features/chatsSlice";
import messagesSlice from "./features/messagesSlice";

export default configureStore({
  reducer: {
    chats: chatsSlice,
    messages: messagesSlice,
  },
});
