import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../components/types/offer';
import { Property } from '../components/types/property';
import { AppRoute, AuthorizationStatus } from '../components/const/const';
import { Comment } from '../components/types/comment';
import { MyComment } from '../components/types/my-comment';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORT: 'CHANGE_SORT',
  HOVER_OFFER: 'HOVER_OFFER',
  LOAD_DATA_ACTION: 'LOAD_DATA_ACTION',
  SET_PROPERTY: 'SET_PROPERTY',
  LOAD_DATA_PROPERTY_ACTION: 'LOAD_DATA_PROPERTY_ACTION',
  LOAD_DATA_COMMENTS_ACTION: 'LOAD_DATA_COMMENTS_ACTION',
  LOAD_DATA_NEARBY_ACTION: 'LOAD_DATA_NEARBY_ACTION',
  SET_ERROR: 'SET_ERROR',
  SET_AUTHORIZATION: 'SET_AUTHORIZATION',
  REDIRECT_TO_ROUTE: 'REDIRECT_TO_ROUTE',
  SEND_DATA_COMMENT_ACTION: 'SEND_DATA_COMMENT_ACTION',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);

export const changeSort = createAction<string>(Action.CHANGE_SORT);

export const hoverOffer = createAction<number | null>(Action.HOVER_OFFER);

export const loadDataAction = createAction<Offer[]>(Action.LOAD_DATA_ACTION);

export const requireDataProperty = createAction(Action.SET_PROPERTY);

export const loadDataPropertyAction = createAction<Property>(Action.LOAD_DATA_PROPERTY_ACTION);

export const loadDataCommentsAction = createAction<Comment[]>(Action.LOAD_DATA_COMMENTS_ACTION);

export const loadDatNearbyAction = createAction<Offer[]>(Action.LOAD_DATA_NEARBY_ACTION);

export const requireAuthorization = createAction<AuthorizationStatus>(Action.SET_AUTHORIZATION);

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);

export const sendDataCommentAction = createAction<MyComment>(Action.SEND_DATA_COMMENT_ACTION);
