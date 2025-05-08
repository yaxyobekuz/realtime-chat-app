import React from "react";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  return (
    <div className="flex items-center justify-between gap-1.5 w-full h-16 pl-5">
      <h1 className="text-lg font-medium">Arzon umra</h1>

      <button className="flex items-center justify-center size-16">
        <svg
          className="size-6"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Searchbox */}
      <form className="hidden w-full">
        <input
          type="search"
          name="search"
          placeholder="Qidirish"
          className="w-full px-5 py-2.5 bg-neutral-50 border rounded-full outline-blue-400 outline-offset-0 focus:outline-2 "
        />
      </form>
    </div>
  );
};

export default SidebarHeader;
