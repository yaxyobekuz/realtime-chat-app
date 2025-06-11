// Api config
import api from "../api";

// Endpoints
import endpoints from "../endpoints";

// Helpers
import { formatErrorMessage } from "@/utils/helpers";

const ticketService = {
  getTickets: async () => {
    try {
      const res = await api.get(endpoints.getTickets);
      if (!res.ok) throw new Error("Chiptalar mavjud emas");
      return res;
    } catch (error) {
      return formatErrorMessage(error);
    }
  },

  getUserTickets: async (userId) => {
    return await api.get(endpoints.getUserTickets(userId));
  },

  getTicket: async (id) => {
    return await api.get(endpoints.getTicket(id));
  },

  createTicket: async (data) => {
    return await api.post(endpoints.createTicket, data);
  },
};

export default ticketService;
