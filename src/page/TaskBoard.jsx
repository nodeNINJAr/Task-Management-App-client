import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";



// 
const TaskBoard = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  console.log(tasks);
  const { user } = useAuth();

  //
  useEffect(() => {
    fetchTasks();
    socket.on("task-updated", fetchTasks);
    return () => socket.off("task-updated");
  }, [user?.uid]);

  // fetch data by user
  const fetchTasks = async () => {
    const response = await axiosSecure(`/tasks?uid=${user?.uid}`);
    const sortedTasks = response.data.sort((a, b) => a.position - b.position);
    setTasks(sortedTasks);
};





  return (
    <><h1>task board</h1></>
  );
};

export default TaskBoard;
