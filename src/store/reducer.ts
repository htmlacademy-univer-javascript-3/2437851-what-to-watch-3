import { createReducer } from '@reduxjs/toolkit';
import { loadFilms, selectGenre, setAuthorizationStatus, setCurrentFilm, setFilms, setFilmsLoading, setPromoFilm, showMoreFilms } from './action';
import { Genre } from '../types/genre';
import { Film, FilmDetails, PromoFilm } from '../types/film';
import { AuthorizationStatus } from '../consts';

const FILMS_PAGE_SIZE = 8;

const initialState = {
  genre: undefined as Genre | undefined,
  currentFilm: undefined as FilmDetails | undefined,
  promoFilm: null as PromoFilm | null,
  allFilms: [] as Film[],
  films: [] as Film[],
  diplayedFilmsCount: FILMS_PAGE_SIZE,
  isLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state) => {
      state.films = state.allFilms.filter((f) => state.genre === undefined || f.genre === state.genre);
      state.diplayedFilmsCount = FILMS_PAGE_SIZE;
    })
    .addCase(showMoreFilms, (state) => {
      state.diplayedFilmsCount += FILMS_PAGE_SIZE;
    })
    .addCase(setFilms, (state, action) => {
      state.allFilms = action.payload;
      state.films = state.allFilms;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setFilmsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export default reducer;
