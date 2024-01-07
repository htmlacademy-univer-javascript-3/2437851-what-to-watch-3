import { createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../consts';
import { Comment } from '../../types/comment';
import { fetchComments } from '../api-actions';

const initialState = {
  comments: [] as Comment[],
};

export const commentsProcess = createSlice({
  name: Namespace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      });
  }
});
