import { CITIES, DEFAULT_CITY_INDEX, DEFAULT_SORT_INDEX, SORTS } from '../../const';
import { AppData } from '../../types/state';
import { makeFakeOffer, makeFakeCity, makeFakeOfferList, makeFakeSort, makeFakeUser, makeFakeCommentList } from '../../utils/mocks';
import {
  appData,
  loadDataAction,
  sortData,
  loadUserAction,
  changeCity,
  changeSort,
  requireDataProperty,
  loadDataPropertyAction,
  loadDataCommentsAction,
  loadDataNearbyAction,
  setFormCommentStatus,
  loadFavoritesAction,
  requireFavoritesProperty,
  loadUpdateOffer,
} from './app-data';

const state: AppData = {
  data: [],
  user: null,
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offersSortedByCity: [],
  selectedType: SORTS[DEFAULT_SORT_INDEX],
  offersSortedByType: [],
  isDataLoaded: false,
  property: null,
  comments: [],
  nearbyOffers: [],
  reviewFormStatus: 'initial',
  favoriteOffers: [],
  isFavoriteLoaded: false,
  updateOffer: null,
};

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOfferList();
const fakeCity = makeFakeCity();
const fakeSort = makeFakeSort();
const fakeUser = makeFakeUser();
const fakeComments = makeFakeCommentList();

describe('Reducer: data', () => {
  it('без дополнительных параметров должен возвращать исходное состояние', () => {
    expect(appData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({state});
  });

  it('должен заполнить список объявлений при загрузке данных', () => {
    expect(appData.reducer(state, loadDataAction(fakeOffers)))
      .toEqual({
        ...state,
        data: fakeOffers,
        isDataLoaded: true,
      });
  });

  it('должен соритровать список объявлений', () => {
    expect(appData.reducer(state, sortData()))
      .toEqual({
        ...state,
        offersSortedByCity: fakeOffers,
        offersSortedByType: fakeOffers,
      });
  });

  it('должен получить данные пользователя при запросе', () => {
    expect(appData.reducer(state, loadUserAction(fakeUser)))
      .toEqual({
        ...state,
        user: fakeUser,
      });
  });

  it('должен фильтровать список объявлений при выборе города', () => {
    expect(appData.reducer(state, changeCity(fakeCity)))
      .toEqual({
        ...state,
        activeCity: fakeCity,
        selectedType: fakeSort,
        offersSortedByCity: fakeOffers,
        offersSortedByType: fakeOffers,
      });
  });

  it('должен соритровать список объявлений по типу', () => {
    expect(appData.reducer(state, changeSort(fakeSort)))
      .toEqual({
        ...state,
        offersSortedByType: fakeOffers,
      });
  });

  it('очищает объект объявления', () => {
    expect(appData.reducer(state, requireDataProperty()))
      .toEqual({
        ...state,
        property: null,
      });
  });

  it('должен получить список комментариев', () => {
    expect(appData.reducer(state, loadDataCommentsAction(fakeComments)))
      .toEqual({
        ...state,
        comments: fakeComments,
      });
  });

  it('заполняет данные по объекту объявления', () => {
    expect(appData.reducer(state, loadDataPropertyAction(fakeOffer)))
      .toEqual({
        ...state,
        property: fakeOffer,
      });
  });

  it('должен заполнить список объявлений неподалёку', () => {
    expect(appData.reducer(state, loadDataNearbyAction(fakeOffers)))
      .toEqual({
        ...state,
        nearbyOffers: fakeOffers,
      });
  });

  it('должен поменять статус формы на error', () => {
    expect(appData.reducer(state, setFormCommentStatus('error')))
      .toEqual({
        ...state,
        reviewFormStatus: 'error',
      });
  });

  it('должен заполнить список объявлений избранного', () => {
    expect(appData.reducer(state, loadFavoritesAction(fakeOffers)))
      .toEqual({
        ...state,
        nearbyOffers: fakeOffers,
        isFavoriteLoaded: true,
      });
  });

  it('должен поставить флаг для загрузки объявлений избранного на false', () => {
    expect(appData.reducer(state, requireFavoritesProperty()))
      .toEqual({
        ...state,
        isFavoriteLoaded: false,
      });
  });

  it('должен получить новый объект по объявлению при добавлении\удалении в избранное', () => {
    expect(appData.reducer(state, loadUpdateOffer(fakeOffer)))
      .toEqual({
        ...state,
        updateOffer: fakeOffer,
      });
  });
});
