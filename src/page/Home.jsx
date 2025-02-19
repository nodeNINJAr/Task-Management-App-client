import React from "react";
import useAuth from "../hooks/useAuth";
import { Button, notification } from "antd";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Home = () => {
  const { signInWithGoogle, userSignOut } = useAuth();
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
  
  // sign out
  const handleSignOut = async () => {
    await userSignOut();
  };

  return (
    <div>
      <Button onClick={handleGoogleSignIn} color="cyan" variant="outlined">
        google login
      </Button>
      <Button onClick={handleSignOut} color="cyan" variant="outlined">
        signOut
      </Button>
    </div>
  );
};

export default Home;
