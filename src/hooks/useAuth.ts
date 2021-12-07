import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginAsyncAction,
  registerAsyncAction,
  logoutAction,
  selectUser,
} from 'redux/entities/auth.slice';

import { AuthForm } from 'types/common';
import { IUser } from 'types/user';

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<IUser> =
    useDispatch();

  const user = useSelector(selectUser);

  const register = useCallback(
    (form: AuthForm) => {
      dispatch(registerAsyncAction(form));
    },
    [dispatch],
  );

  const login = useCallback(
    (form: AuthForm) => {
      dispatch(loginAsyncAction(form));
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  return {
    user,
    register,
    login,
    logout,
  };
};
