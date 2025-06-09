// Api config
import api from "../api";

// Endpoints
import endpoints from "../endpoints";

// Helpers
import { formatErrorMessage } from "@/utils/helpers";

const paymentService = {
  getPayments: async () => {
    try {
      const res = await api.get(endpoints.getPayments);
      if (!res.ok) throw new Error("To'lovlar mavjud emas");
      return res;
    } catch (error) {
      return formatErrorMessage(error);
    }
  },

  getPayment: async (id) => {
    return await api.get(endpoints.getPayment(id));
  },

  createPayment: async (data) => {
    return await api.post(endpoints.createPayment, data);
  },
};

export default paymentService;
