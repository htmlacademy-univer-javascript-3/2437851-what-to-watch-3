import { combineReducers } from '@reduxjs/toolkit';
import { Namespace } from '../consts';
import { userProcess } from './user-process/user-process';
import { filmsProcess } from './films-process/films-process';
import { commentsProcess } from './comments-process/comments-process';

export const rootReducer = combineReducers({
  [Namespace.User]: userProcess.reducer,
  [Namespace.Films]: filmsProcess.reducer,
  [Namespace.Comments]: commentsProcess.reducer,
});
