import { store } from '../store';
import { AuthorizationStatus } from '../components/const/const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
