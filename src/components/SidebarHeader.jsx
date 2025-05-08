import React from "react";
import { Link } from "react-router-dom";

const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-1.5 w-full p-4">
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
