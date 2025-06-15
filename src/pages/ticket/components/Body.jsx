import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Helpers
import { formatDate } from "@/utils/helpers";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Data
import ticketStatuses from "@/data/ticketStatuses";

// Hooks
import useModal from "@/hooks/useModal";
import useImageViewer from "@/hooks/useImageViewer";

// Services
import ticketService from "@/api/services/ticketService";

// Components
import TicketFileUploader from "./FileUploader";
import UserPhoto from "../../../components/UserPhoto";
import TicketSkeleton from "../../../components/skeleton/Ticket";

const Body = () => {
  const { ticketId } = useParams();
  const { viewImage } = useImageViewer();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { open: openModal } = useModal("sendTicket");

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

  const { file, passport, payment, user, _id: id, status } = ticket;
  const formattedStatus = ticketStatuses.find((s) => s.value === status);

  const handleViewImage = (type) => {
    if (type === "passport") {
      viewImage({ url: passport.photo.url, alt: "Pasport rasmi" });
    } else {
      viewImage({ url: payment.photo.url, alt: "To'lov cheki" });
    }
  };

  const handleFileUploaded = (fileData) => {
    setTicket((prev) => {
      let updatedStatus = prev.status;
      if (prev.status === "new" && fileData) updatedStatus = "readyToSend";
      if (prev.status === "readyToSend" && !fileData) updatedStatus = "new";
      return { ...prev, status: updatedStatus, file: fileData };
    });
  };

  const sendTicketFileToUser = () => {
    if (!file) return;
    openModal({ ticketId: id });
  };

  // Ticket content
  return (
    <div className="p-5 space-y-5">
      {/* Top */}
      <div className="grid grid-cols-3 gap-5">
        {/* File */}
        <div className="w-full bg-white p-5 rounded-20 border">
          <TicketFileUploader
            file={file}
            ticketId={id}
            onFileUploaded={handleFileUploaded}
          />
        </div>

        {/* Passport */}
        <div className="w-full bg-white p-5 rounded-20 border">
          {/* Wrapper */}
          <div className="relative w-full mb-3">
            {/* Date */}
            <div className="absolute left-5 bottom-5 bg-black/70 px-2.5 py-1 rounded-full text-white text-sm">
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
          </div>

          <h3 className="mb-1.5 text-lg font-medium">Passport</h3>

          {/* Description */}
          <p>{passport.description || "Izoh bildirilmagan"}</p>
        </div>

        {/* Payment */}
        <div className="w-full bg-white p-5 rounded-20 border">
          {/* Wrapper */}
          <div className="relative w-full mb-3">
            {/* Date */}
            <div className="absolute left-5 bottom-5 bg-black/70 px-2.5 py-1 rounded-full text-white text-sm">
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
          </div>

          <div className="flex items-end justify-between mb-1.5">
            <h3 className="text-lg font-medium">To'lov cheki</h3>
            <span className="text-lg font-semibold text-blue-500">
              {payment.amount?.toLocaleString()}$
            </span>
          </div>

          {/* Description */}
          <p>{payment.description || "Izoh bildirilmagan"}</p>
        </div>
      </div>

      {/* Mid */}
      <div className="grid grid-cols-3 gap-5">
        {/* Status & Action button */}
        <div className="flex items-center justify-between w-full bg-white p-5 rounded-20 border">
          <div className="">
            <h3 className="text-lg font-medium mb-3">Holat</h3>
            <p className={formattedStatus?.color}>
              {formattedStatus?.label || "Holat mavjud emas"}
            </p>
          </div>

          <button
            disabled={!file}
            onClick={sendTicketFileToUser}
            className="flex items-center justify-center h-12 px-5 bg-green-50 rounded-full text-green-600 transition-colors duration-200 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-50"
          >
            Chiptani yuborish
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3.5 w-full bg-white p-5 rounded-20 border">
          {/* User photo */}
          <UserPhoto
            user={user}
            url={user?.photo?.url}
            className="size-[68px] text-2xl"
          />

          {/* User info */}
          <div className="">
            <h3 className="text-lg font-medium mb-3">Foydalanuvchi</h3>
            <p className="text-neutral-500">
              {user.firstName || "Foydalanuvchi ismi mavjud emas"}
            </p>
          </div>
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

export default Body;
