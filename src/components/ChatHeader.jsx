import React from "react";

// Redux (Store)
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatHeader = ({ placeholder = "" }) => {
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId) || false;
  const { data } = useSelector((state) => state.messages);

  const { firstName: title } = data[chatId]?.user || {};

  return (
    <header className="bg-white px-4 border-b h-16">
      <div className="flex items-center justify-between h-full">
        {/* Profile */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          {false && (
            <div className="flex items-center justify-center size-[46px] bg-gradient-to-tr from-blue-300 to-blue-600 rounded-full">
              <svg
                fill="none"
                className="size-6"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
              </svg>
            </div>
          )}

          {/* Details */}
          <div className="text-start space-y-0.5">
            <h3 className="text-[17px] leading-6 font-medium">
              {title || "..."}
            </h3>

            {/* Placeholder */}
            <p className="text-neutral-400 leading-5">
              {placeholder || "Holat mavjud emas"}
            </p>
          </div>
        </div>

        {/* Actions button */}
        <button className="flex items-center justify-center size-12 rounded-full transition-colors duration-300 border border-transparent hover:bg-neutral-50 active:border-neutral-200">
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
