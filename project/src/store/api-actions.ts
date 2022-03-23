import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { api } from '.';
import { APIRoute, AppRoute, AuthorizationStatus } from '../components/const/const';
import { Offer } from '../components/types/offer';
import { loadDataAction, loadDataPropertyAction, loadDataCommentsAction, loadDatNearbyAction, redirectToRoute, requireAuthorization } from './action';
import { errorHandle } from '../services/error-handle';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../components/types/auth-data';
import { UserData } from '../components/types/user-data';
import { Property } from '../components/types/property';
import { Comment } from '../components/types/comment';

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

export const fetchDataPropertyAction = createAsyncThunk(
  'DATA_FETCH_PROPERTY_OFFERS',
  async (offerId: number) => {
    try {
      const {data} = await api.get<Property>(`${APIRoute.Offers}/${offerId}`);
      store.dispatch(loadDataPropertyAction(data));
    } catch(error) {
      errorHandle(error);
    }
  },
);

export const fetchDataCommentsAction = createAsyncThunk(
  'DATA_FETCH_COMMENTS_OFFERS',
  async (hotelId: number) => {
    try {
      if (hotelId) {
        const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${hotelId}`);
        store.dispatch(loadDataCommentsAction(data));
      }
    } catch(error) {
      errorHandle(error);
    }
  },
);

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

export const loginAction = createAsyncThunk(
  'USER_LOGIN',
  async ({login: email, password}: AuthData) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch(error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

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
