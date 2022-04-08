import { useAppSelector } from '../../hooks';
import PlaceCard from '../place-card/place-card';
import { Offer } from '../../types/offer';
import { getOffersSortedByType } from '../../store/app-data/selectors';

function OffersList():JSX.Element {
  const offers: Offer[] = useAppSelector(getOffersSortedByType);

  return (
    <div className="cities__places-list places__list tabs__content" data-testid="places-list">
      {offers.map((offer) => <PlaceCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default OffersList;
