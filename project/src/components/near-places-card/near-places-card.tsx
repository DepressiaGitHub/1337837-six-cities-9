import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { redirectToRoute } from '../../store/action';
import { postFavoritesAction } from '../../store/api-actions';
import { hoverOffer } from '../../store/app-process/app-process';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Offer } from '../../types/offer';
import { isAuth } from '../../util';

type NearCardProps = {
  offer: Offer;
}

function NearPlacesCard(props: NearCardProps):JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const {id, title, type, price, isPremium, isFavorite, previewImage, rating } = props.offer;

  const dispatch = useAppDispatch();

  const newPropsOffer = useAppSelector(({DATA}) => DATA.updateOffer);

  const [favorite, setFavorite] = useState(isFavorite);

  useEffect(() => {
    if (newPropsOffer) {
      if (newPropsOffer.id === id) {
        setFavorite(newPropsOffer.isFavorite);
      }
    }
  }, [newPropsOffer, id]);

  const mouseOverHandler = () => {
    dispatch(hoverOffer(id));
  };
  const mouseOutHandler = () => {
    dispatch(hoverOffer(null));
  };

  const toggleFavorites = () => {
    if (isAuth(authorizationStatus)) {
      const status = favorite ? 0 : 1;
      dispatch(postFavoritesAction({
        hotelId: id,
        status: status,
      }));
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <article className="near-places__card place-card"
      onMouseEnter={mouseOverHandler}
      onMouseLeave={mouseOutHandler}
    >
      <div className="place-card__mark" hidden={!isPremium}>
        <span>Premium</span>
      </div>
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${favorite ? 'place-card__bookmark-button--active' : ''} button`}
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
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default NearPlacesCard;
