import toaster from "react-hot-toast";

const initialOptions = {
  position: "top-center",
  style: {
    color: "#333",
    fontSize: "14px",
    padding: "6px 8px",
    background: "#fff",
    borderRadius: "8px",
    fontWeight: "medium",
  },
};

export const toast = (msg = "Bildirishnoma", options = {}, icon = "😊") => {
  toaster(msg + "!", {
    icon,
    ...initialOptions,
    ...options,
  });
};

toast.success = (msg = "Muvaffaqiyatli", options = {}) => {
  toaster.success(msg + "!", { ...initialOptions, ...options });
};

toast.error = (msg = "Xatolik", options = {}) => {
  toaster.error(msg + "!", { ...initialOptions, ...options });
};

toast.promise = (
  action,
  msg = {
    loading: "Yuklanmoqda...",
    success: "Muvaffaqiyatli!",
    error: "Xatolik!",
  },
  options = {}
) => {
  toaster.promise(action, msg, { ...initialOptions, ...options });
};
