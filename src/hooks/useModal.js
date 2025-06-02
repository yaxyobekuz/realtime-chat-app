import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "@/store/features/modalsSlice";

const useModal = (name) => {
  const dispatch = useDispatch();
  const modal = useSelector(
    (state) => state.modals[name] || { isOpen: false, data: null }
  );

  const open = (data = null) => {
    dispatch(openModal({ name, data }));
  };

  const close = () => {
    dispatch(closeModal(name));
  };

  return { open, close, isOpen: modal.isOpen, data: modal.data };
};

export default useModal;
