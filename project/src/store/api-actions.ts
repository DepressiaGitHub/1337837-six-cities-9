import { createAsyncThunk } from '@reduxjs/toolkit';
import { store } from '.';
import { api } from '.';
import { APIRoute, AppRoute, AuthorizationStatus } from '../components/const/const';
import { Offer } from '../components/types/offer';
import { loadDataAction, redirectToRoute, requireAuthorization } from './action';
import { errorHandle } from '../services/error-handle';
import { saveToken, dropToken } from '../services/token';
import { AuthData } from '../components/types/auth-data';
import { UserData } from '../components/types/user-data';

export const fetchDataAction = createAsyncThunk(
  'data/fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadDataAction(data));
    } catch(error) {
      errorHandle(error);
    }
  },
);

export const cheachAuthAction = createAsyncThunk(
  'user/cheachAuth',
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
  'user/login',
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
  'user/logout',
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
