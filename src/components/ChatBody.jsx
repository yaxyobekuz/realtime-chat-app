import React, { useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

// Redux (Store)
import { useSelector } from "react-redux";

// Components
import TextMessageItem from "./TextMessageItem";
import PhotoMessageItem from "./PhotoMessageItem";

const className = `max-h-[calc(100%-128px)] size-full overflow-y-auto hidden-scroll scroll-smooth scroll-pt-2 py-4`;

const ChatBody = () => {
  const { hash } = useLocation();
  const chatContainerRef = useRef(null);
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId) || false;
  const { data, isLoading } = useSelector((state) => state.messages);

  const messages = data[chatId]?.messages || [];

  // Scroll to the bottom when messages update
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages?.length]);

  // Animate and scroll to hashed message
  useEffect(() => {
    if (!hash) return;

    const targetId = hash.slice(1);
    const el = document.getElementById(targetId);
    if (!el) return;

    el.classList.add("message-animate-pulse");
    el.scrollIntoView({ behavior: "smooth", block: "center" });

    setTimeout(() => {
      el.classList.remove("message-animate-pulse");
    }, 3000);
  }, [hash]);

  // Loading
  if (isLoading[chatId]) {
    return (
      <div ref={chatContainerRef} className={className}>
        <ul className="flex flex-col gap-2 px-4 animate-pulse">
          <li className="bg-neutral-100/60 max-w-32 w-full h-[42px] rounded-[21px] rounded-bl-lg" />
          <li className="bg-neutral-100/60 max-w-44 w-full h-[42px] rounded-[21px] rounded-l-lg" />
          <li className="bg-neutral-100/60 max-w-24 w-full h-[42px] rounded-[21px] rounded-tl-lg" />
          <li className="bg-neutral-100/60 max-w-56 w-full h-[42px] rounded-[21px] ml-auto rounded-br-lg" />
          <li className="bg-neutral-100/60 max-w-24 w-full h-[42px] rounded-[21px] ml-auto rounded-tr-lg" />
          <li className="bg-neutral-100/60 size-80 rounded-[21px]" />
          <li className="bg-neutral-100/60 max-w-64 w-full h-[42px] rounded-[21px] ml-auto" />
        </ul>
      </div>
    );
  }

  // Messages
  return (
    <div ref={chatContainerRef} className={className}>
      <ul className="flex flex-col">
        {messages.map((msg, i) => {
          const isFirst = i === 0;
          const isLast = i === messages.length - 1;
          const prevIsAdmin = messages[i - 1]?.isAdmin;
          const nextIsAdmin = messages[i + 1]?.isAdmin;

          const sharedProps = {
            ...msg,
            isLastMessage: isLast,
            isFirstMessage: isFirst,
            prevIsAdminMessage: prevIsAdmin,
            nextIsAdminMessage: nextIsAdmin,
          };

          if (msg?.type === "text") {
            return <TextMessageItem key={i} {...sharedProps} />;
          }

          if (msg?.type === "photo") {
            return <PhotoMessageItem key={i} {...sharedProps} />;
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export default ChatBody;
