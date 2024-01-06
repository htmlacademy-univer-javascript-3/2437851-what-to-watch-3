import { describe, it } from 'vitest';
import { filmsProcess } from './films-process';
import { Genre } from '../../types/genre';
import { Film, FilmDetails, PromoFilm } from '../../types/film';

describe('FilmsProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      genre: undefined as Genre | undefined,
      currentFilm: undefined as FilmDetails | undefined,
      promoFilm: null as PromoFilm | null,
      allFilms: [] as Film[],
      films: [] as Film[],
      favoriteFilms: [] as Film[],
      similarFilms: [] as Film[],
      diplayedFilmsCount: 8,
      isLoading: false,
    };

    const result = filmsProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
