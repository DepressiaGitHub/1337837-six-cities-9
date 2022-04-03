import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { Offer } from './offer';
import { Property } from './property';
import { Comment } from './comment';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type AppData = {
  data: Offer[],
  user: UserData | null,
  activeCity: string,
  offersSortedByCity: Offer[],
  selectedType: string,
  offersSortedByType: Offer[],
  isDataLoaded: boolean,
  property: Property | null,
  comments: Comment[],
  nearbyOffers: Offer[],
  reviewFormStatus: 'initial'|'error'|'sending',
  favoriteOffers: Offer[],
  isFavoriteLoaded: boolean,
  updateOffer: Offer | null,
};

export type AppProcess = {
  offerByHover: number | null,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
