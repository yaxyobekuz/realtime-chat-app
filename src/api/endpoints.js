const endpoints = {
  getChats: "/api/chats",
  getChatMessages: (chatId) => `/api/chats/chat/${chatId}/messages`,
};

export default endpoints;
