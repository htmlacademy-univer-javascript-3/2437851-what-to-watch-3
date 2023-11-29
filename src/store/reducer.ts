import { createReducer } from '@reduxjs/toolkit';
import { loadFilms, selectGenre, setCurrentFilm, setFilms, setFilmsLoading, setPromoFilm, showMoreFilms } from './action';
import { Genre } from '../types/genre';
import { Film, FilmDetails, PromoFilm } from '../types/film';

const FILMS_PAGE_SIZE = 8;

const initialState = {
  genre: undefined as Genre | undefined,
  currentFilm: undefined as FilmDetails | undefined,
  promoFilm: undefined as unknown as PromoFilm,
  allFilms: [] as Film[],
  films: [] as Film[],
  diplayedFilmsCount: FILMS_PAGE_SIZE,
  isLoading: false,
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
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setFilmsLoading, (state, action) => {
      state.isLoading = action.payload;
    });
});

export default reducer;
