import { Avatar, Button, notification } from "antd";
import PropTypes from 'prop-types';
import { GoogleOutlined, UserOutlined } from '@ant-design/icons';
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useNavigate } from "react-router";
import DarkMode from "./shared/DarkMode";
import useAxiosSecure from "../hooks/useAxiosSecure";

const SignOut = ({isLoading,setIsLoading}) => {
    // 
    const {user,userSignOut, signInWithGoogle} = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    // 
    const navigate = useNavigate();
    //
    const handleGoogleSignIn = async () => {
     const {user} = await signInWithGoogle();
      setIsLoading(!isLoading)
     const userInfo = {
        email:user?.email,
        name:user?.displayName,
        photoURL:user?.photoURL,
        uid:user?.uid,
     }
    //  
    try {
       await axiosPublic.post('/login',{email:user?.email,uid:user?.uid});
      // Make the API call to save the user
      await axiosPublic.post('/users', userInfo);
      setIsLoading(isLoading)
      // If successful, show success notification and navigate
      notification.success({ message: "Congratulations! Sign Up Successful" });
      navigate('/app');
    } catch (err) {
      if (err.response?.status === 403) {
        notification.success({ message: "Welcome Back! Login Successful" });
        navigate('/app');
      } else {
        notification.error({ message: "Something went wrong. Please try again later." });
        
      }
    }
  }

    //User Sign Out 
    const handleSignOut = async()=>{
       await userSignOut();
       await axiosSecure.post('/logout');
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
SignOut.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default SignOut;

