import React from "react";
import TaskFormModal from "../components/TaskFormModal";
import Task from "../components/Task";

// 
const TaskBoard = () => {


  //
  return (
    <div className="">
      <div className="border border-green-300 rounded-xl flex">
        <TaskFormModal />
        <div>

        </div>
      </div>
      {/* all list */}
      <div className="border border-green-300 rounded-xl min-h-screen mt-4">
        {/*  */}
         <div className="flex justify-between items-start gap-4">
            <div className="border-2 border-gray-600 rounded-full py-3 w-1/3 text-center  text-xl text-gray-800 font-semibold font-mono">To-Do <span className="text-lg bg-amber-300 rounded-full py-1 px-4 inline-block">2</span></div>
            <div className="border-2 border-gray-600 rounded-full py-3 w-1/3 text-center  text-xl text-gray-800 font-semibold font-mono">In Progress <span className="text-lg bg-amber-300 rounded-full py-1 px-4 inline-block">2</span></div>
            <div className="border-2 border-gray-600 rounded-full py-3 w-1/3 text-center  text-xl text-gray-800 font-semibold font-mono">Done <span className="text-lg bg-amber-300 rounded-full py-1 px-4 inline-block">2</span></div>
         </div>
         {/*  */}
         <div className="grid grid-cols-3 gap-4 py-4">
            <Task/>
            <Task/>
            <Task/>
         </div>
      </div>
    </div>
  );
};

export default TaskBoard;
