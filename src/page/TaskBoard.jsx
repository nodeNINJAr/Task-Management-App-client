import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { socket } from "../socket";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Task from "../components/Task";
import TaskNav from "../components/TaskNav";


// 
const TaskBoard = () => {
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const [refresh,setRefresh] = useState(false);
  //
  useEffect(() => {
    fetchTasks();
    socket.on("task-updated", fetchTasks);
    return () => socket.off("task-updated");
  }, [user?.uid, refresh]);

  // Fetch data by user
  const fetchTasks = async () => {
    const response = await axiosSecure(`/tasks?uid=${user?.uid}`);
    const sortedTasks = response.data.sort((a, b) => a.position - b.position);
    setTasks(sortedTasks);
};

// 
const handleDragEnd = async (result) => {
  const { destination, draggableId } = result;

  if (!destination) return; // Ignore invalid drop
  const updatedTasks = [...tasks];

  // Find the moved task
  const movedTaskIndex = updatedTasks.findIndex((task) => task._id === draggableId);
  if (movedTaskIndex === -1) return;

  const movedTask = updatedTasks[movedTaskIndex];

  // Remove the task from the source position
  updatedTasks.splice(movedTaskIndex, 1);

  // Update category if moved to a new one
  movedTask.category = destination.droppableId;

  // Insert at the new position
  updatedTasks.splice(destination.index, 0, movedTask);

  // Reassign new positions to tasks
  const reorderedTasks = updatedTasks.map((task, index) => ({
    ...task,
    position: index,
  }));

  // Update state immediately
  setTasks(reorderedTasks);

  // Send update to backend
  try {
    await axiosSecure.put("/task/reorder", {
      tasks: reorderedTasks.map(task => ({
        _id: task._id.toString(),
        position: task.position,
        category: task.category,
      })),
    });
    socket.emit("task-updated"); 
  } catch (error) {
    console.error("Error updating task order:", error);
  }
};

// 
  return (
    <div className="p-4">
      {/* task nav */}
       <TaskNav refresh={refresh} setRefresh={setRefresh}/>
      <h1 className="text-center  text-2xl sm:text-3xl font-bold font-Josefin my-8">Task Board</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-Roboto">
        <DragDropContext onDragEnd={handleDragEnd}>
          {["To-Do", "In Progress", "Done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-200 p-4 rounded-md min-h-[300px] space-y-4"
                >
                  <h3 className="text-lg font-bold mb-2">{category}</h3>
                  {tasks
                    .filter((task) => task.category === category)
                    .map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <>
                            <Task onEdit={() => openUpdateModal(task)} refresh={refresh} setRefresh={setRefresh} task={task} provided={provided} />
                          </>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
     
    </div>
  );
};

export default TaskBoard;
