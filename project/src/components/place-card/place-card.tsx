import { Link } from 'react-router-dom';
import { Offer } from '../types/offer';

type PlaceCardProps = {
  offer: Offer;
}

function PlaceCard(props: PlaceCardProps):JSX.Element {
  const {id, placeName, placeType, price, premiumMark, favorite, imgPath, rating } = props.offer;
  const mouseOverHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Навёл на карточку мышку');
  };
  const mouseOutHandler = () => {
    // eslint-disable-next-line no-console
    console.log('Убрал с карточки мышку');
  };

  return (
    <article className="cities__place-card place-card"
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    >
      <div className="place-card__mark" hidden={!premiumMark}>
        <span>Premium</span>
      </div>
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`offer/${id}`}>
          <img className="place-card__image" src={imgPath} width="260" height="200" alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button ${favorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
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
          <Link to={`offer/${id}`}>{placeName}</Link>
        </h2>
        <p className="place-card__type">{placeType}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
