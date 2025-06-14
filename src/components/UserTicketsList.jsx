import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Helpers
import { formatDate } from "@/utils/helpers";

// Components
import TableSkeleton from "./skeleton/Table";

// Services
import ticketService from "@/api/services/ticketService";

const UserTicketsList = () => {
  const { userId } = useParams();
  const [tickets, setTickets] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadTickets = () => {
    setIsLoading(true);

    ticketService
      .getUserTickets(userId)
      .then((res) => {
        if (!res.ok) throw new Error();
        setTickets(res.data);
      })
      .catch((err) => {
        toast.error(err.message || "Chiptalarni yuklab bo'lmadi");
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(loadTickets, []);

  // Skeleton loader
  if (isLoading) return <TableSkeleton />;

  // Tickets list
  return <List tickets={tickets} />;
};

const List = ({ tickets }) => {
  return (
    <div className="max-h-[calc(100%-64px)] overflow-y-auto p-5">
      <div className="rounded-20 overflow-hidden border">
        {/* No tickets */}
        {!tickets?.length || tickets?.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-white">
            <p className="text-neutral-500">Chiptalar mavjud emas</p>
          </div>
        ) : null}

        {/* Table */}
        {tickets?.length > 0 ? (
          <table className="table w-full">
            {/* Thead */}
            <thead>
              <tr className="h-14 bg-white border-b">
                {/* Status */}
                <th>Holat</th>

                {/* Ticket price */}
                <th>Chipta narxi</th>

                {/* Client name */}
                <th>Chipta egasi</th>

                {/* Account owner name */}
                <th>Hisob egasi</th>

                {/* Description */}
                <th>Izoh</th>

                {/* Date */}
                <th>Sana</th>

                {/* Actions */}
                <th className="w-40">Harakatlar</th>
              </tr>
            </thead>

            {/* Tbody */}
            <tbody>
              {tickets.map(
                ({
                  user,
                  name,
                  chatId,
                  payment,
                  _id: id,
                  createdAt,
                  description,
                }) => (
                  <tr key={id} className="h-12 odd:bg-white/50">
                    {/* Client name */}
                    <td className="text-green-500 border-r">Aktiv</td>

                    {/* Ticket price */}
                    <td className="text-blue-500 border-x">
                      {payment.amount?.toLocaleString()}$
                    </td>

                    {/* Client name */}
                    <td className="border-x">{name}</td>

                    {/* Account owner name */}
                    <td className="border-x">
                      <Link
                        to={`/chats/chat/${chatId}`}
                        className="transition-colors duration-200 hover:text-blue-500"
                      >
                        {user.firstName}
                      </Link>
                    </td>

                    {/* Description */}
                    <td className="border-x">{description}</td>

                    {/* Date */}
                    <td className="border-x">{formatDate(createdAt)}</td>

                    {/* Link */}
                    <td className="border-l">
                      <Link
                        to={`/tickets/ticket/${id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Ba'tafsil
                      </Link>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default UserTicketsList;
