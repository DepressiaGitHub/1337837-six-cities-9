import { address, datatype, image, internet, name, random } from 'faker';
import { Comment } from '../types/comment';
import { City, Offer } from '../types/offer';
import { AppProcess } from '../types/state';
import { UserData } from '../types/user-data';


const OFFERS_COUNT = 15;
const NEARBY_COUNT = 3;
const COMMENT_COUNT = 5;
const GOOODS_COUNT = 7;
const IMAGES_COUNT = 6;

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(5),
  city: {
    location: {
      latitude: datatype.float(30),
      longitude: datatype.float(30),
      zoom: datatype.number(10),
    },
    name: address.city(),
  },
  description: datatype.string(50),
  goods: new Array(GOOODS_COUNT).fill(null).map(() => datatype.string(10)),
  host: {
    id: datatype.number(50),
    name: name.firstName(),
    isPro: datatype.boolean(),
    avatarUrl: internet.avatar(),
  },
  id: datatype.number(50),
  images: new Array(IMAGES_COUNT).fill(null).map(() => image.image()),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: datatype.float(30),
    longitude: datatype.float(30),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(5),
  previewImage: image.image(),
  price: datatype.number(1000),
  rating: datatype.number(5),
  title: name.title(),
  type: random.word(),
} as Offer);

export const makeFakeOfferList = (): Offer[] => new Array(OFFERS_COUNT).fill(null).map(() => makeFakeOffer());
export const makeFakeNearbyList = (): Offer[] => new Array(NEARBY_COUNT).fill(null).map(() => makeFakeOffer());

export const makeFakeComment = (): Comment => ({
  comment: datatype.string(50),
  date: '2022-02-24T21:48:13.667Z',
  id: datatype.number(50),
  rating: datatype.number(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(50),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
} as Comment);

export const makeFakeCommentList = (): Comment[] => new Array(COMMENT_COUNT).fill(null).map(() => makeFakeComment());

export const makeFakeHoverOffer = (): AppProcess => ({
  offerByHover: datatype.number(50),
});

export const makeFakeCity = (): City => ({
  location: {
    latitude: datatype.number(),
    longitude: datatype.number(),
    zoom: datatype.number(),
  },
  name: address.city(),
});

export const makeFakeSort = () => ({
  selectedType: datatype.string(10) as string,
});

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(50),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(30),
});
