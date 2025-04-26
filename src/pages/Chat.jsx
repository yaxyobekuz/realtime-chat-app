import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

// Config
import { apiBaseUrl } from "../config";

// Socket
import { io } from "socket.io-client";
const socket = io(apiBaseUrl);

// Components
import ChatBody from "../components/ChatBody";
import ChatHeader from "../components/ChatHeader";
import ChatFooter from "../components/ChatFooter";

const Chat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMessages = async () => {
    setHasError(false);
    setIsLoading(true);

    await fetch(`${apiBaseUrl}/api/chats/chat/${chatId}/messages`)
      .then((response) => response.json())
      .then((res) => {
        const { messages } = res || {};
        messages && setMessages(messages);
      })
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));

    socket.on(`chatMessage:${chatId}`, (data) => {
      setMessages((prev) => [...prev, data]);
    });
  };

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const input = e.target.querySelector("input");
    const text = input.value?.trim() || "";

    if (text?.length === 0 || !text?.length || isLoading) return;

    socket.emit(`sendMessage`, { text, chatId });

    input.value = "";
  };

  if (hasError) {
    return;
  }

  return (
    <div className="size-full">
      {/* Header */}
      <ChatHeader />

      {/* Body */}
      <ChatBody messages={messages} />

      {/* Footer */}
      <ChatFooter sendMessage={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default Chat;
