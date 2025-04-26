import React from "react";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-1.5 w-full p-4">
      {/* Home link */}
      <Link
        to="/"
        className="flex items-center justify-center shrink-0 size-[46px] bg-neutral-50 rounded-full border border-neutral-200 transition-colors duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>

      {/* Searchbox */}
      <form className="w-full">
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
