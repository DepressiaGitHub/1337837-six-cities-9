import Header from '../../header/header';
import PlacesOptions from '../../places-options/places-options';
import OffersList from  '../../offers-list/offers-list';
import Map from '../../map/map';
import LocationsList from '../../locations-list/locations-list';
import MainPageScreenEmpty from './main-page-screen-empty';
import { useAppSelector } from '../../../hooks';

function MainPageScreen ():JSX.Element {
  const {activeCity, sortedOffers} = useAppSelector((state) => state);
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${sortedOffers.length > 0 ? '' : 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationsList />
          </section>
        </div>
        <div className="cities">
          {sortedOffers.length > 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{sortedOffers.length} places to stay in {activeCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <PlacesOptions />
                </form>
                <OffersList
                  offers={sortedOffers}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={sortedOffers[0].city}
                    offers={sortedOffers}
                  />
                </section>
              </div>
            </div>
          ) : (
            <MainPageScreenEmpty city={activeCity}/>
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPageScreen;
