import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";


const Task = ({ task, provided }) => {
 // Convert to readable Date and Time
const formattedDate = format(new Date(task?.timestamp), "dd/MM/yyyy"); 
const formattedTime = format(new Date(task?.timestamp), "hh:mm a"); 


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
           {task?.category}
        </button>
      </div>
      <p className="text-gray-700 mb-2"># {task?.description}</p>
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
        <span className="text-gray-700">{formattedDate} , {formattedTime}</span>
      </div>
    {/*  */}
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
Task.propTypes = {
  task: PropTypes.shape({
    timestamp: PropTypes.string.isRequired,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  provided: PropTypes.object.isRequired,
};

export default Task;

