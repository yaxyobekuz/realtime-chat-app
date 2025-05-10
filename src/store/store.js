import { configureStore } from "@reduxjs/toolkit";

// Features
import chatsSlice from "./features/chatsSlice";

export default configureStore({
  reducer: {
    chats: chatsSlice,
  },
});
