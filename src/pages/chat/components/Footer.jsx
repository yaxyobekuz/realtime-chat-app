import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

// Socket
import { io } from "socket.io-client";
const socket = io(apiBaseUrl);

// Redux (Store)
import { useDispatch } from "react-redux";

// Config
import { apiBaseUrl } from "@/config";
import quickReplies from "@/data/quickReplies";

const Footer = ({ isLoading }) => {
  const inputRef = useRef();
  const dispatch = useDispatch();
  const { chatId: currentChatId } = useParams();
  const chatId = Number(currentChatId);

  const [inputValue, setInputValue] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredReplies, setFilteredReplies] = useState([]);
  const [isOpenQuickReplies, setIsOpenQuickReplies] = useState(false);

  const handleFocus = () => inputRef.current?.focus();

  const sendMessage = useCallback(
    (e) => {
      e.preventDefault();
      const text = inputValue.trim();
      if (!text || isLoading) return;
      socket.emit("sendMessage", { text, chatId });
      setInputValue("");
    },
    [chatId, dispatch, inputValue, isLoading]
  );

  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value.startsWith("/")) {
      setIsOpenQuickReplies(false);
      return;
    }

    const keyword = value.slice(1).toLowerCase();
    const filtered = quickReplies.filter(({ command }) =>
      command.toLowerCase().includes(keyword)
    );

    setFilteredReplies(filtered);
    setSelectedIndex(0);
    setIsOpenQuickReplies(true);
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpenQuickReplies || filteredReplies.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredReplies.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredReplies.length) % filteredReplies.length
        );
      } else if (e.key === "Enter" && filteredReplies[selectedIndex]) {
        e.preventDefault();
        const selected = filteredReplies[selectedIndex];
        setInputValue(selected.text + " ");
        setIsOpenQuickReplies(false);
        handleFocus();
      }
    },
    [filteredReplies, selectedIndex, isOpenQuickReplies]
  );

  const handleClickReply = (command) => {
    setInputValue(command + " ");
    setIsOpenQuickReplies(false);
    handleFocus();
  };

  useEffect(() => {
    handleFocus();
  }, [chatId]);

  return (
    <div className="flex items-center justify-center relative w-full h-16 bg-white px-4">
      {/* Quick replies */}
      <div
        className={`${
          isOpenQuickReplies ? "max-h-40" : "max-h-0"
        } absolute inset-x-0 bottom-full z-10 overflow-y-auto hidden-scroll w-full bg-white border-t transition-[height] duration-300`}
      >
        <ul>
          {filteredReplies.length > 0 ? (
            filteredReplies.map(({ text, command }, index) => (
              <li key={command}>
                <button
                  type="button"
                  onClick={() => handleClickReply("/" + command)}
                  className={`flex items-center gap-3.5 w-full px-4 py-2 transition-colors duration-200 ${
                    index === selectedIndex
                      ? "bg-blue-100 text-blue-500"
                      : "hover:bg-neutral-100"
                  }`}
                >
                  <b className="shrink-0 font-semibold">/{command}</b>
                  <p className="truncate text-neutral-500">{text}</p>
                </button>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-neutral-400">
              Hech nima topilmadi
            </li>
          )}
        </ul>
      </div>

      {/* Message input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center justify-center gap-4 w-full h-full"
      >
        <label className="flex items-center justify-center shrink-0 size-12 rounded-full border border-transparent transition-colors duration-300 hover:bg-neutral-100 active:border-neutral-200">
          <svg
            fill="none"
            strokeWidth="1.5"
            className="size-6"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
            />
          </svg>
          <input type="file" className="hidden" />
        </label>

        <input
          autoFocus
          ref={inputRef}
          type="text"
          name="message"
          autoComplete="off"
          value={inputValue}
          placeholder="Xabar"
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          className="h-full border-none rounded-none p-0 transition-[width] duration-300"
        />

        <button
          type="submit"
          className="flex items-center justify-center shrink-0 size-12 rounded-full"
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
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

export default Footer;
