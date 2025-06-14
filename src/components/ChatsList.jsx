import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

// Components
import UserPhoto from "./UserPhoto";

// Socket
import { io } from "socket.io-client";

// Api base url
import { apiBaseUrl } from "../config";

// Data
import statuses from "@/data/statuses";

// Notification
import { toast } from "@/notification/toast";

// Helpers
import { formatTime } from "../utils/helpers";

// Services
import chatService from "@/api/services/chatService";

// Redux (Store)
import {
  setChatsError,
  setChatsLoading,
  addNewChatToStore,
  updateChatsFromStore,
  updateSingleChatInStore,
} from "@/store/features/chatsSlice";
import { useDispatch, useSelector } from "react-redux";

// Whistle notification sound for notification 🗿
import whistleAudio from "../assets/sounds/whistle.mp3";

const ChatsList = ({ chatStatus }) => {
  const socket = io(apiBaseUrl);
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);
  const [whistle] = useState(new Audio(whistleAudio));

  // Load chats from DB
  const loadChats = async () => {
    dispatch(setChatsError(false));
    dispatch(setChatsLoading(true));

    // Load
    const res = await chatService.getChats();

    if (res.ok) {
      dispatch(updateChatsFromStore(res.data));
    } else {
      toast.error(res.message);
      dispatch(setChatsError(true));
    }

    // Remove loader
    dispatch(setChatsLoading(false));
  };

  useEffect(() => {
    if (chats.data.length > 0 || chats.isLoading) return;

    loadChats();

    const handleReceiveChat = (newChat) => {
      dispatch(addNewChatToStore(newChat));
    };

    const handleUnansweredCount = ({ chatId, count }) => {
      const payload = { id: Number(chatId), unansweredMessagesCount: count };
      dispatch(updateSingleChatInStore(payload));

      if (count !== 0) whistle.play();
    };

    socket.on("receiveChat", handleReceiveChat);
    socket.on("unansweredMessagesCount", handleUnansweredCount);
  }, []);

  // Loading
  if (chats.isLoading) {
    return Array.from({ length: 8 }).map((_, index) => (
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
    ));
  }

  // Error
  if (chats.hasError) return <div className="p-4">Chatlar yuklanmadi!</div>;

  // Filter chats by status
  const filteredChats = (() => {
    if (!chatStatus) return chats.data;
    return chats.data.filter(({ status }) => status === chatStatus);
  })();

  // Chats
  return filteredChats.map((chat) => {
    const {
      id,
      user,
      createdAt,
      status = "Yangi",
      unansweredMessagesCount,
    } = chat;

    const formattedStatus = statuses.find(({ value }) => value === status);

    return (
      <li key={id}>
        <NavLink
          to={`/chats/chat/${id}`}
          className="flex items-center gap-3 py-2.5 px-5 transition-colors duration-300 hover:bg-neutral-50"
        >
          <UserPhoto
            user={user}
            url={user.photo?.url}
            className="size-12 text-xl"
          />

          <div className="grow space-y-0.5">
            <h3 className="text-[17px] leading-6 font-medium line-clamp-1">
              {user.firstName}
            </h3>
            <div className="flex items-center justify-between w-full">
              <p className="text-neutral-400">
                {formattedStatus?.label || status}
              </p>
              <p className="text-neutral-400 text-sm">
                {formatTime(createdAt)}
              </p>
            </div>
          </div>

          <div
            className={`${
              unansweredMessagesCount === 0
                ? "bg-neutral-100 text-neutral-300"
                : "!bg-gradient-to-bl from-blue-300 to-blue-600 !text-white"
            } messages-count-badge flex items-center justify-center shrink-0 size-8  ml-auto rounded-full`}
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
