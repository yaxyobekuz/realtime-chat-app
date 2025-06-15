const endpoints = {
  // Payments
  getPayments: "/api/payments",
  createPayment: "/api/payments/new",
  getPayment: (id) => `/api/payments/payment/${id}`,
  getUserPayments: (userId) => `/api/payments/user/${userId}`,

  // Passports
  getPassports: "/api/passports",
  createPassport: "/api/passports/new",
  getUserPassports: (userId) => `/api/passports/user/${userId}`,

  // Tickets
  getTickets: "/api/tickets",
  createTicket: "/api/tickets/new",
  getTicket: (id) => `/api/tickets/ticket/${id}`,
  getUserTickets: (userId) => `/api/tickets/user/${userId}`,
  deleteTicketFile: (fileId) => `/api/tickets/file/${fileId}`,
  uploadTicketFile: (ticketId) => `/api/tickets/upload/${ticketId}`,
  sendTicketFileToUser: (ticketId) => `/api/tickets/send/${ticketId}`,

  // Chats
  getChats: "/api/chats",
  updateChatStatus: (chatId) => `/api/chats/chat/${chatId}/status`,
  getChatMessages: (chatId) => `/api/chats/chat/${chatId}/messages`,
  updateChatField: (id, fieldName) => {
    return `/api/chats/chat/${id}/update/${fieldName}`;
  },
};

export default endpoints;
