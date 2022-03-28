import { useAppSelector } from '../../hooks';
import ReviewsItem from '../reviews-item/reviews-item';
import { Comment } from '../types/comment';

function ReviewList():JSX.Element {
  const comments: Comment[] = useAppSelector((state) => state.comments);
  return (
    <ul className="reviews__list">
      {comments.map((comment) => <ReviewsItem key={comment.id} comment={comment} />)}
    </ul>
  );
}

export default ReviewList;
