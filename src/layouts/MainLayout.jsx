import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Dot from "../components/Dot";
import ChatsList from "../components/ChatsList";
import SidebarHeader from "../components/SidebarHeader";
import SavedMessagesLink from "../components/SavedMessagesLink";

const MainLayout = () => {
  return (
    <div className="container">
      <div className="flex bg-white border-x h-screen">
        {/* Sidebar (Chats) */}
        <aside className="shrink-0 w-[440px] h-full border-r">
          <SidebarHeader />

          {/* Chats List */}
          <ul className="">
            {/* Saved message */}
            <SavedMessagesLink />

            {/* Others  */}
            <ChatsList />
          </ul>
        </aside>

        {/* Messages */}
        <Dot className="size-full">
          <Outlet />
        </Dot>
      </div>
    </div>
  );
};

export default MainLayout;
