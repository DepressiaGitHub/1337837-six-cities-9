export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/404',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}

export enum HttpCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
}

export const BACKEND_URL = 'https://9.react.pages.academy/six-cities';

export const REQUEST_TIMEOUT = 5000;

export const DEFAULT_CITY_INDEX = 0;

export const DEFAULT_SORT_INDEX = 0;

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const SORTS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

export const MIN_REVIEW_LENGTH = 50;

export const RATING_STARS = [5, 4, 3, 2, 1];

export const MAX_COMMENTS = 10;
