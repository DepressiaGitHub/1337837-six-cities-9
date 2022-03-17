import { createReducer } from '@reduxjs/toolkit';
import { changeCity, changeSort, hoverOffer } from './action';
import { CITIES } from '../components/const/const';
import { SORT } from '../components/const/const';
import { Offer } from '../components/types/offer';
import { offers } from '../mocks/offers';

const getOffersByCity = (currentCity: string, array: Offer[]) => array.filter(({city}) => currentCity === city.name);

const getOffersBySort = (currentSort: string, array: Offer[]) => {
  const sortedOffers = array.slice();

  switch (currentSort) {
    case SORT[0]:
      break;

    case SORT[1]:
      sortedOffers.sort((a: Offer, b: Offer) => a.price - b.price);
      break;

    case SORT[2]:
      sortedOffers.sort((a: Offer, b: Offer) => b.price - a.price);
      break;

    case SORT[3]:
      sortedOffers.sort((a: Offer, b: Offer) => b.rating - a.rating);
      break;

    default:
      break;
  }

  return sortedOffers;
};

const DEFAULT_CITY_INDEX = 1;
const offersByCity = getOffersByCity(CITIES[DEFAULT_CITY_INDEX], offers);
const offerByHover = null;

type initialStateProps = {
  activeCity: string,
  offers: Offer[],
  activeSort: string,
  sortedOffers: Offer[],
  activeOffer: number | null,
}

const initialState: initialStateProps = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offers: offersByCity,
  activeSort: SORT[0],
  sortedOffers: offersByCity,
  activeOffer: offerByHover,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offers = getOffersByCity(state.activeCity, offers);

      // Выводим по умолчанию сортировку по первому варианту
      state.activeSort = SORT[0];
      state.sortedOffers = getOffersBySort(state.activeSort, state.offers);
    });

  builder
    .addCase(changeSort, (state, action) => {
      state.activeSort = action.payload;
      state.sortedOffers = getOffersBySort(state.activeSort, state.offers);
    });

  builder
    .addCase(hoverOffer, (state, action) => {
      state.activeOffer = action.payload;
    });
});


