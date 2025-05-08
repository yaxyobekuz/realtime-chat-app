import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// Components
import TextMessageItem from "./TextMessageItem";
import PhotoMessageItem from "./PhotoMessageItem";

const ChatBody = ({ messages = [] }) => {
  const { hash } = useLocation();
  const chatContainerRef = useRef(null);

  // Scroll to the bottom when messages update
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages]);

  // Animate and scroll to hashed message
  useEffect(() => {
    if (!hash) return;

    const targetId = hash.slice(1);
    const el = document.getElementById(targetId);
    if (!el) return;

    el.classList.add("message-animate-pulse");
    el.scrollIntoView({ behavior: "smooth", block: "center" });

    const timeoutId = setTimeout(() => {
      el.classList.remove("message-animate-pulse");
    }, 3000);

    return () => clearTimeout(timeoutId); // Cleanup
  }, [hash]);

  return (
    <div
      ref={chatContainerRef}
      className="max-h-[calc(100%-128px)] size-full overflow-y-auto hidden-scroll scroll-smooth scroll-pt-2 py-4"
    >
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

          if (msg.type === "text") {
            return <TextMessageItem key={i} {...sharedProps} />;
          }

          if (msg.type === "photo") {
            return <PhotoMessageItem key={i} {...sharedProps} />;
          }

          return null;
        })}
      </ul>
    </div>
  );
};

export default ChatBody;
