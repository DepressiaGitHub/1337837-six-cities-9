import { AuthorizationStatus } from '../../const';
import { requireAuthorization, userProcess } from './user-process';

describe('Reducer: user', () => {
  it('без дополнительных параметров должен возвращать исходное состояние', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authorizationStatus: AuthorizationStatus.Unknown});
  });

  it('должен обновить authorizationStatus до "AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({authorizationStatus: AuthorizationStatus.Auth});
  });

  it('должен обновить authorizationStatus до "NO_AUTH"', () => {
    const state = {authorizationStatus: AuthorizationStatus.NoAuth};

    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({authorizationStatus: AuthorizationStatus.NoAuth});
  });
});
