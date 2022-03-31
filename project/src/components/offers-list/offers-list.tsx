import { useAppSelector } from '../../hooks';
import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';

function OffersList():JSX.Element {
  const offers: Offer[] = useAppSelector(({DATA}) => DATA.offersSortedByType);

  // eslint-disable-next-line no-console
  console.log('OffersList: render');

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default OffersList;
