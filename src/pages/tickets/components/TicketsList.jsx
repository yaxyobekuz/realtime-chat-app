import { Link } from "react-router-dom";
import React, { useEffect } from "react";

// Toast (Notification)
import { toast } from "@/notification/toast";

// Helpers
import { formatDate } from "@/utils/helpers";

// Ticket statuses
import ticketStatuses from "@/data/ticketStatuses";

// Redux (Store)
import {
  setTicketsLoading,
  updateTicketsFromStore,
} from "@/store/features/ticketsSlice";
import { useDispatch, useSelector } from "react-redux";

// Services
import ticketService from "@/api/services/ticketService";

// Components
import TableSkeleton from "../../../components/skeleton/Table";

const TicketsList = () => {
  const dispatch = useDispatch();
  const { isLoading, data: tickets } = useSelector((state) => state.tickets);

  const loadTickets = () => {
    dispatch(setTicketsLoading(true));

    ticketService
      .getTickets()
      .then((res) => {
        if (!res.ok) throw new Error();
        dispatch(updateTicketsFromStore(res.data));
      })
      .catch((err) => {
        toast.error(err.message || "Chiptalarni yuklab bo'lmadi");
      })
      .finally(() => dispatch(setTicketsLoading(false)));
  };

  useEffect(() => {
    if (tickets.length === 0) {
      loadTickets();
    } else {
      dispatch(setTicketsLoading(false));
    }
  }, []);

  // Skeleton loader
  if (isLoading) return <TableSkeleton />;

  // Tickets list
  return <List tickets={tickets} />;
};

const List = ({ tickets }) => {
  return (
    <div className="max-h-[calc(100%-64px)] overflow-y-auto p-5">
      <div className="rounded-20 overflow-hidden border">
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
                status,
                payment,
                _id: id,
                createdAt,
                description,
              }) => {
                const formattedStatus = ticketStatuses.find(
                  (s) => s.value === status
                );

                return (
                  <tr key={id} className="h-12 odd:bg-white/50">
                    {/* CStatus */}
                    <td className={`${formattedStatus?.color} border-r`}>
                      {formattedStatus?.label || "Holat mavjud emas"}
                    </td>

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
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TicketsList;
