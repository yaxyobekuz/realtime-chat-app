// Api config
import api from "../api";

// Endpoints
import endpoints from "../endpoints";

// Helpers
import { formatErrorMessage } from "@/utils/helpers";

const chatService = {
  getChatMessages: async (chatId) => {
    try {
      const chat = await api.get(endpoints.getChatMessages(chatId));
      if (!chat.messages) throw new Error("Chat xabarlari mavjud emas");
      return { ok: true, data: chat };
    } catch (error) {
      return formatErrorMessage(error);
    }
  },

  getChats: async () => {
    try {
      const chats = await api.get(endpoints.getChats);
      if (!chats.length) throw new Error("Chatlar mavjud emas");
      return { ok: true, data: chats };
    } catch (error) {
      return formatErrorMessage(error);
    }
  },
};

export default chatService;
