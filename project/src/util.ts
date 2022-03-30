import { AuthorizationStatus } from './components/const/const';
import { Offer } from './types/offer';
import { SORT } from './components/const/const';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Unknown;

export const isAuth = (authorizationStatus: AuthorizationStatus): boolean => authorizationStatus === AuthorizationStatus.Auth;

export const getOffersByCity = (currentCity: string, array: Offer[]) => array.filter(({city}) => currentCity === city.name);

export const getOffersBySort = (currentSort: string, array: Offer[]) => {
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
