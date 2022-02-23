import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { Fragment } from 'react';
import { AppRoute, AuthorizationStatus } from '../const/const';
import MainPageScreen from '../pages/main-page-screen/main-page-screen';
import SignInScreen from '../pages/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';


type AppScreenProps = {
  placesCount: number;
}

function App({placesCount}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}
          element={
            <MainPageScreen
              placesCount={placesCount}
            />
          }
        />
        <Route path={AppRoute.Login}
          element={
            <SignInScreen />
          }
        />
        <Route path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.Auth}
            >
              <FavoritesScreen />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Room}
          element={
            <OfferScreen />
          }
        />
        <Route path="*" element={
          <Fragment>
            <h1>
              404.
              <br />
              <small>Page not found</small>
            </h1>
            <Link to="/">Go to main page</Link>
          </Fragment>
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
