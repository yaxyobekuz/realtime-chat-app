import { configureStore } from "@reduxjs/toolkit";

// Features
import chatsSlice from "./features/chatsSlice";
import modalsSlice from "./features/modalsSlice";
import ticketsSlice from "./features/ticketsSlice";
import messagesSlice from "./features/messagesSlice";
import paymentsSlice from "./features/paymentsSlice";
import passportsSlice from "./features/passportsSlice";

export default configureStore({
  reducer: {
    chats: chatsSlice,
    modals: modalsSlice,
    tickets: ticketsSlice,
    messages: messagesSlice,
    payments: paymentsSlice,
    passports: passportsSlice,
  },
});
