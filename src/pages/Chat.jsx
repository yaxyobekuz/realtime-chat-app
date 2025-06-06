import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

// Socket
import { io } from "socket.io-client";
const socket = io(apiBaseUrl);

// Config
import { apiBaseUrl } from "../config";

// Notification
import { toast } from "@/notification/toast";

// Components
import ChatBody from "@/components/ChatBody";
import ChatHeader from "@/components/ChatHeader";
import ChatFooter from "@/components/ChatFooter";
import ChatDetails from "@/components/ChatDetails";

// Services
import chatService from "@/api/services/chatService";

// Redux (Store)
import {
  addNewMessageToStore,
  setChatMessagesError,
  setChatMessagesLoading,
  addNewChatMessagesToStore,
} from "@/store/features/messagesSlice";
import { useDispatch, useSelector } from "react-redux";

const Chat = () => {
  const dispatch = useDispatch();
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId);
  const { isLoading, data, hasError } = useSelector((state) => state.messages);

  const loadMessages = useCallback(async () => {
    // Add loader
    dispatch(setChatMessagesError({ id: chatId }));
    dispatch(setChatMessagesLoading({ id: chatId, value: true }));

    const res = await chatService.getChatMessages(chatId);

    if (res.ok) {
      // Add chat messages
      dispatch(addNewChatMessagesToStore(res.data));

      // Get new messages from user
      socket.on(`chatMessage:${chatId}`, (data) => {
        dispatch(addNewMessageToStore({ chatId, message: data }));
      });
    }

    // Error
    else {
      toast.error(res.message);
      dispatch(setChatMessagesError({ id: chatId, value: true }));
    }

    // Remove loader
    dispatch(setChatMessagesLoading({ id: chatId }));
  }, [chatId]);

  useEffect(() => {
    if (!data[chatId] && !isLoading[chatId]) loadMessages();
  }, [chatId, loadMessages]);

  if (hasError[chatId]) return "Xatolik yuz berdi!";

  return (
    <div className="flex size-full">
      {/* Chat Area */}
      <div className="max-w-[calc(100%-440px)] size-full">
        <ChatHeader />
        <ChatBody />
        <ChatFooter isLoading={isLoading[chatId]} />
      </div>

      {/* Chat Details */}
      <ChatDetails />
    </div>
  );
};

export default Chat;
