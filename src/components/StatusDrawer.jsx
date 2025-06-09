import { useState } from "react";

// Components
import Icon from "./Icon";

// Ui components
import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerTitle,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerTrigger,
  DrawerDescription,
} from "@/components/ui/drawer";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Hooks
import useMediaQuery from "@/hooks/useMediaQuery";

// Images
import reloadIcon from "../assets/icons/outline/reload.svg";

// Data
import statuses from "@/data/statuses";
import chatService from "@/api/services/chatService";

// Redux (Store)
import { useDispatch } from "react-redux";
import { updateSingleChatInStore } from "@/store/features/chatsSlice";

// Body component
const Body = ({ chatId, closeDialog, defaultValue }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(defaultValue);

  const updateStatus = async () => {
    if (isLoading || defaultValue === status) return;

    closeDialog();

    // Set loader
    setIsLoading(true);

    // Load
    toast.promise(
      chatService
        .updateChatStatus(chatId, { status })
        .then(({ ok, data }) => {
          if (ok) {
            dispatch(
              updateSingleChatInStore({
                id: chatId,
                status: data.updatedStatus,
              })
            );
          } else {
            throw new Error();
          }
        })
        .finally(() => setIsLoading(false)),
      {
        error: "Chat holati o'zgartirilmadi",
        success: "Chat holati o'zgartirildi",
        loading: "Chat holati o'zgartirilmoqda...",
      }
    );
  };

  return (
    <div className="space-y-5 px-5 md:px-0">
      <ul className="max-h-64 overflow-y-auto hidden-scroll space-y-1.5">
        {statuses.map(({ label, value }, index) => {
          return (
            <li key={index}>
              <label
                onClick={() => setStatus(value)}
                className="cursor-pointer"
              >
                {/* Hidden radio input */}
                <input
                  name="status"
                  type="radio"
                  className="peer hidden"
                  defaultChecked={defaultValue === value}
                />

                {/* Virtual radio input */}
                <div className="bg-neutral-100 rounded-lg px-3.5 py-2 transition-colors duration-200 peer-checked:bg-blue-100 peer-checked:text-blue-500 hover:text-blue-500">
                  {label}
                </div>
              </label>
            </li>
          );
        })}
      </ul>

      {/* Action button */}
      <button
        onClick={updateStatus}
        disabled={isLoading || defaultValue === status}
        className="flex items-center justify-center w-full h-10 bg-gradient-to-tr from-blue-300 to-blue-600 rounded-lg text-white transition-colors duration-200 disabled:opacity-70"
      >
        O'zgartirish
      </button>
    </div>
  );
};

// Root component
const StatusDrawer = ({ chatId, firstName, defaultValue = "new" }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger */}
        <DialogTrigger className="flex items-center gap-4 w-full h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
          <Icon src={reloadIcon} alt="Reload" />
          <span>Holatni o'zgartirish</span>
        </DialogTrigger>

        {/* Content */}
        <DialogContent className="sm:max-w-[425px]">
          {/* Header */}
          <DialogHeader>
            <DialogTitle>Holatni o'zgartirish</DialogTitle>
            <DialogDescription>
              Ayni damda siz {firstName} ning holatini o'zgartirmoqdasiz.
            </DialogDescription>
          </DialogHeader>

          {/* Body */}
          <Body
            chatId={chatId}
            defaultValue={defaultValue}
            closeDialog={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DrawerTrigger className="flex items-center gap-4 w-full h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
        <Icon src={reloadIcon} alt="Reload" />
        <span>Holatni o'zgartirish</span>
      </DrawerTrigger>

      {/* Content */}
      <DrawerContent>
        {/* Header */}
        <DialogHeader>
          <DialogTitle>Holatni o'zgartirish</DialogTitle>
          <DialogDescription>
            Ayni damda siz {firstName} ning holatini o'zgartirmoqdasiz.
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <Body
          chatId={chatId}
          defaultValue={defaultValue}
          closeDialog={() => setOpen(false)}
        />

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

export default StatusDrawer;
