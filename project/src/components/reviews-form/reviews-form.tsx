import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { MIN_REVIEW_LENGTH } from '../const/const';
import { RATING_STARS } from '../const/const';

function ReviewsForm():JSX.Element {
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);

  const ratingChange = (value: number) => {
    // Код для обновления состояния.
    setRating(value);
  };

  const reviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    // Код для обновления состояния.
    setReview(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    // Код для отправки формы.
    evt.preventDefault();
    setRating(null);
    setReview('');
  };

  useEffect(() => {
    // Проверка требований заполнения формы для блока кнопки.
    setIsFormValid(rating !== null && review.length >= MIN_REVIEW_LENGTH);
  }, [rating, review.length]);

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_STARS.map((value) => (
          <React.Fragment key={value}>
            <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" checked={rating === value} onChange = {() => ratingChange(value)} />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" value={review} placeholder="Tell how was your stay, what you like and what can be improved" onChange={reviewChange} ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
}

export default ReviewsForm;
