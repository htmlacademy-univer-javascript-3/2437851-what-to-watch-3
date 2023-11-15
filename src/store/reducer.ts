import { createReducer } from '@reduxjs/toolkit';
import { films } from '../mocks/films';
import { loadFilms, selectGenre } from './action';
import { Genre } from '../types/genre';

const initialState = {
  genre: undefined as Genre | undefined,
  films: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(selectGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(loadFilms, (state) => {
      state.films = films.filter((f) => state.genre === undefined || f.genre === state.genre);
    });
});

export default reducer;
