import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, hoverOffer, loadDataAction, setError } from './action';
import { CITIES } from '../components/const/const';
import { SORT } from '../components/const/const';
import { Offer } from '../components/types/offer';
// import { offers } from '../mocks/offers';

const getOffersByCity = (currentCity: string, array: Offer[]) => array.filter(({city}) => currentCity === city.name);

const getOffersBySort = (currentSort: string, array: Offer[]) => {
  const offersSortedByType = array.slice();

  switch (currentSort) {
    case SORT[0]:
      break;

    case SORT[1]:
      offersSortedByType.sort((a: Offer, b: Offer) => a.price - b.price);
      break;

    case SORT[2]:
      offersSortedByType.sort((a: Offer, b: Offer) => b.price - a.price);
      break;

    case SORT[3]:
      offersSortedByType.sort((a: Offer, b: Offer) => b.rating - a.rating);
      break;

    default:
      break;
  }

  return offersSortedByType;
};

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
  error: string,
  data: Offer[],
  isDataLoaded: boolean,
}

const initialState: initialStateProps = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offers: [],
  selectedType: SORT[0],
  offersSortedByCity: [],
  offersSortedByType: [],
  offerByHover: offerByHover,
  error: '',
  data: [],
  isDataLoaded: false,
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
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});


