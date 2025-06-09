// Api config
import api from "../api";

// Endpoints
import endpoints from "../endpoints";

// Helpers
import { formatErrorMessage } from "@/utils/helpers";

const passportService = {
  getPassports: async () => {
    try {
      const res = await api.get(endpoints.getPassports);
      if (!res.ok) throw new Error("Pasportlar mavjud emas");
      return res;
    } catch (error) {
      return formatErrorMessage(error);
    }
  },

  createPassport: async (data) => {
    return await api.post(endpoints.createPassport, data);
  },
};

export default passportService;
