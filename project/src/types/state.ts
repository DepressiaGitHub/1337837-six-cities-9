import { store } from '../store';
import { AuthorizationStatus } from '../const';
import { Offer } from './offer';
import { Property } from './property';
import { Comment } from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type AppData = {
  data: Offer[],
  activeCity: string,
  offersSortedByCity: Offer[],
  selectedType: string,
  offersSortedByType: Offer[],
  isDataLoaded: boolean,
  property: Property | null,
  comments: Comment[],
  nearbyOffers: Offer[],
  reviewFormStatus: 'initial'|'error'|'sending',
};

export type AppProcess = {
  offerByHover: number | null,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
