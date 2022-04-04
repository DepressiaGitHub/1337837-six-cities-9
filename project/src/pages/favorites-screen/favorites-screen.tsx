import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { Offer } from '../../types/offer';
import { getFavoriteOffers, getIsFavoriteLoaded } from '../../store/app-data/selectors';
import LoadingScreen from '../../components/loading-screen/loading-screen';
import { useCallback, useEffect } from 'react';
import { store } from '../../store';
import { fetchFavoritesAction } from '../../store/api-actions';
import FavoritesScreenFill from '../../components/favorites-screen-fill/favorites-screen-fill';
import FavoritesScreenEmpty from '../../components/favorites-screen-empty/favorites-screen-empty';
import { requireFavoritesProperty } from '../../store/app-data/app-data';

function FavoritesScreen ():JSX.Element {
  const favoriteOffers: Offer[] = useAppSelector(getFavoriteOffers);
  const isFavoriteLoaded = useAppSelector(getIsFavoriteLoaded);

  const isFavoritePageShow = useCallback(() => favoriteOffers.length > 0, [favoriteOffers]);

  useEffect(() => {
    store.dispatch(fetchFavoritesAction());

    return () => {
      // Тут надо сбросить флаг, чтобы при заходе не было видно старых данных пока грузятся новые.
      store.dispatch(requireFavoritesProperty());
    };
  }, []);

  if (!isFavoriteLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className={`page ${isFavoritePageShow() ? '' : 'page--favorites-empty'}`}>
      <Header />
      {isFavoritePageShow() ? (
        <FavoritesScreenFill favoriteOffers={favoriteOffers} />
      ) : (
        <FavoritesScreenEmpty />
      )}
      <Footer />
    </div>
  );
}

export default FavoritesScreen;
