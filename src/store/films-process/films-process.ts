import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Film, FilmDetails, PromoFilm } from '../../types/film';
import { Genre } from '../../types/genre';
import { ALL_FILMS_GENRE, DEFAULT_FILMS_PAGE_SIZE, Namespace, VISIBLE_GENRES_COUNT } from '../../consts';
import { fetchFavoriteFilms, fetchFilm, fetchFilms, fetchPromoFilm, fetchSimilarFilms } from '../api-actions';

const initialState = {
  allGenres: [ALL_FILMS_GENRE],
  genre: ALL_FILMS_GENRE,
  currentFilm: undefined as FilmDetails | undefined,
  promoFilm: null as PromoFilm | null,
  allFilms: [] as Film[],
  films: [] as Film[],
  favoriteFilms: [] as Film[],
  similarFilms: [] as Film[],
  diplayedFilmsCount: DEFAULT_FILMS_PAGE_SIZE,
  isLoading: false,
};

export const filmsProcess = createSlice({
  name: Namespace.Films,
  initialState,
  reducers: {
    selectGenre: (state, action: PayloadAction<Genre>) => {
      state.genre = action.payload;
    },
    loadFilms: (state) => {
      state.films = state.genre === ALL_FILMS_GENRE ? state.allFilms : state.allFilms.filter((f) => f.genre === state.genre);
      state.diplayedFilmsCount = DEFAULT_FILMS_PAGE_SIZE;
    },
    showMoreFilms: (state) => {
      state.diplayedFilmsCount += DEFAULT_FILMS_PAGE_SIZE;
    },
    setIsFavorite: (state, action: PayloadAction<FilmDetails>) => {
      if (state.currentFilm?.id === action.payload.id) {
        state.currentFilm.isFavorite = action.payload.isFavorite;
      }

      if (state.promoFilm?.id === action.payload.id) {
        state.promoFilm.isFavorite = action.payload.isFavorite;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.allFilms = action.payload;
        state.films = action.payload;
        state.allGenres = [...new Set(state.allFilms.map((f) => f.genre))].slice(0, VISIBLE_GENRES_COUNT);
        state.allGenres.unshift(ALL_FILMS_GENRE);
        state.isLoading = false;
      })
      .addCase(fetchFilms.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.currentFilm = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchPromoFilm.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPromoFilm.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      });
  }
});

export const {selectGenre, loadFilms, showMoreFilms, setIsFavorite} = filmsProcess.actions;
