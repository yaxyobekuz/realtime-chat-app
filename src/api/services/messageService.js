// Api config
import api from "../api";

// Endpoints
import endpoints from "../endpoints";

// Helpers
import { formatErrorMessage } from "@/utils/helpers";

const messageService = {
  updateMessageGroupField: async (messageGroupId, fieldName, newId) => {
    try {
      const res = await api.put(
        endpoints.updateMessageGroupField(messageGroupId, fieldName),
        { id: newId }
      );
      return { ok: true, data: res };
    } catch (error) {
      return formatErrorMessage(error);
    }
  },
};

export default messageService;
