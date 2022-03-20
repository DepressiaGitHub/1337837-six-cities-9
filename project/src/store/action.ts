import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../components/types/offer';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORT: 'CHANGE_SORT',
  HOVER_OFFER: 'HOVER_OFFER',
  LOAD_DATA_ACTION: 'LOAD_DATA_ACTION',
  SET_ERROR: 'SET_ERROR',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);

export const changeSort = createAction<string>(Action.CHANGE_SORT);

export const hoverOffer = createAction<number | null>(Action.HOVER_OFFER);

export const loadDataAction = createAction<Offer[]>(Action.LOAD_DATA_ACTION);

export const setError = createAction<string>(Action.SET_ERROR);
