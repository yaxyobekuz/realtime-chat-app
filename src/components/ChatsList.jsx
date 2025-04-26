import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Config
import { apiBaseUrl } from "../config";

// Socket
import { io } from "socket.io-client";
const socket = io(apiBaseUrl);

// Utils
import { formatTime } from "../utils/helpers";

const ChatsList = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchChats = async () => {
    setIsLoading(true);
    let loadingTime = 0;
    setTimeout(() => (loadingTime = 1), 200);

    await fetch(`${apiBaseUrl }/api/chats`)
      .then((response) => response.json())
      .then((data) => data && setChats(data))
      .finally(() => {
        if (loadingTime > 0) setIsLoading(false);
        else setTimeout(() => setIsLoading(false), 300);
      });

    socket.on("receiveChat", (data) => {
      setChats((prev) => [...prev, data]);
    });
  };

  useEffect(() => {
    fetchChats();
  }, []);

  if (isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
      <li
        key={index}
        className="flex items-center gap-3 py-2.5 px-5 animate-pulse"
      >
        <div className="shrink-0 size-12 bg-neutral-100 rounded-full" />

        {/* Details */}
        <div className="flex flex-col justify-center gap-2">
          <span className="inline-block w-36 h-[17px] bg-neutral-100 rounded" />

          <span className="inline-block w-24 h-4 bg-neutral-100 rounded" />
        </div>

        {/* Unanswered messages count */}
        <div className="shrink-0 size-8 bg-neutral-100 ml-auto rounded-full" />
      </li>
    ));
  }

  if (!chats?.length || chats?.length === 0) return;

  return chats.map((chat) => {
    const {
      id,
      createdAt,
      status = "Yangi",
      unansweredMessagesCount,
      user: { firstName, photo },
    } = chat;
    return (
      <li key={id}>
        <NavLink
          to={`/chat/${id}`}
          className="flex items-center gap-3 py-2.5 px-5 transition-colors duration-300 hover:bg-neutral-50"
        >
          {/* Avatar */}
          {photo ? (
            <img
              width={48}
              height={48}
              alt="User avatar"
              src={`${apiBaseUrl}${photo}`}
              className="bg-neutral-50 size-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center shrink-0 size-12 bg-gradient-to-tr from-green-300 to-green-300 rounded-full">
              <span className="text-xl text-white">
                {firstName?.length ? firstName[0] : "🗿"}
              </span>
            </div>
          )}

          {/* Details */}
          <div className="grow space-y-0.5">
            <h3 className="text-[17px] leading-6 font-medium line-clamp-1">
              {firstName}
            </h3>

            <div className="flex items-center justify-between w-full">
              <p className="text-neutral-400">{status}</p>
              <p className="text-neutral-400 text-sm">
                {formatTime(createdAt)}
              </p>
            </div>
          </div>

          {/* Unanswered messages count */}
          {unansweredMessagesCount !== 0 && (
            <div className="flex items-center justify-center shrink-0 size-8 bg-gradient-to-bl from-blue-300 to-blue-600 ml-auto rounded-full">
              <span className="h-[22px] inline-block text-white font-medium">
                {unansweredMessagesCount}
              </span>
            </div>
          )}
        </NavLink>
      </li>
    );
  });
};

export default ChatsList;
