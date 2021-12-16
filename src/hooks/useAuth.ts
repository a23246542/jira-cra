import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  loginAsync,
  registerAsync,
  logoutAction,
  selectUser,
  selectIsLoginLoading,
} from 'redux/entities/auth.slice';
import {
  setUnAuthError,
  switchRegisterAction,
} from 'redux/authScreen.slice';
import { useAppDispatch } from 'redux/store';

import { AuthForm } from 'types/common';

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const isLoginLoading = useSelector(selectIsLoginLoading);

  const register = useCallback(
    (form: AuthForm & { cpassword: string }) => {
      if (form.cpassword !== form.password) {
        dispatch(setUnAuthError('請確認兩次輸入的密碼相容'));
        return;
      }
      dispatch(registerAsync(form))
        .unwrap()
        .then(() => {
          dispatch(switchRegisterAction(true));
        });
    },
    [dispatch],
  );

  const login = useCallback(
    (form: AuthForm) => {
      dispatch(loginAsync(form));
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
    isLoginLoading,
  };
};
