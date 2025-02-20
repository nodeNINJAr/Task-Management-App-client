import React from "react";

const Task = ({ task, provided }) => {
  // 
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="bg-green-100 p-4 rounded-lg shadow-md relative"
    >
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{task?.title}</h2>
        <button className="bg-white text-green-500 px-3 py-1 rounded-full">
          Asap
        </button>
      </div>
      <p className="text-gray-700 mb-2"># {task?.category}</p>
      <div className="flex items-center mb-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-gray-700">{task?.date}</span>
      </div>
      <p className="text-gray-700 mb-4">{task?.desc}</p>
      <div className="absolute bottom-0 right-0 flex space-x-2 mb-2 mr-2">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
          Update
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
