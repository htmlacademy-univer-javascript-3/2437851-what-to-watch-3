import { ALL_FILMS_GENRE, DEFAULT_FILMS_PAGE_SIZE, Namespace } from '../../consts';
import { Film, FilmDetails, PromoFilm } from '../../types/film';
import { makeFakeFilm, makeFakeFilmDetails, makeFakePromoFilm } from '../../utils/mocks';
import { getAllFilms, getAllGenres, getCurrentFilm, getDiplayedFilmsCount, getFavoriteFilms, getFilms, getGenre, getIsLoading, getPromoFilm, getSimilarFilms } from './selectors';

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

describe('FilmsProcess selectors', () => {
  it('should return allGenres from state', () => {
    const allGenres = [ALL_FILMS_GENRE];
    const state = createState({allGenres});

    const result = getAllGenres({ [Namespace.Films]: state });

    expect(result).toBe(allGenres);
  });

  it('should return genre from state', () => {
    const genre = ALL_FILMS_GENRE;
    const state = createState({genre});

    const result = getGenre({ [Namespace.Films]: state });

    expect(result).toBe(genre);
  });

  it('should return currentFilm from state', () => {
    const currentFilm = makeFakeFilmDetails();
    const state = createState({currentFilm});

    const result = getCurrentFilm({ [Namespace.Films]: state });

    expect(result).toBe(currentFilm);
  });

  it('should return promoFilm from state', () => {
    const promoFilm = makeFakePromoFilm();
    const state = createState({promoFilm});

    const result = getPromoFilm({ [Namespace.Films]: state });

    expect(result).toBe(promoFilm);
  });

  it('should return allFilms from state', () => {
    const allFilms = Array.from({length: 5}).map(() => makeFakeFilm());
    const state = createState({allFilms});

    const result = getAllFilms({ [Namespace.Films]: state });

    expect(result).toBe(allFilms);
  });

  it('should return films from state', () => {
    const films = Array.from({length: 5}).map(() => makeFakeFilm());
    const state = createState({films});

    const result = getFilms({ [Namespace.Films]: state });

    expect(result).toBe(films);
  });

  it('should return favoriteFilms from state', () => {
    const favoriteFilms = Array.from({length: 5}).map(() => makeFakeFilm());
    const state = createState({favoriteFilms});

    const result = getFavoriteFilms({ [Namespace.Films]: state });

    expect(result).toBe(favoriteFilms);
  });

  it('should return similarFilms from state', () => {
    const similarFilms = Array.from({length: 5}).map(() => makeFakeFilm());
    const state = createState({similarFilms});

    const result = getSimilarFilms({ [Namespace.Films]: state });

    expect(result).toBe(similarFilms);
  });

  it('should return diplayedFilmsCount from state', () => {
    const diplayedFilmsCount = DEFAULT_FILMS_PAGE_SIZE;
    const state = createState({diplayedFilmsCount});

    const result = getDiplayedFilmsCount({ [Namespace.Films]: state });

    expect(result).toBe(diplayedFilmsCount);
  });

  it('should return isLoading from state', () => {
    const isLoading = false;
    const state = createState({isLoading});

    const result = getIsLoading({ [Namespace.Films]: state });

    expect(result).toBe(isLoading);
  });
});
