import React from "react";
import { Outlet } from "react-router";

//
const App = () => {

  // 
  return (
    <div className="dark:bg-gray-800">
      <main className="container mx-auto min-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
