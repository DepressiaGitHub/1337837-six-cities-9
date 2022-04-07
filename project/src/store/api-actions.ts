import { createAsyncThunk } from '@reduxjs/toolkit';
// import { store } from '.';
// import { api } from '.';
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
  loadUpdateOffer,
  sortData
} from './app-data/app-data';
import { requireAuthorization } from './user-process/user-process';
import { errorHandle } from '../services/error-handle';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Property } from '../types/property';
import { Comment } from '../types/comment';
import { MyComment } from '../types/my-comment';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';

// Список наших ассинхронных действий.
// Проверяем авторизован ли пользователь.
export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_CHECK_AUTH',
  async (_arg, {dispatch, extra: api}) => {
    try {
      // await api.get(APIRoute.Login);

      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(loadUserAction(data));
    } catch(error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);


// Авторизуем пользователя.
export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_LOGIN',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUserAction(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main)); // Перенаправляем на главную при успешном входе.
    } catch(error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);


// Убираем авторизацию пользователя.
export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_LOGOUT',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(loadUserAction(null));
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Получаем все объявления.
export const fetchDataAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA_FETCH_OFFERS',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadDataAction(data));
      dispatch(sortData());
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Получаем детальную информацию по объявлению.
export const fetchDataPropertyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA_FETCH_PROPERTY_OFFERS',
  async (offerId, {dispatch, extra: api}) => {
    try {
      if (offerId) {
        const {data} = await api.get<Property>(`${APIRoute.Offers}/${offerId}`);
        dispatch(loadDataPropertyAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Получаем список комментариев по объявлению.
export const fetchDataCommentsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA_FETCH_COMMENTS_OFFERS',
  async (offerId, {dispatch, extra: api}) => {
    try {
      if (offerId) {
        const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
        dispatch(loadDataCommentsAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Получаем список объявлений неподолёку.
export const fetchDataNearbyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA_FETCH_NEARBY_OFFERS',
  async (offerId, {dispatch, extra: api}) => {
    try {
      if (offerId) {
        const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
        dispatch(loadDataNearbyAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Отправляем свой комментарий.
export const postDataCommentAction = createAsyncThunk<void, {offerId: number; comment: MyComment}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_SEND_COMMENT',
  async ({offerId, comment}, {dispatch, extra: api}) => {
    try {
      if (offerId) {
        dispatch(setFormCommentStatus('sending'));
        const {data} = await api.post<Comment[]>(`${APIRoute.Comments}/${offerId}`, comment); // Отправляем свой комментарий
        dispatch(loadDataCommentsAction(data));
        dispatch(setFormCommentStatus('initial'));
      }
    } catch(error) {
      errorHandle(error);
      dispatch(setFormCommentStatus('error'));
    }
  },
);


// Получаем список избранного.
export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'DATA_FETCH_FAVORITES_OFFERS',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Favorite);
      dispatch(loadFavoritesAction(data));
    } catch(error) {
      errorHandle(error);
    }
  },
);


// Добавляет в избранное.
export const postFavoritesAction = createAsyncThunk<void, {offerId: number; status: number; isProperty?: boolean}, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'USER_SEND_FAVORITE_STATUS',
  async ({offerId, status, isProperty}, {dispatch, extra: api}) => {
    try {
      if (offerId) {
        const {data} = await api.post(`${APIRoute.Favorite}/${offerId}/${status}`); // Отправляем в список избранное
        if (isProperty) {
          dispatch(loadDataPropertyAction(data));
        }
        dispatch(loadUpdateOffer(data));
        dispatch(sortData());
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);
