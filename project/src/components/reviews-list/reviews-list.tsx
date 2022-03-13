import ReviewsItem from '../reviews-item/reviews-item';
import { Review } from '../types/review';

type ReviewListProps = {
  reviews: Review[];
}

function ReviewList({reviews}: ReviewListProps):JSX.Element {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <ReviewsItem key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewList;
