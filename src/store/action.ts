import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../types/genre';

export const selectGenre = createAction('select-genre', (genre: Genre | undefined) => ({
  payload: genre,
}));

export const loadFilms = createAction('load-films');

export const showMoreFilms = createAction('show-more-films');
