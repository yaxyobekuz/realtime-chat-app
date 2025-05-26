import { useState } from "react";

// Hooks
import useMediaQuery from "@/hooks/useMediaQuery";

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
import statuses from "@/data/statuses";

// Body component
const Body = ({ defaultValue }) => {
  return (
    <div className="space-y-5 px-5 md:px-0">
      <ul className="max-h-64 overflow-y-auto hidden-scroll space-y-1.5">
        {statuses.map(({ color, label, value }, index) => {
          return (
            <li key={index}>
              <label>
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
      <button className="flex items-center justify-center w-full h-10 bg-gradient-to-tr from-blue-300 to-blue-600 rounded-lg text-white">
        O'zgartirish
      </button>
    </div>
  );
};

// Root component
const StatusDrawer = ({ firstName, defaultValue = "new" }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {/* Trigger */}
        <DialogTrigger className="flex items-center gap-4 w-full h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
          <svg
            fill="none"
            strokeWidth="1.5"
            className="size-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

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
          <Body defaultValue={defaultValue} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* Trigger */}
      <DrawerTrigger className="flex items-center gap-4 w-full h-12 px-5 transition-colors duration-300 hover:bg-neutral-50">
        <svg
          fill="none"
          strokeWidth="1.5"
          className="size-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>

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
        <Body defaultValue={defaultValue} />

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
