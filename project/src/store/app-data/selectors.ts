import { NameSpace } from '../../const';
import { Comment } from '../../types/comment';
import { Offer } from '../../types/offer';
import { Property } from '../../types/property';
import { State } from '../../types/state';
import { UserData } from '../../types/user-data';


export const getOffersSortedByCity = (state: State): Offer[] => state[NameSpace.data].offersSortedByCity;
export const getOffersSortedByType = (state: State): Offer[] => state[NameSpace.data].offersSortedByType;
export const getIsDataLoaded = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getActiveCity = (state: State): string => state[NameSpace.data].activeCity;
export const getNearbyOffers = (state: State): Offer[] => state[NameSpace.data].nearbyOffers;
export const getProperty = (state: State): Property | null => state[NameSpace.data].property;
export const getSelectedType = (state: State): string => state[NameSpace.data].selectedType;
export const getComments = (state: State): Comment[] => state[NameSpace.data].comments;
export const getReviewFormStatus = (state: State): string => state[NameSpace.data].reviewFormStatus;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.data].favoriteOffers;
export const getIsFavoriteLoaded = (state: State): boolean => state[NameSpace.data].isFavoriteLoaded;
export const getUserData = (state: State): UserData | null => state[NameSpace.data].user;
