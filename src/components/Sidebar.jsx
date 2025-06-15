import { useState } from "react";

// Components
import ChatsList from "@/pages/chat/components/ChatsList";
import SidebarTabs from "@/components/SidebarTabs";
import SidebarHeader from "@/components/SidebarHeader";
import SavedMessagesLink from "@/components/SavedMessagesLink";

const Sidebar = () => {
  const [chatStatus, setChatStatus] = useState(null);

  return (
    <aside className="shrink-0 w-[440px] max-h-full overflow-y-auto hidden-scroll border-r">
      <SidebarHeader />
      <SidebarTabs chatStatus={chatStatus} updateChatStatus={setChatStatus} />

      {/* Chats List */}
      <ul>
        {/* Saved message */}
        <SavedMessagesLink />

        {/* Others  */}
        <ChatsList chatStatus={chatStatus} />
      </ul>
    </aside>
  );
};

export default Sidebar;
