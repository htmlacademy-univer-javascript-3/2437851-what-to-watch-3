import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Film, FilmDetails, PromoFilm } from '../../types/film';
import { Genre } from '../../types/genre';
import { FILMS_PAGE_SIZE, Namespace } from '../../consts';

const initialState = {
  genre: undefined as Genre | undefined,
  currentFilm: undefined as FilmDetails | undefined,
  promoFilm: null as PromoFilm | null,
  allFilms: [] as Film[],
  films: [] as Film[],
  favoriteFilms: [] as Film[],
  similarFilms: [] as Film[],
  diplayedFilmsCount: FILMS_PAGE_SIZE,
  isLoading: false,
};

export const filmsProcess = createSlice({
  name: Namespace.Films,
  initialState,
  reducers: {
    selectGenre: (state, action: PayloadAction<Genre | undefined>) => {
      state.genre = action.payload;
    },
    loadFilms: (state) => {
      state.films = state.allFilms.filter((f) => state.genre === undefined || f.genre === state.genre);
      state.diplayedFilmsCount = FILMS_PAGE_SIZE;
    },
    showMoreFilms: (state) => {
      state.diplayedFilmsCount += FILMS_PAGE_SIZE;
    },
    setFilms :(state, action: PayloadAction<Film[]>) => {
      state.allFilms = action.payload;
      state.films = state.allFilms;
    },
    setSimilarFilms: (state, action: PayloadAction<Film[]>) => {
      state.similarFilms = action.payload;
    },
    setFavoriteFilms: (state, action: PayloadAction<Film[]>) => {
      state.favoriteFilms = action.payload;
    },
    setCurrentFilm: (state, action: PayloadAction<FilmDetails>) => {
      state.currentFilm = action.payload;
    },
    setPromoFilm: (state, action: PayloadAction<PromoFilm>) => {
      state.promoFilm = action.payload;
    },
    setFilmsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsFavorite: (state, action: PayloadAction<FilmDetails>) => {
      if (state.currentFilm?.id === action.payload.id) {
        state.currentFilm.isFavorite = action.payload.isFavorite;
      }

      if (state.promoFilm?.id === action.payload.id) {
        state.promoFilm.isFavorite = action.payload.isFavorite;
      }
    },
  }
});

export const {selectGenre, loadFilms, showMoreFilms, setFilms, setSimilarFilms, setFavoriteFilms, setCurrentFilm, setPromoFilm, setFilmsLoading, setIsFavorite} = filmsProcess.actions;
