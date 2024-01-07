import { describe, it } from 'vitest';
import { filmsProcess } from './films-process';
import { Film, FilmDetails, PromoFilm } from '../../types/film';
import { ALL_FILMS_GENRE, DEFAULT_FILMS_PAGE_SIZE } from '../../consts';
import { fetchFilm, fetchFilms } from '../api-actions';
import { makeFakeFilm, makeFakeFilmDetails } from '../../utils/mocks';

const defaultState = {
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

function createState(props: Partial<typeof defaultState>): typeof defaultState {
  return {
    ...defaultState,
    ...props
  };
}

describe('FilmsProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultState;

    const result = filmsProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = defaultState;

    const result = filmsProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set isLoading to true with "fetchFilms.pending" action', () => {
    const initialState = createState({});
    const expectedIsLoading = true;

    const result = filmsProcess.reducer(initialState, fetchFilms.pending);

    expect(result.isLoading).toBe(expectedIsLoading);
  });

  it('should set allFilms with "fetchFilms.fulfilled" action', () => {
    const initialState = createState({});
    const expectedAllFilms = Array.from({length: 5}).map(() => makeFakeFilm());

    const result = filmsProcess.reducer(initialState, fetchFilms.fulfilled(expectedAllFilms, '', undefined));

    expect(result.allFilms).toBe(expectedAllFilms);
  });

  it('should set films with "fetchFilms.fulfilled" action', () => {
    const initialState = createState({});
    const expectedFilms = Array.from({length: 5}).map(() => makeFakeFilm());

    const result = filmsProcess.reducer(initialState, fetchFilms.fulfilled(expectedFilms, '', undefined));

    expect(result.films).toBe(expectedFilms);
  });

  it('should set allGenres with "fetchFilms.fulfilled" action', () => {
    const initialState = createState({});
    const films = [makeFakeFilm()];
    const expectedAllGenres = ['All Genres', films[0].genre];

    const result = filmsProcess.reducer(initialState, fetchFilms.fulfilled(films, '', undefined));

    expect(result.allGenres).toStrictEqual(expectedAllGenres);
  });

  it('should set isLoading to false with "fetchFilms.fulfilled" action', () => {
    const initialState = createState({});
    const allFilms = Array.from({length: 5}).map(() => makeFakeFilm());
    const expectedIsLoading = false;

    const result = filmsProcess.reducer(initialState, fetchFilms.fulfilled(allFilms, '', undefined));

    expect(result.isLoading).toBe(expectedIsLoading);
  });

  it('should set isLoading to false with "fetchFilms.rejected" action', () => {
    const initialState = createState({});
    const expectedIsLoading = false;

    const result = filmsProcess.reducer(initialState, fetchFilms.rejected);

    expect(result.isLoading).toBe(expectedIsLoading);
  });

  it('should set isLoading to true with "fetchFilm.pending" action', () => {
    const initialState = createState({});
    const expectedIsLoading = true;

    const result = filmsProcess.reducer(initialState, fetchFilm.pending);

    expect(result.isLoading).toBe(expectedIsLoading);
  });

  it('should set currentFilm with "fetchFilm.fulfilled" action', () => {
    const initialState = createState({});
    const expectedCurrentFilm = makeFakeFilmDetails();

    const result = filmsProcess.reducer(initialState, fetchFilm.fulfilled(expectedCurrentFilm, '', ''));

    expect(result.currentFilm).toBe(expectedCurrentFilm);
  });

  it('should set isLoading to false with "fetchFilm.fulfilled" action', () => {
    const initialState = createState({});
    const currentFilm = makeFakeFilmDetails();
    const expectedIsLoading = false;

    const result = filmsProcess.reducer(initialState, fetchFilm.fulfilled(currentFilm, '', ''));

    expect(result.isLoading).toBe(expectedIsLoading);
  });

  it('should set isLoading to false with "fetchFilm.fulfilled" action', () => {
    const initialState = createState({});
    const expectedIsLoading = false;

    const result = filmsProcess.reducer(initialState, fetchFilm.rejected);

    expect(result.isLoading).toBe(expectedIsLoading);
  });
});
