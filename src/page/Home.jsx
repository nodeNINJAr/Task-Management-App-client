import React from "react";
import SignOut from "../components/SignOut";
import { Button, message } from "antd";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

//
const Home = () => {
  
  const {user} = useAuth();
  const navigate =useNavigate();
  const [messageApi, contextHolder] = message.useMessage();


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

  // 
  return (
    <div className="bg-gradient-to-b from-blue-500 to-purple-500 min-h-screen font-Roboto">
      {contextHolder}
      <div className="p-4 sm:px-6 mx-auto">
        <nav className="flex justify-between items-center gap-10">
          <h2 className="text-2xl sm:text-4xl font-Josefin font-bold text-amber-300">Taskly</h2> <SignOut />
        </nav>
         <div className="flex flex-col justify-center items-center min-h-dvh space-y-4">
             <h1 className="text-6xl font-Josefin font-bold text-center">Welcome to Taskly!</h1>
             <p className="text-center w-11/12 md:w-8/12">Stay organized, increase productivity, and manage your tasks effortlessly with Taskly. Create, track, and prioritize tasks with a smooth drag-and-drop interface. Get things done—your way!</p>
             <Button onClick={hnadleManage}  style={{ background: "rgba(255, 255, 255, 0.1)",padding:"10px 30px",fontFamily:"font-Josefin", fontWeight:"600"}} color="purple" variant="outlined">
                   Manage Your To Do
            </Button>
         </div>
      </div>
    </div>
  );
};

export default Home;
