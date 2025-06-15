import React, { useEffect } from "react";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Hooks
import useImageViewer from "@/hooks/useImageViewer";

// Redux (Store)
import {
  setPaymentsLoading,
  updatePaymentsFromStore,
} from "@/store/features/paymentsSlice";
import { useDispatch, useSelector } from "react-redux";

// Helpers
import { formatDate, formatTime } from "@/utils/helpers";

// Services
import paymentService from "@/api/services/paymentService";

// Components
import PaymentsSkeleton from "../../../components/skeleton/Payments";

const PaymentsList = () => {
  const dispatch = useDispatch();
  const { isLoading, data: payments } = useSelector((state) => state.payments);

  const loadPayments = () => {
    dispatch(setPaymentsLoading(true));

    paymentService
      .getPayments()
      .then((res) => {
        if (!res.ok) throw new Error();
        dispatch(updatePaymentsFromStore(res.data));
      })
      .catch((err) => {
        toast.error(err.message || "To'lovlarni yuklab bo'lmadi");
      })
      .finally(() => dispatch(setPaymentsLoading(false)));
  };

  useEffect(() => {
    if (payments.length === 0) {
      loadPayments();
    } else {
      dispatch(setPaymentsLoading(false));
    }
  }, []);

  // Skeleton loader
  if (isLoading) return <PaymentsSkeleton />;

  // Payments list
  return <List payments={payments} />;
};

export default PaymentsList;

const List = ({ payments }) => {
  const { viewImage } = useImageViewer();

  return (
    <ul className="grid grid-cols-6 gap-5 max-h-[calc(100%-64px)] overflow-y-auto p-5">
      {payments.map(({ _id: id, photo, createdAt, user, amount }) => {
        const url = photo.url;
        return (
          <li key={id} className="w-full bg-white p-2.5 rounded-20 border">
            {/* Image */}
            <div className="relative w-full mb-1.5">
              <img
                width={256}
                height={256}
                loading="lazy"
                src={photo.url}
                alt="To'lov cheki"
                onClick={() => viewImage({ url, alt: "To'lov cheki" })}
                className="w-full h-auto aspect-square object-cover bg-neutral-100 rounded-xl"
              />

              <div className="flex gap-1.5 absolute bottom-2 right-2">
                {/* Time */}
                <div className="bg-black/65 h-6 px-1.5 rounded-full">
                  <span className="text-sm leading-none text-white">
                    {formatTime(createdAt)}
                  </span>
                </div>

                {/* Date */}
                <div className="bg-black/65 h-6 px-1.5 rounded-full">
                  <span className="text-sm leading-none text-white">
                    {formatDate(createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start justify-between">
              <h3 className="break-words text-lg font-medium">
                {user.firstName}
              </h3>

              <span className="inline-block text-lg font-medium text-blue-500">
                {amount?.toLocaleString()}$
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
