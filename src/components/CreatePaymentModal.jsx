import { useState } from "react";

// Components
import Input from "./form/Input";
import Button from "./form/Button";

// Ui components
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerContent,
} from "@/components/ui/drawer";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Hooks
import useModal from "@/hooks/useModal";
import useMediaQuery from "@/hooks/useMediaQuery";

// Services
import paymentService from "@/api/services/paymentService";

// Redux (Store)
import { useDispatch, useSelector } from "react-redux";
import { updateMessageInStore } from "@/store/features/messagesSlice";

const CreatePaymentModal = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { close, isOpen, data, isLoading, setLoading } = useModal("payment");

  // Chats
  const chats = useSelector((state) => state.chats.data);
  const { chatId, messageId, photoId } = data || {};

  // Chat
  const chat = chats.find(({ id }) => id === Number(chatId));
  const { firstName, id: userId } = chat?.user || {};

  const formData = { userId, photoId, messageId, chatId };

  const body = (
    <Body
      close={close}
      formData={formData}
      isLoading={isLoading}
      setLoading={setLoading}
    />
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="sm:max-w-[425px]">
          {/* Header */}
          <DialogHeader>
            <DialogTitle>To'lov ma'lumotlarini yaratish</DialogTitle>
            <DialogDescription>
              Siz ayni damda {firstName} uchun to'lov ma'lumotlarini
              yaratmoqdasiz.
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          {body}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={close}>
      <DrawerContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>To'lov ma'lumotlarini yaratish</DialogTitle>
          <DialogDescription>
            Siz ayni damda {firstName} uchun to'lov ma'lumotlarini
            yaratmoqdasiz.
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        {body}

        {/* Footer */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <button variant="outline">Bekor qilish</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const Body = ({ close, formData, isLoading, setLoading }) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    close();
    setLoading(true);
    formData = { ...formData, amount, description };

    toast.promise(
      paymentService
        .createPayment(formData)
        .then(({ data }) => {
          dispatch(
            updateMessageInStore({
              messagesId: data.chatId,
              messageId: data.messageId,
              data: { paymentId: data._id },
            })
          );
        })
        .finally(() => setLoading(false)),
      {
        error: "To'lov ma'lumotlari yaratilinmadi",
        success: "To'lov ma'lumotlari yaratilindi",
        loading: "To'lov ma'lumotlari yaratilmoqda...",
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Amount */}
      <Input
        required
        type="number"
        variant="gray"
        label="Qiymat"
        name="amount-input"
        placeholder="Qiymatni kiriting"
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      {/* Description */}
      <Input
        label="Izoh"
        variant="gray"
        type="textarea"
        name="description-input"
        placeholder="Ixitiyoriy"
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-5 w-full">
        {/* Cancel */}
        <Button onClick={close} className="w-32" variant="neutral">
          Bekor qilish
        </Button>

        {/* Action */}
        <Button type="submit" className="w-32">
          Yaratish
        </Button>
      </div>
    </form>
  );
};

export default CreatePaymentModal;
