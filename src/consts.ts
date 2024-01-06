export const AUTH_TOKEN_KEY_NAME = 'WTW';

export const FILMS_PAGE_SIZE = 8;

export enum AppRoute {
  Root = '/',
  Login = 'login',
  MyList = 'mylist',
  Films = 'films',
  Review = 'review',
  Player = 'player',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Namespace {
  User = 'USER',
  Films = 'FILMS',
  Comments = 'COMMENTS',
}
