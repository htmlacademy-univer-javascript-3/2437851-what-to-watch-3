import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../consts.ts';
import { checkAuth, login, logout } from '../api-actions.ts';
import { AuthorizationDetails } from '../../types/auth.ts';

const initialState = {
  authorizationDetails: undefined as AuthorizationDetails | undefined,
};

export const userProcess = createSlice({
  name: Namespace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authorizationDetails = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationDetails = undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.authorizationDetails = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.authorizationDetails = undefined;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authorizationDetails = undefined;
      });
  }
});
