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
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Ticket from "./pages/ticket/Ticket";
import Tickets from "./pages/tickets/Tickets";
import Payments from "./pages/payments/Payments";
import Passports from "./pages/passports/Passports";
import UserTickets from "./pages/user-tickets/UserTickets";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

        {/* Payments */}
        <Route path="payments" element={<Payments />} />

        {/* Chats */}
        <Route path="chats" element={<ChatLayout />}>
          <Route path="chat/:chatId" element={<Chat />} />
        </Route>

        {/* Passports */}
        <Route path="passports" element={<Passports />} />

        {/* Tickets */}
        <Route path="tickets" element={<Tickets />} />
        <Route path="tickets/ticket/:ticketId" element={<Ticket />} />
        <Route path="tickets/user/:userId" element={<UserTickets />} />
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
