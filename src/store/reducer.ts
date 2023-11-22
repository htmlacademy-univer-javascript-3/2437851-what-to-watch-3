import { createReducer } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { loadFilms, selectGenre, showMoreFilms } from './action';
import { Genre } from '../types/genre';

const FILMS_PAGE_SIZE = 8;

const initialState = {
  genre: undefined as Genre | undefined,
  films: films,
  diplayedFilmsCount: FILMS_PAGE_SIZE,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state) => {
      state.films = films.filter((f) => state.genre === undefined || f.genre === state.genre);
      state.diplayedFilmsCount = FILMS_PAGE_SIZE;
    })
    .addCase(showMoreFilms, (state) => {
      state.diplayedFilmsCount += FILMS_PAGE_SIZE;
    });
});

export default reducer;
