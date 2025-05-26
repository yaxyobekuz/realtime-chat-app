const endpoints = {
  getChats: "/api/chats",
  updateChatStatus: (chatId) => `/api/chats/chat/${chatId}/status`,
  getChatMessages: (chatId) => `/api/chats/chat/${chatId}/messages`,

  // Messages
  updateMessageGroupField: (messageGroupId, fieldName) =>
    `/api/messages/${messageGroupId}/${fieldName}`,
};

export default endpoints;
