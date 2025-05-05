import React, { useEffect, useRef } from "react";

// Components
import TextMessageItem from "./TextMessageItem";
import PhotoMessageItem from "./PhotoMessageItem";

const ChatBody = ({ messages = [] }) => {
  const chatContainerRef = useRef(null);

  // Scroll to the bottom when messages update
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={chatContainerRef}
      className="max-h-[calc(100%-128px)] size-full overflow-y-auto hidden-scroll scroll-pt-2 p-4"
    >
      <ul className="flex flex-col gap-2">
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
