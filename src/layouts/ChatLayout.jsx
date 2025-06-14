import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Dot from "@/components/Dot";
import Sidebar from "@/components/Sidebar";
import PaymentDetails from "@/components/modal/PaymentDetails";
import CreatePaymentModal from "@/components/modal/CreatePayment";
import CreatePassportModal from "@/components/modal/CreatePassport";
import PhotoMessageContextMenu from "@/components/PhotoMessageContextMenu";

const ChatLayout = () => {
  return (
    <>
      {/* Layout Content */}
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

      {/*  */}
      <PaymentDetails />
      <CreatePaymentModal />
      <CreatePassportModal />
      <PhotoMessageContextMenu />
    </>
  );
};

export default ChatLayout;
