import { NavLink, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { apiBaseUrl } from "../config";
import { io } from "socket.io-client";
import { formatTime } from "../utils/helpers";

import whistleAudio from "../assets/sounds/whistle.mp3";

const socket = io(apiBaseUrl);

const ChatsList = () => {
  const [chats, setChats] = useState([]);
  const { chatId: currentChatId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [whistle] = useState(new Audio(whistleAudio));

  useEffect(() => {
    let timeoutId;

    const fetchChats = async () => {
      setIsLoading(true);

      timeoutId = setTimeout(() => setIsLoading(true), 200); // small delay for loading animation

      try {
        const res = await fetch(`${apiBaseUrl}/api/chats`);
        const data = await res.json();
        if (data) setChats(data);
      } catch (err) {
        console.error("Error fetching chats:", err);
      } finally {
        clearTimeout(timeoutId);
        setTimeout(() => setIsLoading(false), 300);
      }
    };

    fetchChats();

    const handleReceiveChat = (newChat) => {
      setChats((prev) => [...prev, newChat]);
    };

    const handleUnansweredCount = ({ chatId, count }) => {
      const isCurrent = (chat) => Number(chat.id) === Number(chatId);
      const newCount = (chat) => ({ ...chat, unansweredMessagesCount: count });

      setChats((prev) =>
        prev.map((chat) => (isCurrent(chat) ? newCount(chat) : chat))
      );

      if (count === 0 || Number(currentChatId) === Number(chatId)) return;

      whistle.play();
    };

    socket.on("receiveChat", handleReceiveChat);
    socket.on("unansweredMessagesCount", handleUnansweredCount);

    return () => {
      socket.off("receiveChat", handleReceiveChat);
      socket.off("unansweredMessagesCount", handleUnansweredCount);
    };
  }, []);

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 8 }).map((_, index) => (
          <li
            key={index}
            className="flex items-center gap-3 h-[70px] px-5 animate-pulse"
          >
            <div className="shrink-0 size-12 bg-neutral-100 rounded-full" />
            <div className="flex flex-col justify-center gap-2">
              <span className="inline-block w-36 h-[17px] bg-neutral-100 rounded" />
              <span className="inline-block w-24 h-4 bg-neutral-100 rounded" />
            </div>
            <div className="shrink-0 size-8 bg-neutral-100 ml-auto rounded-full" />
          </li>
        ))}
      </>
    );
  }

  if (!chats.length) return null;

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
          {photo ? (
            <img
              width={48}
              height={48}
              alt="User avatar"
              src={photo.url}
              className="bg-neutral-50 size-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center shrink-0 size-12 bg-gradient-to-tr from-green-300 to-green-300 rounded-full">
              <span className="text-xl text-white">
                {firstName?.[0] || "🗿"}
              </span>
            </div>
          )}

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

          <div
            className={`${
              unansweredMessagesCount === 0
                ? "bg-neutral-100 text-neutral-300"
                : "bg-gradient-to-bl from-blue-300 to-blue-600 text-white"
            } flex items-center justify-center shrink-0 size-8  ml-auto rounded-full`}
          >
            <span className="h-[22px] inline-block font-medium">
              {unansweredMessagesCount}
            </span>
          </div>
        </NavLink>
      </li>
    );
  });
};

export default ChatsList;
