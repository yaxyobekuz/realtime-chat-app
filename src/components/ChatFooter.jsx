import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatFooter = ({ sendMessage }) => {
  const inputRef = useRef();
  const { chatId } = useParams();

  const handleClick = () => {
    if (!inputRef?.current) return;
    inputRef.current.focus();
  };

  useEffect(() => {
    handleClick();
  }, [chatId]);

  return (
    <div className="flex items-center justify-center w-full h-[81px] bg-white border-t px-4">
      <form
        onSubmit={sendMessage}
        className="flex items-center justify-center gap-4 w-full"
      >
        {/* Message Input */}
        <input
          autoFocus
          type="text"
          ref={inputRef}
          name="message"
          autoComplete="off"
          placeholder="Xabar"
          className="w-full px-5 py-2.5 bg-white border rounded-full transition-[width] duration-300 outline-blue-400 outline-offset-0 focus:outline-2"
        />

        {/* Submit button */}
        <button
          onClick={handleClick}
          className="flex items-center justify-center shrink-0 size-12 bg-gradient-to-tr from-blue-300 to-blue-600 rounded-full"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="size-6 ml-0.5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatFooter;
