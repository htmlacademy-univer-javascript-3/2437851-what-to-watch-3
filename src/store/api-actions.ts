import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Film, FilmDetails, PromoFilm } from '../types/film';
import { APIRoute, AppRoute } from '../consts';
import { Comment } from '../types/comment';
import { AuthorizationDetails } from '../types/auth';
import { dropToken, saveToken } from '../services/token';
import { redirectToRoute } from './action';
import { setIsFavorite } from './films-process/films-process';

export const checkAuth = createAsyncThunk<AuthorizationDetails, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<AuthorizationDetails>(APIRoute.Login);
    return data;
  },
);

export const login = createAsyncThunk<AuthorizationDetails, {email: string; password: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (credentials, {dispatch, extra: api}) => {
    const {data} = await api.post<AuthorizationDetails>(APIRoute.Login, credentials);
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchComments = createAsyncThunk<Comment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/fetchComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);
    return data;
  },
);

export const fetchFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/fetchFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const fetchFilm = createAsyncThunk<FilmDetails, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/fetchFilm',
  async (id, {extra: api}) => {
    const {data} = await api.get<FilmDetails>(`${APIRoute.Films}/${id}`);
    return data;
  },
);

export const fetchPromoFilm = createAsyncThunk<PromoFilm, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/fetchPromoFilm',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<PromoFilm>(APIRoute.Promo);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<Film[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/fetchSimilarFilms',
  async (id, {extra: api}) => {
    const {data} = await api.get<Film[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  },
);

export const fetchFavoriteFilms = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/fetchFavoriteFilms',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Favorite);
    return data;
  },
);

export const postReview = createAsyncThunk<void, { filmId: string; comment: string; rating: number}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/postReview',
  async ({ filmId, comment, rating }, { dispatch, extra: api }) => {
    await api.post(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`${AppRoute.Films}/${filmId}`));
  },
);

export const setIsFavoriteFilm = createAsyncThunk<void, { filmId: string; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'films/setIsFavoriteFilm',
  async ({filmId, status}, { dispatch, extra: api }) => {
    const {data} = await api.post<FilmDetails>(`${APIRoute.Favorite}/${filmId}/${status}`);
    dispatch(setIsFavorite(data));
    dispatch(fetchFavoriteFilms());
  },
);
