import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

// Config
import { apiBaseUrl } from "../config";

// Socket
import { io } from "socket.io-client";
const socket = io(apiBaseUrl);

// Notification
import { toast } from "@/notification/toast";

// Components
import ChatBody from "../components/ChatBody";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";
import ChatDetails from "../components/ChatDetails";

// Services
import chatService from "@/api/services/chatService";

const Chat = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = chat || {};

  const loadMessages = useCallback(async () => {
    setHasError(false);
    setIsLoading(true);

    const res = await chatService.getChatMessages(chatId);

    if (res.ok) {
      const { messages, ...chatData } = res.data;
      setChat(chatData);
      setMessages(messages);
    } else {
      setHasError(true);
      toast.error(res.message);
    }

    setIsLoading(false);
  }, [chatId]);

  useEffect(() => {
    loadMessages();

    const handleNewMessage = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on(`chatMessage:${chatId}`, handleNewMessage);

    return () => {
      socket.off(`chatMessage:${chatId}`, handleNewMessage);
    };
  }, [chatId, loadMessages]);

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      const input = e.target.querySelector("input[type='text']");
      const text = input.value?.trim();

      if (!text || isLoading) return;

      socket.emit("sendMessage", { text, chatId }, (res) => {
        console.log(res);
      });

      input.value = "";
    },
    [chatId, isLoading]
  );

  if (hasError) return "Error";

  return (
    <div className="flex size-full">
      {/* Chat Area */}
      <div className="max-w-[calc(100%-440px)] size-full">
        <ChatHeader title={user?.firstName} />
        <ChatBody messages={messages} />
        <ChatFooter sendMessage={sendMessage} isLoading={isLoading} />
      </div>

      {/* Chat Details */}
      <ChatDetails {...chat} />
    </div>
  );
};

export default Chat;
