import { createSlice } from '@reduxjs/toolkit';
import {
  CITIES,
  DEFAULT_CITY_INDEX,
  DEFAULT_SORT_INDEX,
  SORT,
  NameSpace
} from '../../const';
import { AppData } from '../../types/state';
import { getOffersByCity, getOffersBySort } from '../../util';

const initialState: AppData = {
  data: [],
  user: null,
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offersSortedByCity: [],
  selectedType: SORT[DEFAULT_SORT_INDEX],
  offersSortedByType: [],
  isDataLoaded: false,
  property: null,
  comments: [],
  nearbyOffers: [],
  reviewFormStatus: 'initial',
  favoriteOffers: [],
  isFavoriteLoaded: false,
  updateOffer: null,
};

export const appData = createSlice({
  name: NameSpace.data,
  initialState,
  reducers: {
    loadDataAction: (state, action) => {
      state.data = action.payload;
      state.offersSortedByCity = getOffersByCity(state.activeCity, state.data);
      state.offersSortedByType = getOffersBySort(state.selectedType, state.offersSortedByCity);
      state.isDataLoaded = true;
    },
    loadUserAction: (state, action) => {
      state.user = action.payload;
    },
    changeCity: (state, action) => {
      state.activeCity = action.payload;
      state.offersSortedByCity = getOffersByCity(state.activeCity, state.data);

      // Выводим по умолчанию сортировку по первому варианту
      state.selectedType = SORT[0];
      state.offersSortedByType = getOffersBySort(state.selectedType, state.offersSortedByCity);
    },
    changeSort: (state, action) => {
      state.selectedType = action.payload;
      state.offersSortedByType = getOffersBySort(state.selectedType, state.offersSortedByCity);
    },
    requireDataProperty: (state) => {
      state.property = null;
    },
    loadDataPropertyAction: (state, action) => {
      state.property = action.payload;
    },
    loadDataCommentsAction: (state, action) => {
      state.comments = action.payload;
    },
    loadDataNearbyAction: (state, action) => {
      state.nearbyOffers = action.payload;
    },
    setFormCommentStatus: (state, action) => {
      state.reviewFormStatus = action.payload;
    },
    loadFavoritesAction: (state, action) => {
      state.favoriteOffers = action.payload;
      state.isFavoriteLoaded = true;
    },
    requireFavoritesProperty: (state) => {
      state.isFavoriteLoaded = false;
    },
    loadUpdateOffer: (state, action) => {
      state.updateOffer = action.payload;
      if (state.updateOffer !== null) {
        // let currentOffer = state.data.find((offer) => offer.id === action.payload.id);
        // if (currentOffer) {
        //   currentOffer = action.payload;
        // }
        state.data[state.updateOffer.id - 1] = action.payload;
      }
    },
  },
});

export const {
  loadDataAction,
  loadUserAction,
  changeCity,
  changeSort,
  requireDataProperty,
  loadDataPropertyAction,
  loadDataCommentsAction,
  loadDataNearbyAction,
  setFormCommentStatus,
  loadFavoritesAction,
  requireFavoritesProperty,
  loadUpdateOffer,
} = appData.actions;
