import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Namespace } from '../../consts';
import { Comment } from '../../types/comment';

const initialState = {
  comments: [] as Comment[],
};

export const commentsProcess = createSlice({
  name: Namespace.Comments,
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    }
  }
});

export const {setComments} = commentsProcess.actions;
