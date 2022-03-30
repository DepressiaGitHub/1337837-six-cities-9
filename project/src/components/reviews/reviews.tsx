import { useAppSelector } from '../../hooks';
import { isAuth } from '../../util';
import ReviewList from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';

function Reviews ():JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const comments = useAppSelector((state) => state.comments);

  // eslint-disable-next-line no-console
  console.log('Reviews: render');

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ReviewList />
      {isAuth(authorizationStatus) && (
        <ReviewsForm />
      )}
    </section>
  );
}

export default Reviews;