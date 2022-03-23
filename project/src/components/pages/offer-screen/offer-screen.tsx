import Header from '../../header/header';
import NearPlacesList from '../../near-places-list/near-places-list';
import ReviewsForm from '../../reviews-form/reviews-form';
import ReviewList from '../../reviews-list/reviews-list';
import Map from '../../map/map';
import { useParams } from 'react-router-dom';
import { store } from '../../../store';
import { fetchDataPropertyAction, fetchDataCommentsAction, fetchDataNearbyAction } from '../../../store/api-actions';
import { useAppSelector } from '../../../hooks';
import React, { useEffect } from 'react';
import LoadingScreen from '../../loading-screen/loading-screen';
import { isAuth } from '../../../util';
import NotFound from '../../not-found/not-found';

function OfferScreen ():JSX.Element {
  const params = useParams();
  const id = Number(params.id);

  useEffect(() => {
    store.dispatch(fetchDataPropertyAction(id));
    store.dispatch(fetchDataCommentsAction(id));
    store.dispatch(fetchDataNearbyAction(id));
  }, [id]);

  const { authorizationStatus } = useAppSelector((state) => state);
  const { property } = useAppSelector((state) => state);
  const { comments } = useAppSelector((state) => state);
  const { nearbyOffers } = useAppSelector((state) => state);

  if (property === null || nearbyOffers.length === 0) {
    return (
      <LoadingScreen />
    );
  }

  if (!property) {
    return <NotFound />;
  }

  // eslint-disable-next-line no-console
  console.log(property);

  const {images, isFavorite, isPremium, title, rating, type, bedrooms, maxAdults, price, goods, host, description} = property;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((src) => (
                <React.Fragment key={src}>
                  <div className="property__image-wrapper">
                    <img className="property__image" src={src} alt="Photo studio" />
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
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
                <button className={`property__bookmark-button button ${isFavorite ? 'property__bookmark-button--active': ''}`} type="button">
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
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
                <ReviewList
                  comments={comments}
                />
                {isAuth(authorizationStatus) && (
                  <ReviewsForm />
                )}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={nearbyOffers[0].city}
              offers={nearbyOffers}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearPlacesList
              offers={nearbyOffers}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
