import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import { MIN_REVIEW_LENGTH } from '../../const';
import { RATING_STARS } from '../../const';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import { setFormCommentData } from '../../store/app-data/app-data';
import {postDataCommentAction} from '../../store/api-actions';
import {MyComment} from '../../types/my-comment';
import { useParams } from 'react-router-dom';
import { getReviewFormStatus } from '../../store/app-data/selectors';

function ReviewsForm():JSX.Element {
  const params = useParams();
  const id = Number(params.id);
  const [rating, setRating] = useState<number | null>(null);
  const [review, setReview] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState(false);
  // const formState = useAppSelector(({DATA}) => DATA.reviewFormStatus);
  const formState = useAppSelector(getReviewFormStatus);

  const reviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    // Код для обновления состояния.
    setReview(evt.target.value);
  };
  useEffect(() => {
    if(formState === 'initial') {
      setReview('');
      setRating(null);
    }
  }, [formState]);

  useEffect(() =>
    () => {store.dispatch(setFormCommentData('initial'));
    }, []);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if(!isFormValid) {
      return;
    }
    const comment: MyComment = {
      comment: review,
      rating: rating as number,
    };

    store.dispatch(postDataCommentAction({
      offerId: id,
      comment,
    }));
  };

  useEffect(() => {
    // Проверка требований заполнения формы для блока кнопки.
    setIsFormValid(rating !== null && review.length >= MIN_REVIEW_LENGTH);
  }, [rating, review]);

  return (
    <form
      className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}
      style={{opacity: formState === 'sending' ? 0.5 : 1, pointerEvents: formState === 'sending' ? 'none': 'initial'}}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_STARS.map((value) => (
          <React.Fragment key={value}>
            <input
              disabled={formState === 'sending'}
              onChange = {() => setRating(value)}
              className="form__rating-input visually-hidden"
              name="rating" value={value} id={`${value}-stars`} type="radio" checked={rating === value}
            />
            <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title="perfect">
              <svg className="form__star-image" width="37" height="33">
                <use
                  xlinkHref="#icon-star"
                />
              </svg>
            </label>
          </React.Fragment>
        ))}
      </div>
      <textarea className="reviews__textarea form__textarea"
        id="review"
        disabled={formState === 'sending'}
        name="review"
        maxLength={300}
        value={review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={reviewChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button" type="submit"
          disabled={!isFormValid || formState === 'sending'}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
