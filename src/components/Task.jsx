import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { notification } from "antd";
import UpdateTaskModal from "./addTaskModal/UpdateTaskModal";


// 
const Task = ({ task, provided,setRefresh,refresh }) => {
  // 
  const axiosSecure = useAxiosSecure();
 // Convert to readable Date and Time
const formattedDate = format(new Date(task?.timestamp), "dd/MM/yyyy"); 
const formattedTime = format(new Date(task?.timestamp), "hh:mm a"); 
// For Update Modal
const [isUpdateVisible, setIsUpdateVisible] = useState(false);
const [selectedTask, setSelectedTask] = useState(null);


// For task delete
const handleDelete = async(task)=>{
    // 
   const {data} = await axiosSecure.delete(`/task/${task?._id}`);
   if(data?.deletedCount === 1){
    setRefresh(!refresh);
    notification.success({message:<>Task Deleted From <span className="text-red-500">{task?.category}</span></>})
   }
}

// Open modal
const openUpdateModal = (task) => {
  setSelectedTask(task);
  setIsUpdateVisible(true);
};


// Update function
const handleUpdateTask = async (updatedTask) => {
  try {
   const {data} = await axiosSecure.put(`/tasks/${updatedTask._id}`, updatedTask);
     if(data?.modifiedCount===1){
      notification.success({message:"Task Updated"})
      setRefresh(!refresh); // Refresh list
      setIsUpdateVisible(false);
     }
    
  } catch (error) {
    console.error("Error updating task:", error);
  }
};


// 
  return (
    <div
    ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className={`${task?.category === "To-Do" && "bg-[#C9FDC7] dark:bg-[#1F2A1E]"
      || task?.category === "In Progress" && "bg-[#FBF398] dark:bg-[#3A3A1E]"
      || task?.category === "Done" && "bg-[#DDDFFE] dark:bg-[#2A2A3A]"
    } p-4 rounded-lg shadow-md relative group transition duration-300 font-Roboto dark:shadow-gray-800`}
  >
    {/* Action Buttons (Edit and Delete) */}
    <div className="absolute top-1 right-1 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={() => openUpdateModal(task)}
        className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-blue-600 dark:hover:bg-blue-800"
      >
        <EditOutlined />
      </button>
      <UpdateTaskModal
        visible={isUpdateVisible}
        onCancel={() => setIsUpdateVisible(false)}
        onUpdate={handleUpdateTask}
        task={selectedTask}
      />
      <button
        onClick={() => handleDelete(task)}
        className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded dark:bg-red-600 dark:hover:bg-red-800"
      >
        <DeleteOutlined />
      </button>
    </div>
  
    {/* Task Content */}
    <div className="flex justify-between items-center mb-2">
      <h2 className="text-lg font-semibold capitalize dark:text-gray-500">
        {task?.title}
      </h2>
      <button
        className={`bg-white px-3 py-1 rounded-full font-Josefin ${
          task?.category === "To-Do" && "text-green-500 dark:text-green-300"
          || task?.category === "In Progress" && "text-yellow-500 dark:text-yellow-300"
          || task?.category === "Done" && "text-purple-500 dark:text-purple-300"
        }`}
      >
        {task?.category}
      </button>
    </div>
  
    {/* Task Description */}
    <p className="text-gray-700 mb-2 text-sm dark:text-gray-300">
      # {task?.description}
    </p>
  
    {/* Date & Time */}
    <div className="flex items-center mb-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-500 mr-2 dark:text-gray-400"
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
      <span className="text-gray-700 text-base font-Josefin dark:text-gray-300">
        {formattedDate}, {formattedTime}
      </span>
    </div>
  </div>

  );
};
Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    title: PropTypes.string,
    category: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  provided: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};

export default Task;

