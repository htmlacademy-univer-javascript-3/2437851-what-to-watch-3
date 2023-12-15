import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AuthorizationStatus, Namespace} from '../../consts.ts';

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userProcess = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {
    setAuthorizationStatus: (state, action: PayloadAction<AuthorizationStatus>) => {
      state.authorizationStatus = action.payload;
    }
  }
});

export const {setAuthorizationStatus} = userProcess.actions;
