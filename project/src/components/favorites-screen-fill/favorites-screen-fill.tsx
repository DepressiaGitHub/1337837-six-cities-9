import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/app-data/app-data';
import { Offer } from '../../types/offer';
import FavoritePlacesCard from '../favorite-places-card/favorite-places-card';

type FavoritesScreenFillProps = {
  favoriteOffers: Offer[];
}

function FavoritesScreenFill (props: FavoritesScreenFillProps):JSX.Element {
  const favoriteOffers = props.favoriteOffers;

  const dispatch = useAppDispatch();

  const cities = new Set(favoriteOffers.map((offer) => offer.city.name));

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites" data-testid="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {(Array.from(cities)).map((city) => {
              const favoriteOffersByCity = favoriteOffers.filter((offer) => offer.city.name === city);
              return (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link
                        to={AppRoute.Main}
                        className="locations__item-link"
                        onClick={() => dispatch(changeCity(city))}
                      >
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {favoriteOffersByCity.map((offer) => <FavoritePlacesCard key={offer.id} offer={offer} />)}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default FavoritesScreenFill;
