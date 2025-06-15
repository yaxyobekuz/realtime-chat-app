import React from "react";

// Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Toaster
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ChatLayout from "./layouts/ChatLayout";

// Pages
import Home from "./pages/Home";
import Chat from "./pages/chat/Chat";
import NotFound from "./pages/NotFound";
import Ticket from "./pages/ticket/Ticket";
import Tickets from "./pages/tickets/Tickets";
import Payments from "./pages/payments/Payments";
import Passports from "./pages/passports/Passports";
import UserTickets from "./pages/user-tickets/UserTickets";
import UserPayments from "./pages/user-payments/UserPayments";
import UserPassports from "./pages/user-passports/UserPassports";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

        {/* Chats */}
        <Route path="chats" element={<ChatLayout />}>
          <Route path="chat/:chatId" element={<Chat />} />
        </Route>

        {/* Tickets */}
        <Route path="tickets" element={<Tickets />} />
        <Route path="tickets/ticket/:ticketId" element={<Ticket />} />
        <Route path="tickets/user/:userId" element={<UserTickets />} />

        {/* Payments */}
        <Route path="payments" element={<Payments />} />
        <Route path="payments/user/:userId" element={<UserPayments />} />

        {/* Passports */}
        <Route path="passports" element={<Passports />} />
        <Route path="passports/user/:userId" element={<UserPassports />} />
      </Route>
    ),
    { future: { v7_relativeSplatPath: true } }
  );

  return (
    <>
      {/* Router */}
      <RouterProvider future={{ v7_startTransition: true }} router={router} />

      {/* Toaster */}
      <Toaster />
    </>
  );
};

export default App;
