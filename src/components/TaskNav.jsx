import React from "react";
import TaskFormModal from "./TaskFormModal";
import SignOut from "./SignOut";


// 
const TaskNav = () => {

  //
  return (
    <div className="flex justify-between items-center">
      {/* task add from */}
      <TaskFormModal />
      {/* signout and profile */}
      <SignOut />
    </div>
  );
};

export default TaskNav;
