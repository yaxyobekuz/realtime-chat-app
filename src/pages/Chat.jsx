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
import ChatDetails from "../components/ChatDetails";

const Chat = () => {
  const { chatId } = useParams();
  const [chat, setChat] = useState({});
  const [messages, setMessages] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = chat || {};

  const fetchMessages = async () => {
    setHasError(false);
    setIsLoading(true);

    await fetch(`${apiBaseUrl}/api/chats/chat/${chatId}/messages`)
      .then((response) => response.json())
      .then((chat) => {
        if (chat) {
          setChat(chat);
          setMessages(chat.messages);
        } else {
          throw new Error();
        }
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
    const input = e.target.querySelector("input[type='text']");
    const text = input.value?.trim() || "";

    if (text?.length === 0 || !text?.length || isLoading) return;

    socket.emit(`sendMessage`, { text, chatId }, (res) => {
      console.log(res);
    });

    input.value = "";
  };

  if (hasError) {
    return "Error";
  }

  return (
    <div className="flex size-full">
      {/* Body */}
      <div className="size-full">
        {/* Header */}
        <ChatHeader title={user?.firstName} />

        {/* Body */}
        <ChatBody messages={messages} />

        {/* Footer */}
        <ChatFooter sendMessage={sendMessage} isLoading={isLoading} />
      </div>

      {/* Details */}
      <ChatDetails {...chat} />
    </div>
  );
};

export default Chat;
