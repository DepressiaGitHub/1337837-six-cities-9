import { useAppSelector } from '../../hooks';
import NearPlacesCard from '../near-places-card/near-places-card';
import { Offer } from '../../types/offer';
import { getNearbyOffers } from '../../store/app-data/selectors';

function NearPlacesList():JSX.Element {
  const offers: Offer[] = useAppSelector(getNearbyOffers);

  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => <NearPlacesCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default NearPlacesList;
