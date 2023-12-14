import { createReducer } from '@reduxjs/toolkit';
import { loadFilms, selectGenre, setAuthorizationStatus, setComments, setCurrentFilm, setFavoriteFilms, setFilms, setFilmsLoading, setPromoFilm, setSimilarFilms, showMoreFilms } from './action';
import { Genre } from '../types/genre';
import { Film, FilmDetails, PromoFilm } from '../types/film';
import { AuthorizationStatus } from '../consts';
import { Comment } from '../types/comment';

const FILMS_PAGE_SIZE = 8;

const initialState = {
  genre: undefined as Genre | undefined,
  currentFilm: undefined as FilmDetails | undefined,
  promoFilm: null as PromoFilm | null,
  allFilms: [] as Film[],
  films: [] as Film[],
  favoriteFilms: [] as Film[],
  similarFilms: [] as Film[],
  comments: [] as Comment[],
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
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setFilmsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export default reducer;
