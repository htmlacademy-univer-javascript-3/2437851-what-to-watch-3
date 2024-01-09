import { name, datatype, lorem, random, image, internet } from 'faker';
import { Comment } from '../types/comment';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { State } from '../types/state';
import { ALL_FILMS_GENRE, DEFAULT_FILMS_PAGE_SIZE } from '../consts';
import { Film, FilmDetails, PromoFilm } from '../types/film';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeComment = (): Comment => ({
  id: datatype.uuid(),
  date: datatype.datetime().toISOString(),
  user: name.findName(),
  comment: lorem.paragraph(),
  rating: datatype.number(),
});

export const makeFakeFilmDetails = (): FilmDetails => ({
  id: datatype.uuid(),
  name: random.words(5),
  posterImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: internet.color(),
  videoLink: internet.url(),
  description: lorem.sentences(3),
  rating: datatype.number(10),
  scoresCount: datatype.number(),
  director: name.findName(),
  starring: Array.from({length: 3}).map(() => name.findName()),
  runTime: datatype.number(),
  genre: random.word(),
  released: datatype.datetime().getFullYear(),
  isFavorite: datatype.boolean(),
});

export const makeFakePromoFilm = (): PromoFilm => makeFakeFilmDetails() as Pick<FilmDetails, keyof PromoFilm>;

export const makeFakeFilm = (): Film => ({
  ...makeFakeFilmDetails(),
  previewImage: image.imageUrl(),
  previewVideoLink: internet.url(),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  USER: { authorizationDetails: undefined, },
  FILMS: {
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
  },
  COMMENTS: { comments: [] as Comment[], },
  ...initialState ?? {},
});
