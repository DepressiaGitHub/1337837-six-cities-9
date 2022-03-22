import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, hoverOffer, loadDataAction, requireAuthorization } from './action';
import { CITIES } from '../components/const/const';
import { SORT } from '../components/const/const';
import { Offer } from '../components/types/offer';
import { AuthorizationStatus } from '../components/const/const';
// import { offers } from '../mocks/offers';
import { getOffersByCity, getOffersBySort } from '../util';

const DEFAULT_CITY_INDEX = 0;
// const offersByCity = getOffersByCity(CITIES[DEFAULT_CITY_INDEX], offers);
// const offersByType = getOffersBySort(SORT[0], offersByCity);
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
};

export const reducer = createReducer(initialState, (builder) => {
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
    .addCase(loadDataAction, (state, action) => {
      state.data = action.payload;
      state.offersSortedByCity = getOffersByCity(state.activeCity, state.data);
      state.offersSortedByType = getOffersBySort(state.selectedType, state.offersSortedByCity);
      state.isDataLoaded = true;
    });

  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus =action.payload;
    });
});


