import React from "react";

// Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Pages
import Chat from "./pages/Chat";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Payments from "./pages/Payments";
import Passports from "./pages/Passports";

// Toaster
import { Toaster } from "react-hot-toast";

// Layouts
import MainLayout from "./layouts/MainLayout";
import ChatLayout from "./layouts/ChatLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />

        <Route path="chats" element={<ChatLayout />}>
          <Route path="chat/:chatId" element={<Chat />} />
        </Route>

        <Route path="payments" element={<Payments />} />
        <Route path="passports" element={<Passports />} />

        <Route path="*" element={<NotFound />} />
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
