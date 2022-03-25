import ReviewsItem from '../reviews-item/reviews-item';
import { Comment } from '../types/comment';

type ReviewListProps = {
  comments: Comment[];
}

function ReviewList({comments}: ReviewListProps):JSX.Element {
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <ReviewsItem key={comment.id} comment={comment} />)}
    </ul>
  );
}

export default ReviewList;
