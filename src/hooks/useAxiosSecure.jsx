import axios from 'axios';
import React, { useEffect } from 'react'
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
    baseURL:import.meta.env.VITE_baseUrl,
    withCredentials:true,
  });
const useAxiosSecure = () => {
  const {userSignOut} = useAuth()
  const navigate = useNavigate();

  
  // 
  useEffect(() => {
    //
    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
       async(error) => {
        if (error.status === 401 || error.status === 403) {
         await userSignOut();
          navigate("/");
        }

        return Promise.reject(error);
      }
    );
  }, []);


  return axiosSecure;
}

export default useAxiosSecure;