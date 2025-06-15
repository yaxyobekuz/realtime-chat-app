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
import ticketService from "@/api/services/ticketService";

const SendTicketModal = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { close, isOpen, data, isLoading, setLoading } = useModal("sendTicket");

  const { ticketId } = data || {};
  const formData = { ticketId };

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
            <DialogTitle>Chiptani yuborish</DialogTitle>
            <DialogDescription>
              Siz ayni damda chiptani foydalanuvchiga yubormoqdasiz.
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
          <DialogTitle>Chiptani yuborish</DialogTitle>
          <DialogDescription>
            Siz ayni damda chiptani foydalanuvchiga yubormoqdasiz.
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
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    close();
    setLoading(true);
    formData = { ...formData, caption: description };

    toast.promise(
      ticketService
        .sendTicketFileToUser(formData.ticketId, formData)
        .finally(() => setLoading(false)),
      {
        error: "Chipta yuborilmadi",
        success: "Chipta yuborildi",
        loading: "Chipta yuborilmoqda...",
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
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
          Yuborish
        </Button>
      </div>
    </form>
  );
};

export default SendTicketModal;
