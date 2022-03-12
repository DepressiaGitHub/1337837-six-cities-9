import NearPlacesCard from '../near-places-card/near-places-card';
import { Offer } from '../types/offer';

type offersListProps = {
  offers: Offer[];
}

function NearPlacesList({offers}: offersListProps):JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => <NearPlacesCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default NearPlacesList;
