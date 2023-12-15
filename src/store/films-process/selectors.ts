import { Namespace } from '../../consts';
import { State } from '../../types/state';

export const getAllFilms = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].allFilms;

export const getCurrentFilm = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].currentFilm;

export const getDiplayedFilmsCount = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].diplayedFilmsCount;

export const getFavoriteFilms = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].favoriteFilms;

export const getFilms = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].films;

export const getGenre = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].genre;

export const getIsLoading = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].isLoading;

export const getPromoFilm = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].promoFilm;

export const getSimilarFilms = (state: Pick<State, Namespace.Films>) => state[Namespace.Films].similarFilms;
