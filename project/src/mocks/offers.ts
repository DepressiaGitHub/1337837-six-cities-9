import { Offer } from '../components/types/offer';

const IMG_URL = '/img/';

export const offers: Offer[] = [
  {
    id: '00001',
    placeName: 'Beautiful &amp; luxurious apartment at great location',
    placeType: 'Apartment',
    price: 120,
    premiumMark: true,
    favorite: false,
    rating: 4,
    imgPath: `${IMG_URL}apartment-01.jpg`,
    city: {
      location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
  },
  {
    id: '00002',
    placeName: 'Wood and stone place',
    placeType: 'Private room',
    price: 80,
    premiumMark: false,
    favorite: true,
    rating: 4,
    imgPath: `${IMG_URL}room.jpg`,
    city: {
      location: {
        latitude: 52.369553943508,
        longitude: 4.85309666406198,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
  },
  {
    id: '00003',
    placeName: 'Canal View Prinsengracht',
    placeType: 'Apartment',
    price: 132,
    premiumMark: false,
    favorite: false,
    rating: 4,
    imgPath: `${IMG_URL}apartment-02.jpg`,
    city: {
      location: {
        latitude: 52.3909553943508,
        longitude: 4.929309666406198,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
  },
  {
    id: '00004',
    placeName: 'Nice, cozy, warm big bed apartment',
    placeType: 'Apartment',
    price: 180,
    premiumMark: true,
    favorite: false,
    rating: 5,
    imgPath: `${IMG_URL}apartment-03.jpg`,
    city: {
      location: {
        latitude: 52.3809553943508,
        longitude: 4.939309666406198,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
  },
];
