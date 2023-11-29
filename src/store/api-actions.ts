import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { Film, FilmDetails, PromoFilm } from '../types/film';
import { APIRoute } from '../routes';
import { setCurrentFilm, setFilms, setFilmsLoading, setPromoFilm } from './action';

export const fetchFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'fetch-films',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsLoading(true));
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setFilmsLoading(false));
    dispatch(setFilms(data));
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
    dispatch(setFilmsLoading(false));
    dispatch(setCurrentFilm(data));
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
    dispatch(setFilmsLoading(false));
    dispatch(setPromoFilm(data));
  },
);
