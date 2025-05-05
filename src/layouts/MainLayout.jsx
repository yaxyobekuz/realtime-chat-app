import React from "react";
import { Outlet } from "react-router-dom";

// Components

const MainLayout = () => {
  return (
    <div className="container">
      <div className="flex bg-white border-x h-screen">
        {/* Pages */}
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
