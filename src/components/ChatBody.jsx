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
          {messages.map(({ isAdmin, text, _id: id, type, photo }, index) => {
            return (
              <li
                id={id}
                key={index}
                className={`${
                  isAdmin ? "bg-neutral-50 ml-auto" : "bg-white mr-auto"
                } inline-block max-w-[calc(100%-80px)] border p-2 rounded-[20px] leading-[14px] shadow shadow-neutral-200/70`}
              >
                {/* Text */}
                {type === "text" && text}

                {/* Photo */}
                {type === "photo" && (
                  <img
                    width={288}
                    height={288}
                    src={photo.url}
                    className="size-72 bg-neutral-50 object-cover rounded-xl"
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatBody;
