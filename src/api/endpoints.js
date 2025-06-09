const endpoints = {
  getChats: "/api/chats",
  updateChatStatus: (chatId) => `/api/chats/chat/${chatId}/status`,
  getChatMessages: (chatId) => `/api/chats/chat/${chatId}/messages`,
  updateChatField: (id, fieldName) => {
    return `/api/chats/chat/${id}/update/${fieldName}`;
  },

  // Payments
  getPayments: "/api/payments",
  createPayment: "/api/payments/new",

  // Passports
  getPassports: "/api/passports",
  createPayment: "/api/passports/new",
};

export default endpoints;
