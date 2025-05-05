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
        <aside className="shrink-0 w-[440px] max-h-full overflow-y-auto hidden-scroll border-r">
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
        <Dot className="max-w-[calc(100%-440px)] w-full">
          <Outlet />
        </Dot>
      </div>
    </div>
  );
};

export default MainLayout;
