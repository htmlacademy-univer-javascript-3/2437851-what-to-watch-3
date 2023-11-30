import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../types/genre';
import { Film, FilmDetails, PromoFilm } from '../types/film';

export const selectGenre = createAction<Genre | undefined>('select-genre');

export const loadFilms = createAction('load-films');

export const showMoreFilms = createAction('show-more-films');

export const setFilms = createAction<Film[]>('set-films');

export const setCurrentFilm = createAction<FilmDetails>('set-current-film');

export const setPromoFilm = createAction<PromoFilm>('set-promo-film');

export const setFilmsLoading = createAction<boolean>('set-films-loading');
