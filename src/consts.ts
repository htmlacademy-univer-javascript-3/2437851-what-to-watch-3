export const BACKEND_URL = 'https://13.design.pages.academy/wtw';

export const REQUEST_TIMEOUT_MS = 5000;

export const AUTH_TOKEN_KEY_NAME = 'WTW';

export const DEFAULT_FILMS_PAGE_SIZE = 8;

export const ALL_FILMS_GENRE = 'All Genres';

export const FILM_PREVIEW_DURATION_MS = 1000;

export const VISIBLE_GENRES_COUNT = 9;

export const SIMILAR_FILMS_VISIBLE_COUNT = 4;

export const DATE_FORMATTING_OPTIONS: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export enum AppRoute {
  Root = '/',
  Login = 'login',
  MyList = 'mylist',
  Films = 'films',
  Review = 'review',
  Player = 'player',
}

export enum Namespace {
  User = 'USER',
  Films = 'FILMS',
  Comments = 'COMMENTS',
}

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Films = '/films',
  Promo = '/promo',
  Comments = '/comments',
  Favorite = '/favorite',
}
