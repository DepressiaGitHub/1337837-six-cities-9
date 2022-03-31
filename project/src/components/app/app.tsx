import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import MainPageScreen from '../pages/main-page-screen/main-page-screen';
import SignInScreen from '../pages/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import LoggedRoute from '../logged-route/logged-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../pages/not-found-screeen/not-found-screeen';
import { isCheckedAuth } from '../../util';
import { HistoryRouter } from '../history-route/history-route';
import browserHistory from '../../browser-history';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(({DATA}) => DATA.isDataLoaded);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Main}
          element={
            <MainPageScreen />
          }
        />
        <Route path={AppRoute.Login}
          element={
            <LoggedRoute
              authorizationStatus={authorizationStatus}
            >
              <SignInScreen />
            </LoggedRoute>
          }
        />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room}
          element={
            <OfferScreen/>
          }
        />
        <Route path="*" element={
          <NotFoundScreen />
        }
        />
        <Route path={AppRoute.NotFound} element={
          <NotFoundScreen />
        }
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
