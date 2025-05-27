import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Dot from "@/components/Dot";
import Sidebar from "@/components/Sidebar";

const ChatLayout = () => {
  return (
    <div className="container !px-0">
      <div className="flex bg-white border-x h-screen">
        {/* Sidebar (Chats list) */}
        <Sidebar />

        {/* Chat area */}
        <Dot className="max-w-[calc(100%-440px)] w-full">
          <Outlet />
        </Dot>
      </div>
    </div>
  );
};

export default ChatLayout;
