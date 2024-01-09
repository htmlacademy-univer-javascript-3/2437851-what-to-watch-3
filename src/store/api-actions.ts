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
  'check-auth',
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
  'login',
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
  'logout',
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
  'fetch-comments',
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
  'fetch-films',
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
  'fetch-film',
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
  'fetch-promo-film',
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
  'fetch-similar-films',
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
  'fetch-favorite-films',
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
