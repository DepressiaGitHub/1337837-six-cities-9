import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../components/const/const';
import { UserProcess } from '../types/state';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.NoAuth,
};

export const userProcess = createSlice({
  name: NameSpace.user,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
  },
});

export const { requireAuthorization } = userProcess.actions;
