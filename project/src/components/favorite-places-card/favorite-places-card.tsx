import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { postFavoritesAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';
import { isAuth } from '../../util';

type FavoriteCardProps = {
  offer: Offer;
}

function FavoritePlacesCard(props: FavoriteCardProps):JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const {id, title, type, price, isPremium, isFavorite, previewImage, rating } = props.offer;

  const dispatch = useAppDispatch();

  const toggleFavorites = () => {
    if (isAuth(authorizationStatus)) {
      const status = isFavorite ? 0 : 1;
      dispatch(postFavoritesAction({
        offerId: id,
        status: status,
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <article className="favorites__card place-card" data-testid="place-card">
      <div className="place-card__mark" hidden={!isPremium}>
        <span>Premium</span>
      </div>
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width="150"
            height="110"
            alt="Place"
            data-testid="place-card-image"
          />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info" data-testid="place-card-info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`}
            type="button"
            onClick={(evt) => {
              evt.preventDefault();
              toggleFavorites();
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating" data-testid="place-card-rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating) * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" data-testid="place-card-name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoritePlacesCard;
