/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Film, FilmDetails, PromoFilm } from '../types/film';
import { APIRoute } from '../routes';
import { setAuthorizationStatus, setCurrentFilm, setFilms, setFilmsLoading, setPromoFilm } from './action';
import { AuthorizationStatus } from '../consts';

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

export const checkLogin = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(`${APIRoute.Login}`);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);

export const login = createAsyncThunk<void, {email: string; password: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'login',
  async (credentials, {dispatch, extra: api}) => {
    try {
      await api.post(`${APIRoute.Login}`, credentials);
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    } catch {
      dispatch(setAuthorizationStatus(AuthorizationStatus.NoAuth));
    }
  },
);
