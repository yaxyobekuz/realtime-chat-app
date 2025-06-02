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

  createPayment: async (data) => {
    try {
      const res = await api.post(endpoints.createPayment, data);
      if (!res.ok) throw new Error("To'lovni yaratib bo'lmadi");
      return res;
    } catch (error) {
      return formatErrorMessage(error);
    }
  },
};

export default paymentService;
