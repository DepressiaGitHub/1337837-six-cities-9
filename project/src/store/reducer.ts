import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from './action';
import { CITIES } from '../components/const/const';
import { Offer } from '../components/types/offer';
import { offers } from '../mocks/offers';

const getOffersByCity = (currentCity: string, array: Offer[]) => array.filter(({city}) => currentCity === city.name);

const DEFAULT_CITY_INDEX = 0;
const offersByCity = getOffersByCity(CITIES[DEFAULT_CITY_INDEX], offers);

const initialState = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offers: offersByCity,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offers = getOffersByCity(state.activeCity, offers);
      // eslint-disable-next-line no-console
      console.log(state.offers);
    });
});


