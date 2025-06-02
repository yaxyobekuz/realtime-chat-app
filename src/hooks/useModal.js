import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
  setModalLoading,
} from "@/store/features/modalsSlice";

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

  const setLoading = (value) => {
    dispatch(setModalLoading({ name, value }));
  };

  const { isOpen, data, isLoading } = modal || {};

  return { open, close, isOpen, data, isLoading, setLoading };
};

export default useModal;
