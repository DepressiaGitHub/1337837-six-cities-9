import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORT: 'CHANGE_SORT',
  HOVER_OFFER: 'HOVER_OFFER',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);

export const changeSort = createAction<string>(Action.CHANGE_SORT);

export const hoverOffer = createAction<number | null>(Action.HOVER_OFFER);
