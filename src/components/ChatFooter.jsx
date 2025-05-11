import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatFooter = ({ sendMessage }) => {
  const inputRef = useRef();
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId) || false;

  const handleFocus = () => {
    if (!inputRef?.current) return;
    inputRef.current.focus();
  };

  useEffect(() => {
    handleFocus();
  }, [chatId]);

  return (
    <div className="flex items-center justify-center w-full h-16 bg-white border-t px-4">
      <form
        onSubmit={sendMessage}
        className="flex items-center justify-center gap-4 w-full h-full"
      >
        {/* File Input */}
        <label className="flex items-center justify-center shrink-0 size-12 rounded-full border border-transparent transition-colors duration-300 hover:bg-neutral-100 active:border-neutral-200">
          <svg
            fill="none"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="size-6"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>

          <input type="file" className="hidden" />
        </label>

        {/* Message Input */}
        <input
          autoFocus
          type="text"
          ref={inputRef}
          name="message"
          autoComplete="off"
          placeholder="Xabar"
          className="size-full transition-[width] duration-300 outline-none"
        />

        {/* Submit button */}
        <button
          type="submit"
          onClick={handleFocus}
          className="flex items-center justify-center shrink-0 size-12 rounded-full"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="size-7 ml-0.5 text-blue-400"
          >
            <path
              fill="currentColor"
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
