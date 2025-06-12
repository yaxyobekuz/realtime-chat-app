import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Helpers
import { formatDate } from "@/utils/helpers";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Components
import TicketSkeleton from "./skeleton/Ticket";

// Hooks
import useImageViewer from "@/hooks/useImageViewer";

// Icons
import TicketFileUploader from "./TicketFileUploader";

// Services
import ticketService from "@/api/services/ticketService";

const TicketPageBody = () => {
  const { ticketId } = useParams();
  const { viewImage } = useImageViewer();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadTicket = () => {
    setIsLoading(true);

    ticketService
      .getTicket(ticketId)
      .then((res) => {
        if (!res.ok) throw new Error();
        setTicket(res.data);
      })
      .catch((err) => {
        toast.error(err.message || "Chiptani yuklab bo'lmadi");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(loadTicket, []);

  // Ticket skeleton loader
  if (isLoading) return <TicketSkeleton />;

  // Error
  if (!ticket) return "Xatolik";

  const { file, passport, payment, user } = ticket;

  const handleViewImage = (type) => {
    if (type === "passport") {
      viewImage({ url: passport.photo.url, alt: "Pasport rasmi" });
    } else {
      viewImage({ url: payment.photo.url, alt: "To'lov cheki" });
    }
  };

  // Ticket content
  return (
    <div className="p-5 space-y-5">
      {/* Top */}
      <div className="grid grid-cols-3 gap-5">
        {/* File */}
        <div className="w-full bg-white p-2.5 rounded-20 border">
          <TicketFileUploader file={file} />
        </div>
        
        {/* Passport */}
        <div className="w-full bg-white p-2.5 rounded-20 border">
          {/* Wrapper */}
          <div className="relative w-full mb-3.5">
            {/* Date */}
            <div className="absolute top-5 right-5 bg-black/70 px-2.5 py-1 rounded-full text-white text-sm">
              {formatDate(passport.createdAt)}
            </div>

            {/* Image */}
            <img
              width={553}
              height={382}
              alt="To'lov cheki"
              src={passport?.photo?.url}
              onClick={() => handleViewImage("passport")}
              className="w-full h-96 aspect-square object-cover bg-neutral-50 rounded-xl"
            />

            {/* Overlay */}
            <div className="flex items-end justify-between absolute inset-x-0 bottom-0 w-full bg-gradient-to-b from-transparent to-black/90 p-5 rounded-b-xl">
              <h3 className="text-xl font-medium text-white">Passport</h3>
            </div>
          </div>

          {/* Description */}
          <p>{passport.description || "Izoh bildirilmagan"}</p>
        </div>

        {/* Payment */}
        <div className="w-full bg-white p-2.5 rounded-20 border">
          {/* Wrapper */}
          <div className="relative w-full mb-3.5">
            {/* Date */}
            <div className="absolute top-5 right-5 bg-black/70 px-2.5 py-1 rounded-full text-white text-sm">
              {formatDate(payment.createdAt)}
            </div>

            {/* Image */}
            <img
              width={553}
              height={382}
              alt="To'lov cheki"
              src={payment?.photo?.url}
              onClick={handleViewImage}
              className="w-full h-96 aspect-square object-cover bg-neutral-50 rounded-xl"
            />

            {/* Overlay */}
            <div className="flex items-end justify-between absolute inset-x-0 bottom-0 w-full bg-gradient-to-b from-transparent to-black/90 p-5 rounded-b-xl">
              <h3 className="text-xl font-medium text-white">To'lov cheki</h3>
              <span className="text-2xl font-semibold text-white">
                {payment.amount?.toLocaleString()}$
              </span>
            </div>
          </div>

          {/* Description */}
          <p>{payment.description || "Izoh bildirilmagan"}</p>
        </div>
      </div>

      {/* Mid */}
      <div className="grid grid-cols-2 gap-5">
        {/* User info */}
        <div className="w-full bg-white p-5 rounded-20 border">
          <h3 className="text-lg font-medium mb-3">Foydalanuvchi</h3>
          <p className="text-neutral-500">
            {user.firstName || "Foydalanuvchi ismi mavjud emas"}
          </p>
        </div>

        {/* Ticket description */}
        <div className="w-full bg-white p-5 rounded-20 border">
          <h3 className="text-lg font-medium mb-3">Qo'shimcha ma'lumotlar</h3>
          <p className="text-neutral-500">
            {ticket.description || "Izoh bildirilmagan"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TicketPageBody;
