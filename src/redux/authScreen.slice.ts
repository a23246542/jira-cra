import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from './store';
import { clearAuthError } from 'redux/entities/auth.slice';

interface AuthScreenSliceState {
  isRegister: boolean;
  error: null | {
    message: string;
  };
}

const initialState: AuthScreenSliceState = {
  isRegister: false,
  error: null,
};

export const authScreenSlice = createSlice({
  name: 'authScreen',
  initialState,
  reducers: {
    showRegister(state) {
      state.isRegister = true;
      state.error = null;
    },
    showLogin(state) {
      state.isRegister = false;
      state.error = null;
    },
    setUnAuthError(state, action) {
      state.error = { message: action.payload };
    },
  },
});

export const { showRegister, showLogin, setUnAuthError } =
  authScreenSlice.actions;

export const switchRegisterAction =
  (value: boolean) => (dispatch: AppDispatch) => {
    if (value) {
      dispatch(showRegister());
    } else {
      dispatch(showLogin());
    }

    dispatch(clearAuthError());
  };

export const selectIsRegister = (state: RootState) =>
  state.authScrren.isRegister;

export const selectUnAuthError = (state: RootState) =>
  state.authScrren.error;
