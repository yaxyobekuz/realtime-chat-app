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

// Toaster
import { Toaster } from "react-hot-toast";

// Layouts
import NotFound from "./pages/NotFound";
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
