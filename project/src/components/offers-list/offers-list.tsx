import { offers } from '../../mocks/offers';
import PlaceCard from '../place-card/place-card';

function OffersList():JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default OffersList;
