import React, { useEffect } from 'react';
// import { Outlet, Navigate } from 'react-router-dom';
import {
  initUserAsync,
  selectInitUserState,
  selectUserError,
} from 'redux/entities/auth.slice';
import { useDispatch, useSelector } from 'react-redux';
import { FullPageLoading } from 'components/UI';
import { FetchState } from 'types/common';

interface IAuthProvider {
  children?: React.ReactChild;
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const state = useSelector(selectInitUserState);
  const error = useSelector(selectUserError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUserAsync());
  }, [dispatch]);

  if (state === FetchState.IDLE || state === FetchState.LOADING) {
    return <FullPageLoading />;
  }

  return <div>{children}</div>;
};
