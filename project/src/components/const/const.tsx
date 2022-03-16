export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORT = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export const MIN_REVIEW_LENGTH = 50;

export const RATING_STARS = [5, 4, 3, 2, 1];
