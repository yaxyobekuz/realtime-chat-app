const endpoints = {
  // Passports
  getPassports: "/api/passports",
  createPassport: "/api/passports/new",

  // Payments
  getPayments: "/api/payments",
  createPayment: "/api/payments/new",
  getPayment: (id) => `/api/payments/payment/${id}`,

  // Chats
  getChats: "/api/chats",
  updateChatStatus: (chatId) => `/api/chats/chat/${chatId}/status`,
  getChatMessages: (chatId) => `/api/chats/chat/${chatId}/messages`,
  updateChatField: (id, fieldName) => {
    return `/api/chats/chat/${id}/update/${fieldName}`;
  },
};

export default endpoints;
