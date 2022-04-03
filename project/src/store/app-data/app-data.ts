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
        const indexData = state.data.findIndex((offer) => offer.id === action.payload.id);
        state.data = [
          ...state.data.slice(0, indexData),
          action.payload,
          ...state.data.slice(indexData + 1),
        ];

        const indexDataByCity = state.offersSortedByCity.findIndex((offer) => offer.id === action.payload.id);
        state.offersSortedByCity = [
          ...state.offersSortedByCity.slice(0, indexDataByCity),
          action.payload,
          ...state.offersSortedByCity.slice(indexDataByCity + 1),
        ];

        const indexDataByType = state.offersSortedByType.findIndex((offer) => offer.id === action.payload.id);
        state.offersSortedByType = [
          ...state.offersSortedByType.slice(0, indexDataByType),
          action.payload,
          ...state.offersSortedByType.slice(indexDataByType + 1),
        ];

        const indexDateByFavorites = state.favoriteOffers.findIndex((offer) => offer.id === action.payload.id);
        state.favoriteOffers = [
          ...state.favoriteOffers.slice(0, indexDateByFavorites),
          ...state.favoriteOffers.slice(indexDateByFavorites + 1),
        ];
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
