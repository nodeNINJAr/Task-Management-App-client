import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router'; 
import { Spin } from 'antd';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); 
  const location = useLocation();

  if (loading) {
    return <div className='flex justify-center items-center min-h-screen'><Spin size="large" /></div>; 
  }

  if (user) {
    return children; 
  }

  return <Navigate to="/" state={{ from: location }} replace />; 
};

export default PrivateRoute;
