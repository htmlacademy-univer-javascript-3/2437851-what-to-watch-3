import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Film, FilmDetails, PromoFilm } from '../types/film';
import { APIRoute } from '../routes';
import { AppRoute, AuthorizationStatus } from '../consts';
import { Comment } from '../types/comment';
import { AuthorizationDetails } from '../types/auth';
import { saveToken } from '../services/token';
import { setCurrentFilm, setFavoriteFilms, setFilms, setFilmsLoading, setIsFavorite, setPromoFilm } from './films-process/films-process';
import { setComments } from './comments-process/comments-process';
import { setAuthorizationStatus } from './user-process/user-process';
import { redirectToRoute } from './action';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetch-films',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoading(true));
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setFilms(data));
    dispatch(setFilmsLoading(false));
  },
);

export const fetchFilm = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetch-film',
  async (id, {dispatch, extra: api}) => {
    dispatch(setFilmsLoading(true));
    const {data} = await api.get<FilmDetails>(`${APIRoute.Films}/${id}`);
    dispatch(setCurrentFilm(data));
    dispatch(setFilmsLoading(false));
  },
);

export const fetchPromoFilm = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetch-promo-film',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoading(true));
    const {data} = await api.get<PromoFilm>(`${APIRoute.Promo}`);
    dispatch(setPromoFilm(data));
    dispatch(setFilmsLoading(false));
  },
);

export const fetchSimilarFilms = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetch-similar-films',
  async (id, {dispatch, extra: api}) => {
    dispatch(setFilmsLoading(true));
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    dispatch(setFilms(data));
    dispatch(setFilmsLoading(false));
  },
);

export const fetchFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetch-favorite-films',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Favorite);
    dispatch(setFavoriteFilms(data));
  },
);

export const fetchComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetch-comments',
  async (id, {dispatch, extra: api}) => {
    dispatch(setFilmsLoading(true));
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    dispatch(setComments(data));
    dispatch(setFilmsLoading(false));
  },
);

export const checkLogin = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'check-auth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  },
);

export const login = createAsyncThunk<void, {email: string; password: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async (credentials, {dispatch, extra: api}) => {
    const {data} = await api.post<AuthorizationDetails>(`${APIRoute.Login}`, credentials);
    saveToken(data.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const postReview = createAsyncThunk<void, { filmId: string; comment: string; rating: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'post-review',
  async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
  },
);

export const changeFavoriteFilm = createAsyncThunk<void, { filmId: string; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'change-favorite-film',
  async ({filmId, status}, { dispatch, extra: api }) => {
    const {data} = await api.post<FilmDetails>(`${APIRoute.Favorite}/${filmId}/${status}`);
    dispatch(setIsFavorite(data));
    dispatch(fetchFavoriteFilms());
  },
);
