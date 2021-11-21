import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

interface IAuthProvider {
  children?: React.ReactChild;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const isLogin = false;

  if (!isLogin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div>
      <h1>AuthProvider</h1>
      {/* {children} */}
      <Outlet />
    </div>
  );
};
