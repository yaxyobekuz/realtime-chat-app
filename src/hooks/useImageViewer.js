import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "@/store/features/modalsSlice";

const useImageViewer = () => {
  const dispatch = useDispatch();
  const modal = useSelector(
    (state) => state.modals.imageViewer || { isOpen: false, data: null }
  );

  const close = () => dispatch(closeModal("imageViewer"));

  const viewImage = (image) => {
    dispatch(openModal({ name: "imageViewer", data: image }));
  };

  const { isOpen, data: image } = modal || {};

  return { viewImage, close, image, isOpen };
};

export default useImageViewer;
