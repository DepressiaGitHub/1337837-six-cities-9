import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const/const';
import MainPageScreen from '../pages/main-page-screen/main-page-screen';
import SignInScreen from '../pages/sign-in-screen/sign-in-screen';
import FavoritesScreen from '../pages/favorites-screen/favorites-screen';
import OfferScreen from '../pages/offer-screen/offer-screen';
import PrivateRoute from '../private-route/private-route';
import { useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFound from '../not-found/not-found';

function App(): JSX.Element {
  const { isDataLoaded } = useAppSelector((state) => state);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main}
          element={
            <MainPageScreen />
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
            <OfferScreen/>
          }
        />
        <Route path="*" element={
          <NotFound />
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
