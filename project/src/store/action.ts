import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../components/types/offer';
import { AppRoute, AuthorizationStatus } from '../components/const/const';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORT: 'CHANGE_SORT',
  HOVER_OFFER: 'HOVER_OFFER',
  LOAD_DATA_ACTION: 'LOAD_DATA_ACTION',
  SET_ERROR: 'SET_ERROR',
  SET_AUTHORIZATION: 'SET_AUTHORIZATION',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);

export const changeSort = createAction<string>(Action.CHANGE_SORT);

export const hoverOffer = createAction<number | null>(Action.HOVER_OFFER);

export const loadDataAction = createAction<Offer[]>(Action.LOAD_DATA_ACTION);

export const requireAuthorization = createAction<AuthorizationStatus>(Action.SET_AUTHORIZATION);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);
