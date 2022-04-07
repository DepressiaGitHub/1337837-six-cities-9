import React from 'react';
import { Offer } from '../../types/offer';
import Reviews from '../reviews/reviews';
import { isAuth } from '../../util';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { postFavoritesAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';

type PropertyContainerProps = {
  offer: Offer,
}

function PropertyContainer (props: PropertyContainerProps):JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const { id, isFavorite, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description } = props.offer;

  const toggleFavorites = () => {
    if (isAuth(authorizationStatus)) {
      const status = isFavorite ? 0 : 1;
      store.dispatch(postFavoritesAction({
        offerId: id,
        status: status,
        isProperty: true,
      }));
    } else {
      store.dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <div className="property__container container">
      <div className="property__wrapper">
        {isPremium && (
          <div className="property__mark">
            <span>Premium</span>
          </div>
        )}
        <div className="property__name-wrapper">
          <h1 className="property__name">
            {title}
          </h1>
          <button
            className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active': ''}`}
            type="button"
            onClick={(evt) => {
              evt.preventDefault();
              toggleFavorites();
            }}
          >
            <svg className="property__bookmark-icon" width="31" height="33">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="property__rating rating">
          <div className="property__stars rating__stars">
            <span style={{width: `${rating * 20}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="property__rating-value rating__value">{rating}</span>
        </div>
        <ul className="property__features">
          <li className="property__feature property__feature--entire">
            {type}
          </li>
          <li className="property__feature property__feature--bedrooms">
            {bedrooms} Bedrooms
          </li>
          <li className="property__feature property__feature--adults">
            Max {maxAdults} adults
          </li>
        </ul>
        <div className="property__price">
          <b className="property__price-value">&euro;{price}</b>
          <span className="property__price-text">&nbsp;night</span>
        </div>
        <div className="property__inside">
          <h2 className="property__inside-title">What&apos;s inside</h2>
          <ul className="property__inside-list">
            {goods.map((good) => (
              <React.Fragment key={good}>
                <li className="property__inside-item">
                  {good}
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div className="property__host">
          <h2 className="property__host-title">Meet the host</h2>
          <div className="property__host-user user">
            <div className={`property__avatar-wrapper ${host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
              <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
            </div>
            <span className="property__user-name">
              {host.name}
            </span>
            {host.isPro && (
              <span className="property__user-status">
                Pro
              </span>
            )}
          </div>
          <div className="property__description">
            <p className="property__text">
              {description}
            </p>
          </div>
        </div>
        <Reviews />
      </div>
    </div>
  );
}

export default PropertyContainer;
