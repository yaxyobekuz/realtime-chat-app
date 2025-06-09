import React from "react";

// Redux (Store)
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatHeader = ({ placeholder = "" }) => {
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId) || null;
  const chats = useSelector((state) => state.chats);
  const chat = chats?.data?.find(({ id }) => id === chatId) || {};
  const { firstName: title } = chat?.user || {};

  return (
    <header className="bg-white px-4 border-b h-16">
      <div className="flex items-center justify-between h-full">
        {/* Profile section */}
        <div className="flex items-center gap-3">
          {/* User details */}
          <div className="text-start space-y-0.5">
            <h3 className="text-[17px] leading-6 font-medium">
              {title || "Foydalanuvchi"}
            </h3>
            {/* Status placeholder */}
            <p className="text-neutral-400 leading-5">
              {placeholder || "Holat mavjud emas"}
            </p>
          </div>
        </div>

        {/* Actions menu button */}
        <button
          className="flex items-center justify-center size-12 rounded-full transition-colors duration-300 border border-transparent hover:bg-neutral-50 active:border-neutral-200"
          aria-label="Chat actions menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#333333"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
