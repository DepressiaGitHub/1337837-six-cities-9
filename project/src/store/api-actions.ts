import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { api } from '.';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { Offer } from '../types/offer';
import { redirectToRoute } from './action';
import {
  loadDataAction,
  loadDataPropertyAction,
  loadDataCommentsAction,
  loadDataNearbyAction,
  setFormCommentStatus,
  loadFavoritesAction,
  loadUserAction,
  loadUpdateOffer
} from './app-data/app-data';
import { requireAuthorization } from './user-process/user-process';
import { errorHandle } from '../services/error-handle';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Property } from '../types/property';
import { Comment } from '../types/comment';
import { MyComment } from '../types/my-comment';

// Список наших ассинхронных действий.
// Получаем все объявления.
export const fetchDataAction = createAsyncThunk(
  'DATA_FETCH_OFFERS',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadDataAction(data));
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Получаем детальную информацию по объявлению.
export const fetchDataPropertyAction = createAsyncThunk(
  'DATA_FETCH_PROPERTY_OFFERS',
  async (offerId: number) => {
    try {
      if (offerId) {
        const {data} = await api.get<Property>(`${APIRoute.Offers}/${offerId}`);
        store.dispatch(loadDataPropertyAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Получаем список комментариев по объявлению.
export const fetchDataCommentsAction = createAsyncThunk(
  'DATA_FETCH_COMMENTS_OFFERS',
  async (offerId: number) => {
    try {
      if (offerId) {
        const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
        store.dispatch(loadDataCommentsAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Получаем список ближайших объявлений.
export const fetchDataNearbyAction = createAsyncThunk(
  'DATA_FETCH_NEARBY_OFFERS',
  async (offerId: number) => {
    try {
      if (offerId) {
        const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
        store.dispatch(loadDataNearbyAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Проверяем авторизован ли пользователь.
export const checkAuthAction = createAsyncThunk(
  'USER_CHECK_AUTH',
  async () => {
    try {
      // await api.get(APIRoute.Login);

      const {data} = await api.get<UserData>(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(loadUserAction(data));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);


// Авторизуем пользователя.
export const loginAction = createAsyncThunk(
  'USER_LOGIN',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      const {data} = await api.get<UserData>(APIRoute.Login);
      store.dispatch(loadUserAction(data));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main)); // Перенаправляем на главную при успешном входе.
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);


// Убираем авторизацию пользователя.
export const logoutAction = createAsyncThunk(
  'USER_LOGOUT',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(loadUserAction(null));
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Отправляем свой комментарий.
export const postDataCommentAction = createAsyncThunk(
  'USER_SEND_COMMENT',
  async ({offerId, comment}: {offerId: number; comment: MyComment}) => {
    try {
      if (offerId) {
        store.dispatch(setFormCommentStatus('sending'));
        const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, comment); // Отправляем свой комментарий
        store.dispatch(loadDataCommentsAction(data));
        store.dispatch(setFormCommentStatus('initial'));
      }
    } catch(error) {
      errorHandle(error);
      store.dispatch(setFormCommentStatus('error'));
    }
  },
);


// Получаем список избранного.
export const fetchFavoritesAction = createAsyncThunk(
  'DATA_FETCH_FAVORITES_OFFERS',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      store.dispatch(loadFavoritesAction(data));
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Добавляет в избранное.
export const postFavoritesAction = createAsyncThunk(
  'USER_SEND_FAVORITE_STATUS',
  async ({hotelId, status}: {hotelId: number; status: number}) => {
    try {
      if (hotelId) {
        const {data} = await api.post(`${APIRoute.Favorite}/${hotelId}/${status}`); // Отправляем в список избранное
        store.dispatch(loadUpdateOffer(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);
