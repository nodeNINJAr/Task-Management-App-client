import React from "react";
import { Outlet } from "react-router";

//
const App = () => {

  // 
  return (
    <div className="container mx-auto dark:bg-gray-800">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
