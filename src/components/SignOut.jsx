import { Avatar, Button, notification } from "antd";
import React from "react";
import { GoogleOutlined, UserOutlined } from '@ant-design/icons';
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import DarkMode from "./shared/DarkMode";

const SignOut = () => {
    // 
    const {user,userSignOut, signInWithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    //
    const handleGoogleSignIn = async () => {
     const {user} = await signInWithGoogle();
     const userInfo = {
        email:user?.email,
        name:user?.displayName,
        photoURL:user?.photoURL,
        uid:user?.uid,
     }
    //  
    try{
     await axiosPublic.post('/users', userInfo);
     notification.success({message:"Congratulations! Sign Up Sucessfull"});
     navigate('/app')
    }catch(err){
      if(err.status===403){
        notification.success({message:"Welcome Back! Login Sucessfully"});
        navigate('/app')
      }
    };
  }
    //User Sign Out 
    const handleSignOut = async()=>{
       await userSignOut();
       navigate('/');
    }
    // 
  return (
    <div className="flex justify-start gap-3 font-Roboto">
       <DarkMode/>
       {user?<><Avatar src={user?.photoURL} /> <Button color="purple" style={{background: "rgba(255, 255, 255, 0.1)"}} onClick={handleSignOut}> <span className="text-base font-semibold font-Josefin">Sign Out</span></Button></>:
      <><Avatar icon={<UserOutlined />} /> <Button color="purple" style={{background: "rgba(255, 255, 255, 0)"}} onClick={handleGoogleSignIn}> <span className="text-base font-semibold font-Josefin"><GoogleOutlined /> Sign In</span></Button></>}
    </div>
  );
};

export default SignOut;
