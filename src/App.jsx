import React from "react";
import { Outlet } from "react-router";

//
const App = () => {

  // 
  return (
    <div className="container mx-auto">
      <main className="w-11/12 mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
