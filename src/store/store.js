import { configureStore } from "@reduxjs/toolkit";

// Features
import chatsSlice from "./features/chatsSlice";
import modalsSlice from "./features/modalsSlice";
import messagesSlice from "./features/messagesSlice";

export default configureStore({
  reducer: {
    chats: chatsSlice,
    modals: modalsSlice,
    messages: messagesSlice,
  },
});
