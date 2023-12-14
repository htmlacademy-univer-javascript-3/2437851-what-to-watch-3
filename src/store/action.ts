import { createAction } from '@reduxjs/toolkit';
import { Genre } from '../types/genre';
import { Film, FilmDetails, PromoFilm } from '../types/film';
import { AuthorizationStatus } from '../consts';
import { Comment } from '../types/comment';

export const selectGenre = createAction<Genre | undefined>('select-genre');

export const loadFilms = createAction('load-films');

export const showMoreFilms = createAction('show-more-films');

export const setFilms = createAction<Film[]>('set-films');

export const setSimilarFilms = createAction<Film[]>('set-similar-films');

export const setFavoriteFilms = createAction<Film[]>('set-favorite-films');

export const setCurrentFilm = createAction<FilmDetails>('set-current-film');

export const setPromoFilm = createAction<PromoFilm>('set-promo-film');

export const setComments = createAction<Comment[]>('set-comments');

export const setFilmsLoading = createAction<boolean>('set-films-loading');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('set-authorization-status');

export const redirectToRoute = createAction<string>('redirect-to-route');
