import { useAppSelector } from '../../hooks';
import { getActiveCity, getOffersSortedByCity } from '../../store/app-data/selectors';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import PlacesOptions from '../places-options/places-options';

function MainPageScreenFill ():JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersSortedByCity = useAppSelector(getOffersSortedByCity);
  const cityLocation = offersSortedByCity[0].city;

  return (
    <div className="cities__places-container container">
      <section className="cities__places places" data-testid="places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">{offersSortedByCity.length} places to stay in {activeCity}</b>
        <PlacesOptions />
        <OffersList />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map" data-testid="map">
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
