import React, { useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

// Socket
import { io } from "socket.io-client";
const socket = io(apiBaseUrl);

// Config
import { apiBaseUrl } from "../../config";

// Notification
import { toast } from "@/notification/toast";

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

// Components
import Body from "@/pages/chat/components/Body";
import Header from "@/pages/chat/components/Header";
import Footer from "@/pages/chat/components/Footer";
import RightSide from "@/pages/chat/components/RightSide";

// Modals
import CreateTicketModal from "@/components/modal/CreateTicket";

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
    <>
      <div className="flex size-full">
        {/* Chat Area */}
        <div className="max-w-[calc(100%-440px)] size-full">
          <Header />
          <Body />
          <Footer isLoading={isLoading[chatId]} />
        </div>

        {/* Chat Details */}
        <RightSide />
      </div>

      {/* Modals */}
      <CreateTicketModal />
    </>
  );
};

export default Chat;
