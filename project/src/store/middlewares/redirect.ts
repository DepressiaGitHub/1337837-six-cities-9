import browserHistory from '../../browser-history';
import { Middleware } from 'redux';
import { reducer } from '../reducer';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) => // Тут ссылка на хранилище.
    (next) => // Тут доступ к диспатчу.
      (action) => { // Тут текущее действие.
        if (action.type === 'REDIRECT_TO_ROUTE') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
