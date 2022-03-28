import { useAppSelector } from '../../hooks';
import NearPlacesCard from '../near-places-card/near-places-card';
import { Offer } from '../types/offer';

function NearPlacesList():JSX.Element {
  const offers: Offer[] = useAppSelector((state) => state.nearbyOffers);

  // eslint-disable-next-line no-console
  console.log('NearPlacesList: render');

  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => <NearPlacesCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default NearPlacesList;
