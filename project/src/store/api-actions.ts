import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { api } from '.';
import { APIRoute, AppRoute, AuthorizationStatus } from '../components/const/const';
import { Offer } from '../types/offer';
import {
  loadDataAction,
  loadDataPropertyAction,
  loadDataCommentsAction,
  loadDatNearbyAction,
  redirectToRoute,
  requireAuthorization,
  setFormCommentData
} from './action';
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
        store.dispatch(loadDatNearbyAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Проверяем авторизован ли пользователь.
export const cheachAuthAction = createAsyncThunk(
  'USER_CHECK_AUTH',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
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
      //Promises
      // api.post<MyComment>(`${APIRoute.Comments}/${offerId}`, comment).then(({data}) => {
      //   store.dispatch(sendDataCommentAction(data));
      //   store.dispatch(setFormCommentData('initial'));
      // });
      //store.dispatch(sendDataCommentAction((await api.post<MyComment>(`${APIRoute.Comments}/${offerId}`, comment)).data));
      //
      //
      if (offerId) {
        store.dispatch(setFormCommentData('sending'));
        const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, comment); // Отправляем свой комментарий
        store.dispatch(loadDataCommentsAction(data));
        store.dispatch(setFormCommentData('initial'));
      }
    } catch(error) {
      errorHandle(error);
      store.dispatch(setFormCommentData('error'));
    }
  },
);
