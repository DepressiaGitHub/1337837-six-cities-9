import { Review } from '../components/types/review';

const IMG_URL = '/img/';

export const reviews: Review[] = [
  {
    id: '00001',
    user: {
      imgPath: `${IMG_URL}avatar-max.jpg`,
      name: 'Max',
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24',
  },
  {
    id: '00002',
    user: {
      imgPath: `${IMG_URL}avatar-angelina.jpg`,
      name: 'Angelina',
    },
    rating: 3,
    comment: 'Здоровый праздничный ужин вовсе не обязательно должен состоять из шпината, гречки и вареной куриной грудки. Самыми лучшими способами приготовления еды являются следующие: варка на пару, запекание или варка в воде. Помимо стандартных мандаринов и ананасов, отличным украшением любого стола станут необычные, экзотические фрукты. Здоровой может быть даже выпечка, если она приготовлена на пару.',
    date: '2020-07-05',
  },
  {
    id: '00003',
    user: {
      imgPath: `${IMG_URL}avatar-max.jpg`,
      name: 'Alex',
    },
    rating: 1,
    comment: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.',
    date: '2021-03-15',
  },
];
