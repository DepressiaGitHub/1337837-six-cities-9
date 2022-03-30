import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  changeSort,
  hoverOffer,
  loadDataAction,
  requireDataProperty,
  loadDataPropertyAction,
  loadDataCommentsAction,
  loadDatNearbyAction,
  requireAuthorization,
  setFormCommentData
} from './action';
import { CITIES, SORT, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { Comment } from '../types/comment';
import { getOffersByCity, getOffersBySort } from '../util';
import { Property } from '../types/property';
import { MyComment } from '../types/my-comment';

const DEFAULT_CITY_INDEX = 0;
const offerByHover = null;

type initialStateProps = {
  activeCity: string,
  offers: Offer[],
  selectedType: string,
  offersSortedByCity: Offer[],
  offersSortedByType: Offer[],
  offerByHover: number | null,
  data: Offer[],
  isDataLoaded: boolean,
  authorizationStatus: AuthorizationStatus,
  property: Property | null,
  comments: Comment[],
  nearbyOffers: Offer[],
  myComment: MyComment | null,
  reviewFormStatus: 'initial'|'error'|'sending',
}

const initialState: initialStateProps = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offers: [],
  selectedType: SORT[0],
  offersSortedByCity: [],
  offersSortedByType: [],
  offerByHover: offerByHover,
  data: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  property: null,
  comments: [],
  nearbyOffers: [],
  myComment: null,
  reviewFormStatus: 'initial',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadDataAction, (state, action) => {
      state.data = action.payload;
      state.offersSortedByCity = getOffersByCity(state.activeCity, state.data);
      state.offersSortedByType = getOffersBySort(state.selectedType, state.offersSortedByCity);
      state.isDataLoaded = true;
    });

  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offersSortedByCity = getOffersByCity(state.activeCity, state.data);

      // Выводим по умолчанию сортировку по первому варианту
      state.selectedType = SORT[0];
      state.offersSortedByType = getOffersBySort(state.selectedType, state.offersSortedByCity);
    });

  builder
    .addCase(changeSort, (state, action) => {
      state.selectedType = action.payload;
      state.offersSortedByType = getOffersBySort(state.selectedType, state.offersSortedByCity);
    });

  builder
    .addCase(hoverOffer, (state, action) => {
      state.offerByHover = action.payload;
    });

  builder
    .addCase(loadDataPropertyAction, (state, action) => {
      state.property = action.payload;
    });

  builder
    .addCase(requireDataProperty, (state) => {
      state.property = null;
    });

  builder
    .addCase(loadDataCommentsAction, (state, action) => {
      state.comments = action.payload;
    });

  builder
    .addCase(loadDatNearbyAction, (state, action) => {
      state.nearbyOffers = action.payload;
    });

  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });

  builder
    .addCase(setFormCommentData, (state, action) => {
      state.reviewFormStatus = action.payload;
    });
});


