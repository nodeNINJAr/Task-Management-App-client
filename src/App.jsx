import React from "react";
import { Outlet } from "react-router";

//
const App = () => {

  // 
  return (
    <div className="container mx-auto">
      <div className="text-xl text-red-500 font-semibold text-center">
        My task management App running
      </div>
      <main className="w-11/12 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
