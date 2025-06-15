import { useEffect, useState, useCallback, useMemo } from "react";

// Components
import Button from "../form/Button";

// UI components
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

// Helpers
import { formatDate } from "@/utils/helpers";

// Toast
import { toast } from "@/notification/toast";

// Hooks
import useModal from "@/hooks/useModal";
import useMediaQuery from "@/hooks/useMediaQuery";

// Services
import paymentService from "@/api/services/paymentService";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addNewPaymentToStore } from "@/store/features/paymentsSlice";

const PaymentDetails = () => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { close, isOpen, data } = useModal("paymentDetails");

  const chats = useSelector((state) => state.chats.data);
  const { chatId, paymentId } = data || {};

  // Memoized chat data
  const chatData = useMemo(() => {
    if (!chatId || !chats) return null;
    return chats.find(({ id }) => id === Number(chatId));
  }, [chatId, chats]);

  const firstName = chatData?.user?.firstName;

  const bodyComponent = <PaymentBody close={close} paymentId={paymentId} />;

  const headerContent = (
    <DialogHeader>
      <DialogTitle>To'lov ma'lumotlari</DialogTitle>
      <DialogDescription>
        {firstName} ning ba'tafsil to'lov ma'lumotlari.
      </DialogDescription>
    </DialogHeader>
  );

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={close}>
        <DialogContent className="sm:max-w-[425px]">
          {headerContent}
          {bodyComponent}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={close}>
      <DrawerContent>
        {headerContent}
        {bodyComponent}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <button variant="outline">Bekor qilish</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const PaymentBody = ({ close, paymentId }) => {
  const dispatch = useDispatch();
  const [payment, setPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const payments = useSelector((state) => state.payments);

  // Check if payment exists in store
  const existingPayment = useMemo(() => {
    return payments?.data?.find((p) => p?._id === paymentId);
  }, [payments?.data, paymentId]);

  const loadPaymentFromApi = useCallback(async () => {
    if (isLoading || !paymentId) return;

    setIsLoading(true);

    try {
      const response = await paymentService.getPayment(paymentId);

      if (!response.ok) {
        throw new Error("Failed to fetch payment");
      }

      setPayment(response.data);
      dispatch(addNewPaymentToStore(response.data));
    } catch (error) {
      toast.error("To'lov ma'lumotlarini yuklashda xatolik yuz berdi");
      console.error("Payment fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [paymentId, isLoading, dispatch]);

  useEffect(() => {
    if (!paymentId) return;
    if (existingPayment) setPayment(existingPayment);
    else loadPaymentFromApi();
  }, [paymentId, existingPayment, loadPaymentFromApi]);

  if (isLoading || !payment) return <LoadingState close={close} />;

  return <PaymentContent payment={payment} close={close} />;
};

// Loading component
const LoadingState = ({ close }) => (
  <div className="space-y-5">
    <div className="flex items-center justify-center py-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
        <p className="text-gray-600">Yuklanmoqda...</p>
      </div>
    </div>

    <Button onClick={close} className="w-32 ml-auto">
      Yaxshi
    </Button>
  </div>
);

// Payment content component
const PaymentContent = ({ payment, close }) => (
  <div className="space-y-5">
    <div className="space-y-3.5">
      {/* Payment image */}
      <div className="flex flex-col gap-1.5 items-end">
        <img
          width={375}
          height={128}
          alt="To'lov cheki"
          src={payment.photo.url}
          className="w-full h-32 rounded-lg object-cover bg-neutral-100"
          loading="lazy"
        />

        <span className="text-sm">{formatDate(payment.createdAt)}</span>
      </div>

      {/* Payment amount */}
      <p className="flex justify-between items-center">
        <b>To'lov:</b>
        <b>{payment?.amount}$</b>
      </p>

      {/* Payment description */}
      <p>
        <b>Izoh: </b>
        {payment?.description || "Izoh mavjud emas..."}
      </p>
    </div>

    <Button onClick={close} className="w-32 ml-auto">
      Yaxshi
    </Button>
  </div>
);

export default PaymentDetails;
