import { Avatar, Button, notification } from "antd";
import React from "react";
import { GoogleOutlined, UserOutlined } from '@ant-design/icons';
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignOut = () => {
    // 
    const {user,userSignOut, signInWithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
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
     notification.success({message:"Congratulations! Sign Up Sucessfull"})
    }catch(err){
      if(err.status===403){
        notification.success({message:"Welcome Back! Login Sucessfully"})
      }
    };
  }
    //User Sign Out 
    const handleSignOut = async()=>{
       await userSignOut()
    }
    // 
  return (
    <div className="flex justify-start gap-3 font-Roboto">
       {user?<><Avatar src={user?.photoURL} /> <Button onClick={handleSignOut}> <span className="text-base font-semibold font-Josefin">Sign Out</span></Button></>:
      <><Avatar icon={<UserOutlined />} /> <Button onClick={handleGoogleSignIn}> <span className="text-base font-semibold font-Josefin"><GoogleOutlined /> Sign In</span></Button></>}
    </div>
  );
};

export default SignOut;
