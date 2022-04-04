import { SORTS, AuthorizationStatus } from './const';
import { Offer } from './types/offer';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;

export const isAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const getOffersByCity = (currentCity: string, array: Offer[]) => array.filter(({city}) => currentCity === city.name);

export const getOffersBySort = (currentSort: string, array: Offer[]) => {
  const offersSortedByType = array.slice();

  switch (currentSort) {
    case SORTS[0]:
      break;

    case SORTS[1]:
      offersSortedByType.sort((a: Offer, b: Offer) => a.price - b.price);
      break;

    case SORTS[2]:
      offersSortedByType.sort((a: Offer, b: Offer) => b.price - a.price);
      break;

    case SORTS[3]:
      offersSortedByType.sort((a: Offer, b: Offer) => b.rating - a.rating);
      break;

    default:
      break;
  }

  return offersSortedByType;
};

export const getRandomCity = (array: string[]) => {
  const index = Math.floor(Math.random()*array.length);
  return array[index];
};
