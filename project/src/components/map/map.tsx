import { useRef, useEffect } from 'react';
import useMap from '../../hooks/useMap';
import { City, Offer } from '../types/offer';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';

const URL_MARKER_DEFAULT = 'img/pin.svg';
// const URL_MARKER_ACTIVE = 'img/pin-active.svg';

type mapProps = {
  city: City,
  offers: Offer[],
}

function Map({city, offers}: mapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [28, 39],
    iconAnchor: [14, 39],
  });

  // const currentCustomIcon = leaflet.icon({
  //   iconUrl: URL_MARKER_ACTIVE,
  //   iconSize: [28, 39],
  //   iconAnchor: [14, 39],
  // });

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        // eslint-disable-next-line no-console
        console.log(`Широта: ${offer.city.location.latitude}, Долгота: ${offer.city.location.longitude}`);
        leaflet
          .marker(
            {
              lat: offer.city.location.latitude,
              lng: offer.city.location.longitude,
            },
            {
              icon: defaultCustomIcon,
            },
          )
          .addTo(map);
      });
    }
  }, [defaultCustomIcon, map, offers]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
