import { useAppSelector } from '../../hooks';
import { getActiveCity, getOffersSortedByCity } from '../../store/app-data/selectors';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import PlacesOptions from '../places-options/places-options';

function MainPageScreenFill ():JSX.Element {
  // const activeCity = useAppSelector(({DATA}) => DATA.activeCity);
  const activeCity = useAppSelector(getActiveCity);
  // const offersSortedByCity = useAppSelector(({DATA}) => DATA.offersSortedByCity);
  const offersSortedByCity = useAppSelector(getOffersSortedByCity);
  const cityLocation = offersSortedByCity[0].city;

  // eslint-disable-next-line no-console
  console.log('MainPageScreenFill: render');

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersSortedByCity.length} places to stay in {activeCity}</b>
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
        <OffersList />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map
            city={cityLocation}
            offers={offersSortedByCity}
          />
        </section>
      </div>
    </div>
  );
}

export default MainPageScreenFill;
