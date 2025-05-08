const endpoints = {
  getChats: "/api/chats",
  getChatMessages: (chatId) => `/api/chats/chat/${chatId}/messages`,

  // Messages
  updateMessageGroupField: (messageGroupId, fieldName) =>
    `/api/messages/${messageGroupId}/${fieldName}`,
};

export default endpoints;
