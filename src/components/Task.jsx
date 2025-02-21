import React, { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { notification } from "antd";
import UpdateTaskModal from "./addTaskModal/UpdateTaskModal";

//
const Task = ({ task, provided, setRefresh, refresh }) => {
  //
  const axiosSecure = useAxiosSecure();
  // Convert to readable Date and Time
  const formattedDate = format(new Date(task?.timestamp), "dd/MM/yyyy");
  const formattedTime = format(new Date(task?.timestamp), "hh:mm a");
  const formattedDueDate = format(new Date(task?.dueDate), "dd/MM/yyyy");
  // 
  const compareDate = format(new Date(), "dd/MM/yyyy");
  //
  const isTaskOverdue = formattedDueDate < compareDate && task?.category !== "Done" ? true : false;
  // For Update Modal
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  // Showing Error On modal
  const [error, setError] = useState('');



  // For task delete
  const handleDelete = async (task) => {
    //
    const { data } = await axiosSecure.delete(`/task/${task?._id}`);
    if (data?.deletedCount === 1) {
      setRefresh(!refresh);
      notification.success({
        message: (
          <>
            Task Deleted From
            <span className="text-red-500">{task?.category}</span>
          </>
        ),
      });
    }
  };

  // Open modal
  const openUpdateModal = (task) => {
    setSelectedTask(task);
    setIsUpdateVisible(true);
  };
  // close modal
  const handleCancle =()=>{
      setError('')
      setIsUpdateVisible(false)
  }


  // Update function
  const handleUpdateTask = async (updatedTask) => {
    //  
    try {
      const { data } = await axiosSecure.put(`/tasks/${updatedTask._id}`,
        updatedTask
      );
      if (data?.modifiedCount === 1) {
        notification.success({ message: "Task Updated" });
        setRefresh(!refresh); // Refresh list
        setIsUpdateVisible(false);
        setError('')
      }
    } catch (err) {
      setError(err?.response?.data?.error)
    }
  };


  //
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={`${
        (task?.category === "To-Do" && "bg-[#C9FDC7] dark:bg-[#1F2A1E]") ||
        (task?.category === "In Progress" &&
          "bg-[#FBF398] dark:bg-[#3A3A1E]") ||
        (task?.category === "Done" && "bg-[#DDDFFE] dark:bg-[#2A2A3A]")
      } p-4 rounded-lg shadow-md font-Roboto dark:shadow-gray-800`}
    >
      {/* Task Content */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold capitalize dark:text-gray-500 text-wrap truncate">
          {task?.title}
        </h2>
        <button
          className={`text-nowrap bg-white px-3 py-1 rounded-full font-Josefin ${
            (task?.category === "To-Do" &&
              "text-green-500 dark:text-green-300") ||
            (task?.category === "In Progress" &&
              "text-yellow-500 dark:text-yellow-300") ||
            (task?.category === "Done" &&
              "text-purple-500 dark:text-purple-300")
          }`}
        >
          {task?.category}
        </button>
      </div>

      {/* Task Description */}
      <p className="text-gray-700 mb-2 text-sm dark:text-gray-300 w-full text-wrap truncate mb-2">
        # {task?.description}
      </p>

      {/* Date & Time */}
        <div className="flex justify-start items-center">
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
            <span className={`${isTaskOverdue && "text-red-500"}`}>
              {formattedDate}
            </span>
            , {formattedTime}
          </span>
        </div>
      {/* Due Time & Date*/}
       <div className="flex justify-between items-center gap-2">
          <div className="flex justify-start items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 mr-2 ${isTaskOverdue ? "text-red-500" : "text-gray-500 dark:text-gray-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Clock Icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              {/* Exclamation Mark (for overdue tasks) */}
              {isTaskOverdue && (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              )}
            </svg>
            <span className="text-gray-700 text-base font-Josefin dark:text-gray-300 text-wrap truncate">
              <span className={`${isTaskOverdue ? "text-red-500" : ""} truncate`}>
                {formattedDueDate}
              </span>
              , {formattedTime}
            </span>
          </div>
        {/* Action Buttons (Edit and Delete) */}
        <div className="flex space-x-2">
          <button
            onClick={() => openUpdateModal(task)}
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded dark:bg-blue-600 dark:hover:bg-blue-800"
          >
            <EditOutlined />
          </button>
          <UpdateTaskModal
            visible={isUpdateVisible}
            onCancel={handleCancle}
            onUpdate={handleUpdateTask}
            task={selectedTask}
            error={error}
          />
          <button
            onClick={() => handleDelete(task)}
            className="cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded dark:bg-red-600 dark:hover:bg-red-800"
          >
            <DeleteOutlined />
          </button>
        </div>
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
    dueDate: PropTypes.string,
  }).isRequired,
  provided: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};

export default Task;
