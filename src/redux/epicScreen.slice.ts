import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

interface EpicScreenSliceState {}

const initialState: EpicScreenSliceState = {};

export const epicScreenSlice = createSlice({
  name: 'epicScreen',
  initialState,
  reducers: {},
});
