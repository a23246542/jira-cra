import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { authApi, getToken } from 'api/authReq';
import { initUserAsyncAction } from 'redux/entities/auth.slice';
import { useDispatch } from 'react-redux';

interface IAuthProvider {
  children?: React.ReactChild;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  // const isLogin = false;

  // if (!isLogin) {
  //   return <Navigate to="/auth" replace />;
  // }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUserAsyncAction());
  }, []);

  return <div>{children}</div>;
};
