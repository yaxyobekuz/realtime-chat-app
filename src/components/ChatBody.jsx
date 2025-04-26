import React, { useEffect } from "react";

const ChatBody = ({ messages = [] }) => {
  const scrollContainerRef = React.useRef(null);

  useEffect(() => {
    // Scroll to bottom
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollContainerRef}
      className="max-h-[calc(100%-162px)] h-full overflow-y-auto p-4"
    >
      <div className="max-w-2xl mx-auto">
        <ul className="flex flex-col gap-2">
          {messages.map(({ isAdmin, text }, i) => {
            return isAdmin ? (
              <li
                key={i}
                className="inline-block ml-auto border bg-neutral-50 py-1 px-3.5 rounded-full shadow shadow-neutral-200/70"
              >
                {text}
              </li>
            ) : (
              <li
                key={i}
                className="inline-block border bg-white mr-auto py-1 px-3.5 rounded-full shadow shadow-neutral-200/70"
              >
                {text}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatBody;
