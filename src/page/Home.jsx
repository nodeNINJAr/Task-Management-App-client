import React, { useState } from "react";
import SignOut from "../components/SignOut";
import { Button, message, Spin } from "antd";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import {Helmet} from "react-helmet";


//
const Home = () => {
  
  const {user} = useAuth();
  const navigate =useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading,setIsLoading] = useState(false);
  // 
  const hnadleManage =()=>{
     if(user){
      navigate('/app')
     }
     messageApi.open({
      type: 'warning',
      content: <span className="text-base font-medium font-Roboto capitalize">Please login by google for manage your daily to do</span>,
      duration: 5,
    });
     return 
  }

  if(isLoading) return <div className='flex justify-center items-center min-h-screen'><Spin size="large" /></div>; 
  // 
  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen font-Roboto bg-linear">
      <Helmet>
        <title>Taskly || Home</title>
      </Helmet>
    {contextHolder}
    <div className="p-4 sm:px-6 mx-auto">
      <nav className="flex justify-between items-center gap-10">
         <h2 className="text-2xl sm:text-4xl font-Josefin font-bold text-amber-300 dark:text-white">
             Taskly
         </h2>
        <SignOut isLoading={isLoading} setIsLoading={setIsLoading} />
      </nav>
      <div className="flex flex-col justify-center items-center min-h-dvh space-y-4">
        <h1 className="text-6xl font-Josefin font-bold text-center dark:text-white">
             Welcome to Taskly!
        </h1>
        <p className="text-center w-11/12 md:w-8/12 dark:text-gray-300">
            Stay organized, increase productivity, and manage your tasks effortlessly
              with Taskly. Create, track, and prioritize tasks with a smooth
            drag-and-drop interface. Get things done—your way!
         </p>
        <Button
          onClick={hnadleManage}
           style={{
            background: "rgba(255, 255, 255, 0.1)",
            padding: "10px 30px",
            fontFamily: "font-Josefin",
            fontWeight: "600",
          }}
          color="purple"
          variant="outlined"
         
        >
            Manage Your To Do
        </Button>
      </div>
    </div>
  </div>
  );
};

export default Home;
