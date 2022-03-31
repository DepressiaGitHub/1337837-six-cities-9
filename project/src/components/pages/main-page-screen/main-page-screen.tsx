import Header from '../../header/header';
import LocationsList from '../../locations-list/locations-list';
import MainPageScreenEmpty from '../../main-page-screen-empty/main-page-screen-empty';
import { useAppSelector } from '../../../hooks';
import { useCallback } from 'react';
import MainPageScreenFill from '../../main-page-screen-fill/main-page-screen-fill';

function MainPageScreen ():JSX.Element {
  const offersSortedByCity = useAppSelector(({DATA}) => DATA.offersSortedByCity);

  // const [isPageMainShow, setIsPageMainShow] = useState(false);
  // useEffect(() => {
  //   setIsPageMainShow(offersSortedByCity.length > 0);
  // }, [offersSortedByCity]);

  // Сохраняет значение функции пока не изменится аргумент из зависимостей.
  const isPageMainShow = useCallback(() => offersSortedByCity.length > 0, [offersSortedByCity]);

  // eslint-disable-next-line no-console
  console.log('MainPageScreen: render');

  return (
    <div className="page page--gray page--main">
      <Header logo />
      <main className={`page__main page__main--index ${isPageMainShow() ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          {isPageMainShow() ? (
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
