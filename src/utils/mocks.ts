import {name, datatype, lorem} from 'faker';
import { Comment } from '../types/comment';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { AuthorizationStatus, FILMS_PAGE_SIZE } from '../consts';
import { Genre } from '../types/genre';
import { Film, FilmDetails, PromoFilm } from '../types/film';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeComment = (): Comment => ({
  id: datatype.uuid(),
  date: datatype.datetime().toISOString(),
  user: name.title(),
  comment: lorem.paragraph(),
  rating: datatype.number()
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: { authorizationStatus: AuthorizationStatus.Unknown, },
  FILMS: {
    genre: undefined as Genre | undefined,
    currentFilm: undefined as FilmDetails | undefined,
    promoFilm: null as PromoFilm | null,
    allFilms: [] as Film[],
    films: [] as Film[],
    favoriteFilms: [] as Film[],
    similarFilms: [] as Film[],
    diplayedFilmsCount: FILMS_PAGE_SIZE,
    isLoading: false,
  },
  COMMENTS: { comments: [] as Comment[], },
  ...initialState ?? {},
});
