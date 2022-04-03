import Header from '../../header/header';
import LocationsList from '../../locations-list/locations-list';
import MainPageScreenEmpty from '../../main-page-screen-empty/main-page-screen-empty';
import { useAppSelector } from '../../../hooks';
import { useCallback } from 'react';
import MainPageScreenFill from '../../main-page-screen-fill/main-page-screen-fill';
import { getOffersSortedByCity } from '../../../store/app-data/selectors';

function MainPageScreen ():JSX.Element {
  const offersSortedByCity = useAppSelector(getOffersSortedByCity);

  // Сохраняет значение функции пока не изменится аргумент из зависимостей.
  const isMainPageShow = useCallback(() => offersSortedByCity.length > 0, [offersSortedByCity]);

  return (
    <div className="page page--gray page--main">
      <Header logo />
      <main className={`page__main page__main--index ${isMainPageShow() ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          {isMainPageShow() ? (
            <MainPageScreenFill />
          ) : (
            <MainPageScreenEmpty />
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPageScreen;
