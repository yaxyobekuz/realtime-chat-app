import { useEffect, useState } from "react";

// Components
import Icon from "../Icon";
import Input from "../form/Input";
import Button from "../form/Button";

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
import useImageViewer from "@/hooks/useImageViewer";

// Services
import ticketService from "@/api/services/ticketService";
import paymentService from "@/api/services/paymentService";
import passportService from "@/api/services/passportService";

// Redux (Store)
import { useDispatch } from "react-redux";
import { addNewTicketToStore } from "@/store/features/ticketsSlice";

const CreateTicket = () => {
  const modal = useModal("createTicket");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { close, isOpen, data, isLoading, setLoading } = modal;

  const { chatId, user } = data || {};
  const { firstName, _id: userId } = user || {};
  const formData = { userId, chatId, firstName };

  // Body component
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
            <DialogTitle>Chipta yaratish</DialogTitle>
            <DialogDescription>
              Siz ayni damda {firstName} uchun chipta yaratmoqdasiz.
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
          <DialogTitle>Chipta yaratish</DialogTitle>
          <DialogDescription>
            Siz ayni damda {firstName} uchun chipta yaratmoqdasiz.
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
  const [paymentId, setPaymentId] = useState(null);
  const [passportId, setPassportId] = useState(null);
  const [description, setDescription] = useState("");
  const [name, setName] = useState(formData.firstName || "");
  const isInvalid =
    !passportId || !paymentId || !name || !description || isLoading;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isInvalid) return;

    close();
    setLoading(true);
    formData = { ...formData, description, paymentId, passportId, name };

    toast.promise(
      ticketService
        .createTicket(formData)
        .then((res) => {
          if (!res.ok) throw Error();
          dispatch(addNewTicketToStore(res.data));
        })
        .finally(() => setLoading(false)),
      {
        error: "Chipta yaratilinmadi",
        success: "Chipta yaratilindi",
        loading: "Chipta yaratilmoqda...",
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-h-72 overflow-y-auto hidden-scroll space-y-5"
    >
      {/* Name */}
      <Input
        required
        value={name}
        variant="gray"
        name="name-input"
        label="Foydalanuvchi"
        placeholder="Foydalanuvchi"
        onChange={(e) => setName(e.target.value)}
      />

      {/* Passport*/}
      <div className="space-y-2">
        <div className="font-medium text-neutral-700">
          Pasport <span className="text-blue-500">*</span>
        </div>
        <Passports userId={formData.userId} onChange={setPassportId} />
      </div>

      {/* Payments */}
      <div className="space-y-2">
        <div className="font-medium text-neutral-700">
          To'lov <span className="text-blue-500">*</span>
        </div>
        <Payments userId={formData.userId} onChange={setPaymentId} />
      </div>

      {/* Description */}
      <Input
        required
        label="Izoh"
        variant="gray"
        type="textarea"
        value={description}
        name="description-input"
        placeholder="Chipta ma'lumotlari"
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex justify-end gap-5 w-full">
        {/* Cancel */}
        <Button onClick={close} className="w-32" variant="neutral">
          Bekor qilish
        </Button>

        {/* Action */}
        <Button type="submit" className="w-32" disabled={isInvalid}>
          Yaratish
        </Button>
      </div>
    </form>
  );
};

const Passports = ({ userId, onChange }) => {
  const { viewImage } = useImageViewer();
  const [passports, setPassports] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserPassports = () => {
    passportService
      .getUserPassports(userId)
      .then((res) => {
        if (!res.ok) throw new Error();
        if (res.data.length !== 0) setPassports(res.data);
      })
      .catch((err) => {
        toast.error(err.message || "Pasportlarni yuklab bo'lmadi");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadUserPassports();
  }, []);

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="max-w-full w-full overflow-x-auto hidden-scroll">
        <div className="flex gap-3.5 min-w-max">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <div
                key={index}
                className="shrink-0 size-28 bg-neutral-100 rounded-lg"
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Error
  if (!passports) return "Xatolik";

  // Passports
  return (
    <div className="max-w-full w-full overflow-x-auto hidden-scroll">
      <div className="flex gap-3.5 min-w-max">
        {passports.map(({ photo, _id: id, ticket }, index) => {
          const handleViewImage = () => {
            viewImage({ url: photo.url, alt: "Pasport rasmi" });
          };
          return (
            <label key={index} className={ticket ? "opacity-50" : null}>
              <input
                value={id}
                type="radio"
                name="passport"
                disabled={ticket}
                className="peer hidden"
                onChange={(e) => onChange(e.target.value)}
              />

              <Icon
                loading="lazy"
                src={photo.url}
                onDoubleClick={handleViewImage}
                className="shrink-0 size-28 aspect-square object-cover rounded-lg transition-colors duration-200 border-[3px] border-gray peer-checked:border-blue-500"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

const Payments = ({ userId, onChange }) => {
  const { viewImage } = useImageViewer();
  const [payments, setPayments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserPayments = () => {
    paymentService
      .getUserPayments(userId)
      .then((res) => {
        if (!res.ok) throw new Error();
        if (res.data.length !== 0) setPayments(res.data);
      })
      .catch((err) => {
        toast.error(err.message || "Pasportlarni yuklab bo'lmadi");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadUserPayments();
  }, []);

  // Skeleton loader
  if (isLoading) {
    return (
      <div className="max-w-full w-full overflow-x-auto hidden-scroll">
        <div className="flex gap-3.5 min-w-max">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <div
                key={index}
                className="shrink-0 size-28 bg-neutral-100 rounded-lg"
              />
            );
          })}
        </div>
      </div>
    );
  }

  // Error
  if (!payments) return "Xatolik";

  // Payments
  return (
    <div className="max-w-full w-full overflow-x-auto hidden-scroll">
      <div className="flex gap-3.5 min-w-max">
        {payments.map(({ photo, _id: id }, index) => {
          const handleViewImage = () => {
            viewImage({ url: photo.url, alt: "To'lov rasmi" });
          };
          return (
            <label key={index}>
              <input
                value={id}
                type="radio"
                name="payment"
                className="peer hidden"
                onChange={(e) => onChange(e.target.value)}
              />

              <Icon
                loading="lazy"
                src={photo.url}
                onDoubleClick={handleViewImage}
                className="shrink-0 size-28 aspect-square object-cover rounded-lg transition-colors duration-200 border-[3px] border-gray peer-checked:border-blue-500"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CreateTicket;
