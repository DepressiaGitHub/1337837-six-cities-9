import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, hoverOffer } from './action';
import { CITIES } from '../components/const/const';
import { SORT } from '../components/const/const';
import { Offer } from '../components/types/offer';
import { offers } from '../mocks/offers';

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
const offersByCity = getOffersByCity(CITIES[DEFAULT_CITY_INDEX], offers);
const offersByType = getOffersBySort(SORT[0], offersByCity);
const offerByHover = null;

type initialStateProps = {
  activeCity: string,
  offers: Offer[],
  selectedCity: string,
  offersSortedByCity: Offer[],
  offersSortedByType: Offer[],
  offerByHover: number | null,
}

const initialState: initialStateProps = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offers: offers,
  selectedCity: SORT[0],
  offersSortedByCity: offersByCity,
  offersSortedByType: offersByType,
  offerByHover: offerByHover,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offersSortedByCity = getOffersByCity(state.activeCity, offers);

      // Выводим по умолчанию сортировку по первому варианту
      state.selectedCity = SORT[0];
      state.offersSortedByType = getOffersBySort(state.selectedCity, state.offersSortedByCity);
    });

  builder
    .addCase(changeSort, (state, action) => {
      state.selectedCity = action.payload;
      state.offersSortedByType = getOffersBySort(state.selectedCity, state.offersSortedByCity);
    });

  builder
    .addCase(hoverOffer, (state, action) => {
      state.offerByHover = action.payload;
    });
});


