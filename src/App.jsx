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

// Layouts
import MainLayout from "./layouts/MainLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="chat/:chatId" element={<Chat />} />
        <Route index element={<Home />} />
      </Route>
    ),
    { future: { v7_relativeSplatPath: true } }
  );

  return (
    <RouterProvider future={{ v7_startTransition: true }} router={router} />
  );
};

export default App;
