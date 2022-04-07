import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {checkAuthAction, fetchDataAction, fetchDataCommentsAction, fetchDataNearbyAction, fetchDataPropertyAction, fetchFavoritesAction, loginAction, logoutAction, postDataCommentAction, postFavoritesAction} from './api-actions';
import {requireAuthorization} from './user-process/user-process';
import {APIRoute, AuthorizationStatus} from '../const';
import {State} from '../types/state';
import { AuthData } from '../types/auth-data';
import { makeFakeOffer, makeFakeOfferList, makeFakeComment, makeFakeCommentList } from '../utils/mocks';
import { loadDataAction, loadDataCommentsAction, loadDataNearbyAction, loadDataPropertyAction, loadFavoritesAction, loadUpdateOffer, setFormCommentStatus, sortData } from './app-data/app-data';

describe('асинхронные действия', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);


  // Тест на авторизацию с кодом 200.
  it('должен поменять статус на «auth» когда сервер вернёт код 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store).toEqual({
      ...store,
      authorizationStatus: AuthorizationStatus.Auth,
    });

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });


  // Тест на авторизацию с кодом 400.
  it('должен поменять статус на «noauth» когда сервер вернёт код 400', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(400, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store).toEqual({
      ...store,
      authorizationStatus: AuthorizationStatus.NoAuth,
    });

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());
  });


  // Тест на успешный вход и перенаправление на главную.
  it('должен произойти диспатч RequriedAuthorization и RedirectToRoute когда происходит POST на /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: 'ff123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore(); // Создаём хранилище.
    Storage.prototype.setItem = jest.fn(); // Функция пустышка для jest, чтобы можно было с ней работать и считать.

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.setItem).toBeCalledTimes(1); // Ожидаем, что после всех действий вызов был совершён 1 раз.
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret'); // Проверяем, что функция была вызвана с аргументами.
  });


  // Тест на выход из авторизации.
  it('должен произойти Logout когда удаляем токен на /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(requireAuthorization.toString());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });


  // Тест на загрузку списка всех объялвений и последующую сортировку.
  it('должна произойти загрузка объявлений Offers когда произойдёт GET /hotels', async () => {
    const mockOffers = makeFakeOfferList();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchDataAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadDataAction.toString());
    expect(actions).toContain(sortData.toString());
  });


  // Тест на загрузку данных по выбранному объявлению.
  it('должна произойти загрузка объявления Offer когда произойдёт GET /hotels/{hotelId}', async () => {
    const mockOffer = makeFakeOffer();
    const HOTEL_ID = 1;
    mockAPI
      .onGet(`${APIRoute.Offers}/${HOTEL_ID}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchDataPropertyAction(HOTEL_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadDataPropertyAction.toString());
  });


  // Тест на загрузку комментариев по выбранному объявлению.
  it('должна произойти загрузка комментарияв по Offer когда произойдёт GET /comments/{hotelId}', async () => {
    const mockComments = makeFakeCommentList();
    const HOTEL_ID = 1;
    mockAPI
      .onGet(`${APIRoute.Comments}/${HOTEL_ID}`)
      .reply(200, mockComments);

    const store = mockStore();

    await store.dispatch(fetchDataCommentsAction(HOTEL_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadDataCommentsAction.toString());
  });


  // Тест на загрузку списка объялвений неподолёку.
  it('должна произойти загрузка объявлений неподолёку Offers когда произойдёт GET /hotels/{hotelId}/nearby', async () => {
    const mockOffers = makeFakeOfferList();
    const HOTEL_ID = 1;
    mockAPI
      .onGet(`${APIRoute.Offers}/${HOTEL_ID}/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchDataNearbyAction(HOTEL_ID));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadDataNearbyAction.toString());
  });


  // Тест на отправку своего комментария.
  it('должна произойти отправка комментария по Offers когда произойдёт POST /comments/{hotelId}', async () => {
    const mockComment = makeFakeComment();
    const RATING = 5;
    const HOTEL_ID = 1;
    const fakeCommentSendData = {
      offerId: HOTEL_ID,
      comment: {
        comment: 'test comment',
        rating: RATING,
      },
    };
    mockAPI
      .onPost(`${APIRoute.Comments}/${HOTEL_ID}`)
      .reply(200, mockComment);

    const store = mockStore();

    await store.dispatch(postDataCommentAction(fakeCommentSendData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadDataCommentsAction.toString());
    expect(actions).toContain(setFormCommentStatus.toString());
  });


  // Тест на загрузку списка объялвений из избранного.
  it('должна произойти загрузка объявлений из избранного Offers когда произойдёт GET /favorite', async () => {
    const mockOffers = makeFakeOfferList();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoritesAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadFavoritesAction.toString());
  });


  // Тест на добавить в избранное везде кроме детальной страницы объявления Offer.
  it('должен быть отправлен статус для объявления Offers на POST /favorite/{hotelId}/{status}', async () => {
    const mockOffer = makeFakeOffer();
    const HOTEL_ID = 1;
    const STATUS = 1;
    const fakeFavoriteSendDataProperty = {
      offerId: HOTEL_ID,
      status: STATUS,
      isProperty: true,
    };
    mockAPI
      .onPost(`${APIRoute.Favorite}/${HOTEL_ID}/${STATUS}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(postFavoritesAction(fakeFavoriteSendDataProperty));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadUpdateOffer.toString());
    expect(actions).toContain(sortData.toString());
  });


  // Тест на добавить в избранное на детальной страницы объявления Offer.
  it('должен быть отправлен статус для объявления Offers с детальной страницы объявления Offer на POST /favorite/{hotelId}/{status}', async () => {
    const mockOffer = makeFakeOffer();
    const HOTEL_ID = 1;
    const STATUS = 1;
    const fakeFavoriteSendData = {
      offerId: HOTEL_ID,
      status: STATUS,
    };
    mockAPI
      .onPost(`${APIRoute.Favorite}/${HOTEL_ID}/${STATUS}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(postFavoritesAction(fakeFavoriteSendData));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toContain(loadDataPropertyAction.toString());
  });
});
