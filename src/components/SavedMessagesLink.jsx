import React from "react";
import { NavLink } from "react-router-dom";

const SavedMessagesLink = () => {
  return (
    <li className="">
      <NavLink
        to="/chats/chat/1"
        className="flex items-center gap-3 py-2.5 px-5 transition-colors duration-300 hover:bg-neutral-50"
      >
        {/* Avatar */}
        <div className="flex items-center justify-center size-12 bg-gradient-to-tr from-blue-300 to-blue-600 rounded-full">
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

        {/* Details */}
        <div className="space-y-0.5">
          <h3 className="text-[17px] leading-6 font-medium">
            Saqlangan xabarlar
          </h3>
          <p className="text-neutral-400">Qo'shimcha ma'lumotlar uchun</p>
        </div>
      </NavLink>
    </li>
  );
};

export default SavedMessagesLink;
